"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { after } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { defaultDialCode, dialCodes } from "@/data/dial-codes";
import { getSubService, subServices } from "@/data/services";
import { company } from "@/data/site";
import { acknowledgementEmail, enquiryEmail, type Enquiry } from "@/lib/email/contact";
import { logoAttachment } from "@/lib/email/layout";
import { serverEnv } from "@/lib/env.server";
import { rateLimit } from "@/lib/rate-limit";
import {
  MAX_MESSAGE_LINKS,
  canReceiveEmail,
  containsLink,
  countLinks,
  forgetMessage,
  isDuplicate,
  looksLikeSpam,
} from "@/lib/spam";
import { verifyTurnstile } from "@/lib/turnstile";

export type ContactField =
  | "firstName"
  | "lastName"
  | "email"
  | "company"
  | "phoneCountry"
  | "phone"
  | "service"
  | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
  /** Set on success so the form can reset and show the confirmation once per submission. */
  submission?: { id: string; firstName: string; email: string };
};

const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const singleLine = /^[^\r\n<>]*$/;

const personName = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `Please enter your ${label}.`)
    .max(60, `Your ${label} must be 60 characters or fewer.`)
    .regex(singleLine, `Your ${label} contains characters that are not allowed.`)
    .refine((value) => !containsLink(value), `Your ${label} cannot contain links.`);

const schema = z.object({
  firstName: personName("first name"),
  lastName: personName("last name"),
  email: z.email("Please enter a valid email address.").max(254),
  company: z
    .string()
    .trim()
    .max(120, "Organisation must be 120 characters or fewer.")
    .regex(singleLine, "Organisation contains characters that are not allowed.")
    .refine((value) => !containsLink(value), "Organisation cannot contain links."),
  phoneCountry: z.enum(dialCodes.map((item) => item.iso) as [string, ...string[]], {
    error: "Please choose a country code.",
  }),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number must be 30 characters or fewer.")
    .regex(/^[0-9+()\-.\s]*$/, "Please enter a valid phone number."),
  service: z.enum(["general", ...subServices.map((service) => service.slug)], {
    error: "Please choose a topic.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(5000, "Message must be 5,000 characters or fewer.")
    .refine(
      (value) => countLinks(value) <= MAX_MESSAGE_LINKS,
      `Please include no more than ${MAX_MESSAGE_LINKS} links in your message.`,
    ),
});

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Adds the chosen country code unless the visitor already typed one, dropping a local leading 0. */
function internationalPhone(country: string, phone: string) {
  if (!phone) return "";
  if (phone.startsWith("+")) return phone;
  const code = dialCodes.find((item) => item.iso === country)?.code ?? "";
  return `${code} ${phone.replace(/^0+/, "")}`.trim();
}

async function clientIp() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headerList.get("x-real-ip") || "unknown";
}

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function newReference() {
  const bytes = randomBytes(6);
  return `PED-${Array.from(bytes, (byte) => REFERENCE_ALPHABET[byte % REFERENCE_ALPHABET.length]).join("")}`;
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    firstName: text(formData, "firstName"),
    lastName: text(formData, "lastName"),
    email: text(formData, "email"),
    company: text(formData, "company"),
    phoneCountry: text(formData, "phoneCountry") || defaultDialCode,
    phone: text(formData, "phone"),
    service: text(formData, "service") || "general",
    message: text(formData, "message"),
  };
  // Automated submissions get the same response as a real one so they have no signal to adapt to.
  const sent = (reference = newReference()): ContactState => ({
    status: "success",
    message: "Thank you. Your message has been sent and our team will be in touch.",
    submission: {
      id: reference,
      firstName: values.firstName.slice(0, 60),
      email: values.email.slice(0, 254),
    },
  });
  const failed = (message: string, fieldErrors?: ContactState["fieldErrors"]): ContactState => ({
    status: "error",
    message,
    fieldErrors,
    values,
  });

  const startedAt = Number(text(formData, "startedAt"));
  const elapsed = Date.now() - startedAt;
  if (text(formData, "website") || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    return sent();
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return failed("Please correct the highlighted fields.", fieldErrors);
  }
  const data = parsed.data;

  const ip = await clientIp();
  if (!rateLimit(`contact:ip:${ip}`, 5, 10 * 60 * 1000) || !rateLimit(`contact:ip-day:${ip}`, 20, 24 * HOUR)) {
    return failed("Too many messages have been sent from your network. Please try again later.");
  }

  const { turnstile } = serverEnv;
  if (turnstile && !(await verifyTurnstile(turnstile.secretKey, text(formData, "cf-turnstile-response"), ip))) {
    return failed("We couldn't confirm you're not a robot. Please complete the security check and try again.");
  }

  if (looksLikeSpam(data.message)) return sent();

  if (!(await canReceiveEmail(data.email))) {
    return failed("Please correct the highlighted fields.", {
      email: "This email address can't receive mail. Please check the spelling.",
    });
  }

  if (!rateLimit(`contact:email:${data.email.toLowerCase()}`, 3, HOUR)) {
    return failed("You've sent several messages in a short time. Please wait a while before sending another.");
  }
  if (isDuplicate(data.email, data.message)) return sent();

  const { resendApiKey, contactToEmail, contactFromEmail } = serverEnv;
  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set.");
    forgetMessage(data.email, data.message);
    return failed("Our contact form is temporarily unavailable. Please try again later.");
  }

  const sender = `${company.name} <${contactFromEmail.match(/<([^>]+)>/)?.[1] ?? contactFromEmail}>`;
  const enquiry: Enquiry = {
    reference: newReference(),
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    company: data.company,
    phone: internationalPhone(data.phoneCountry, data.phone),
    topic: getSubService(data.service)?.title ?? "General enquiry",
    message: data.message,
    receivedAt: new Date(),
  };
  const resend = new Resend(resendApiKey);

  try {
    const notification = enquiryEmail(enquiry);
    const { error } = await resend.emails.send(
      {
        from: sender,
        to: contactToEmail,
        replyTo: data.email,
        subject: notification.subject,
        html: notification.html,
        text: notification.text,
        attachments: [logoAttachment],
      },
      { idempotencyKey: `enquiry/${enquiry.reference}` },
    );
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("[contact] Failed to send enquiry:", error instanceof Error ? error.message : error);
    forgetMessage(data.email, data.message);
    return failed("We could not send your message just now. Please try again in a few minutes.");
  }

  // Capped per address so the form can't be used to flood someone else's inbox.
  if (rateLimit(`contact:ack:${data.email.toLowerCase()}`, 2, 24 * HOUR)) {
    after(async () => {
      const confirmation = acknowledgementEmail(enquiry);
      const { error } = await resend.emails.send(
        {
          from: sender,
          to: data.email,
          replyTo: contactToEmail,
          subject: confirmation.subject,
          html: confirmation.html,
          text: confirmation.text,
          attachments: [logoAttachment],
          headers: { "Auto-Submitted": "auto-generated", "X-Auto-Response-Suppress": "All" },
        },
        { idempotencyKey: `acknowledgement/${enquiry.reference}` },
      );
      if (error) console.error("[contact] Failed to send acknowledgement:", error.message);
    });
  }

  return sent(enquiry.reference);
}
