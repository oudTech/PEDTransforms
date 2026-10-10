"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { defaultDialCode, dialCodes } from "@/data/dial-codes";
import { company } from "@/data/site";
import { getSubService, subServices } from "@/data/services";
import { serverEnv } from "@/lib/env.server";
import { rateLimit } from "@/lib/rate-limit";

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
};

const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 24 * 60 * 60 * 1000;
const singleLine = /^[^\r\n<>]*$/;

const personName = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `Please enter your ${label}.`)
    .max(60, `Your ${label} must be 60 characters or fewer.`)
    .regex(singleLine, `Your ${label} contains characters that are not allowed.`);

const schema = z.object({
  firstName: personName("first name"),
  lastName: personName("last name"),
  email: z.email("Please enter a valid email address.").max(254),
  company: z
    .string()
    .trim()
    .max(120, "Organisation must be 120 characters or fewer.")
    .regex(singleLine, "Organisation contains characters that are not allowed."),
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
    .max(5000, "Message must be 5,000 characters or fewer."),
});

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  const sent: ContactState = {
    status: "success",
    message: "Thank you. Your message has been sent and our team will be in touch.",
  };

  // Bots that fill the hidden field or submit instantly get a success response
  // so they have no signal to adapt to.
  const startedAt = Number(text(formData, "startedAt"));
  const elapsed = Date.now() - startedAt;
  if (text(formData, "website") || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    return sent;
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  if (!rateLimit(`contact:${await clientIp()}`, 5, 10 * 60 * 1000)) {
    return {
      status: "error",
      message: "Too many messages have been sent from your network. Please try again later.",
      values,
    };
  }

  const { resendApiKey, contactToEmail, contactFromEmail } = serverEnv;
  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set.");
    return {
      status: "error",
      message: "Our contact form is temporarily unavailable. Please try again later.",
      values,
    };
  }

  const data = parsed.data;
  const name = `${data.firstName} ${data.lastName}`;
  const topic = getSubService(data.service)?.title ?? "General enquiry";
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", data.email],
    ["Organisation", data.company || "Not provided"],
    ["Phone", internationalPhone(data.phoneCountry, data.phone) || "Not provided"],
    ["Topic", topic],
  ];

  const html = `
    <h2 style="font-family:Arial,sans-serif">New enquiry from the ${escapeHtml(company.name)} website</h2>
    <table style="font-family:Arial,sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;font-weight:bold">${label}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="font-family:Arial,sans-serif">Message</h3>
    <p style="font-family:Arial,sans-serif;white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;
  const plain = `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMessage:\n${data.message}`;

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: data.email,
      subject: `Website enquiry: ${topic} from ${name}`,
      html,
      text: plain,
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("[contact] Failed to send enquiry:", error instanceof Error ? error.message : error);
    return {
      status: "error",
      message: "We could not send your message just now. Please try again in a few minutes.",
      values,
    };
  }

  return sent;
}
