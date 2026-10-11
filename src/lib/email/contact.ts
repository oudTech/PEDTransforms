import "server-only";
import { company, contact } from "@/data/site";
import { siteUrl } from "@/sanity/env";
import {
  button,
  details,
  type DetailItem,
  escapeHtml,
  eyebrow,
  heading,
  layout,
  link,
  messagePanel,
  note,
  paragraph,
  sectionLabel,
  siteHost,
  steps,
  strong,
  telHref,
} from "./layout";

export type Enquiry = {
  reference: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  topic: string;
  message: string;
  receivedAt: Date;
};

type Email = { subject: string; html: string; text: string };

function receivedLabel(date: Date) {
  return `${new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  }).format(date)} WAT`;
}

/** The notification sent to the team inbox. */
export function enquiryEmail(enquiry: Enquiry): Email {
  const name = `${enquiry.firstName} ${enquiry.lastName}`;
  const replySubject = `Re: Your enquiry to ${company.name} (${enquiry.reference})`;
  const replyHref = `mailto:${enquiry.email}?subject=${encodeURIComponent(replySubject)}`;
  const received = receivedLabel(enquiry.receivedAt);

  const textRows: [string, string][] = [
    ["Name", name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "Not provided"],
    ["Organisation", enquiry.company || "Not provided"],
    ["Topic", enquiry.topic],
    ["Reference", enquiry.reference],
  ];
  const rows: DetailItem[] = [
    { label: "Name", value: name },
    { label: "Organisation", value: enquiry.company || "Not provided" },
    { label: "Email", value: { html: link(`mailto:${enquiry.email}`, enquiry.email) }, wide: true },
    {
      label: "Phone",
      value: enquiry.phone ? { html: link(telHref(enquiry.phone), enquiry.phone) } : "Not provided",
    },
    { label: "Reference", value: enquiry.reference },
    { label: "Topic", value: enquiry.topic, wide: true },
  ];

  const content = [
    eyebrow("New website enquiry"),
    heading(name),
    paragraph(
      `${escapeHtml(enquiry.firstName)} has asked about ${strong(enquiry.topic)}. Reply directly to this email to respond.`,
      "12px 0 0",
    ),
    button(replyHref, `Reply to ${enquiry.firstName}`),
    sectionLabel("Contact details"),
    details(rows),
    sectionLabel("Message"),
    messagePanel(enquiry.message),
    note(`Received ${escapeHtml(received)} via the contact form on ${escapeHtml(siteHost)}.`),
  ].join("\n");

  const text = [
    `New website enquiry (${enquiry.reference})`,
    "",
    ...textRows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    enquiry.message,
    "",
    `Received ${received} via ${siteHost}.`,
  ].join("\n");

  return {
    subject: `New enquiry: ${enquiry.topic} from ${name} (${enquiry.reference})`,
    html: layout({
      title: `New enquiry from ${name}`,
      preheader: `${enquiry.topic}: ${enquiry.message.slice(0, 110)}`,
      badge: enquiry.reference,
      content,
      footerNote: `Internal notification from the ${escapeHtml(company.name)} website. Replies go straight to ${escapeHtml(enquiry.email)}.`,
    }),
    text,
  };
}

/**
 * The confirmation sent to the person who enquired. It deliberately does not
 * repeat their message, so the form cannot be used to send arbitrary content
 * to someone else's inbox.
 */
export function acknowledgementEmail(enquiry: Enquiry): Email {
  const nextSteps = [
    { title: "We review your enquiry", body: "The right specialist on our team reads your message and any context you shared." },
    { title: "We get in touch", body: "We contact you by email or phone to understand your goals and answer your questions." },
    { title: "We agree the next steps", body: "Together we shape a clear plan, proposal or call that fits your timeline." },
  ];

  const content = [
    eyebrow("Message received"),
    heading(`Thanks for reaching out, ${enquiry.firstName}`),
    paragraph(
      `We've received your enquiry about ${strong(enquiry.topic)}, and a member of our team will contact you shortly.`,
      "12px 0 0",
    ),
    sectionLabel("Your enquiry"),
    details([
      { label: "Reference", value: enquiry.reference },
      { label: "Submitted", value: receivedLabel(enquiry.receivedAt) },
      { label: "Topic", value: enquiry.topic, wide: true },
    ]),
    sectionLabel("What happens next"),
    steps(nextSteps),
    paragraph(
      `Need to add something? Just reply to this email and quote your reference${
        contact.phone ? `, or call us on ${link(telHref(contact.phone), contact.phone)}` : ""
      }.`,
      "28px 0 0",
    ),
    button(`${siteUrl}/services`, "Explore our services"),
    paragraph(`Kind regards,<br>${strong(`The ${company.name} team`)}`, "32px 0 0"),
  ].join("\n");

  const text = [
    `Thanks for reaching out, ${enquiry.firstName}.`,
    "",
    `We've received your enquiry about ${enquiry.topic}, and a member of our team will contact you shortly.`,
    "",
    `Reference: ${enquiry.reference}`,
    `Topic: ${enquiry.topic}`,
    `Submitted: ${receivedLabel(enquiry.receivedAt)}`,
    "",
    "What happens next:",
    ...nextSteps.map((step, index) => `${index + 1}. ${step.title}: ${step.body}`),
    "",
    `Need to add something? Just reply to this email and quote your reference${contact.phone ? `, or call us on ${contact.phone}` : ""}.`,
    "",
    "Kind regards,",
    `The ${company.name} team`,
    "",
    "---",
    `You're receiving this because this address was used on the contact form at ${siteHost}. If that wasn't you, you can ignore this email.`,
  ].join("\n");

  return {
    subject: `We've received your enquiry (${enquiry.reference})`,
    html: layout({
      title: `We've received your enquiry`,
      preheader: `Thanks, ${enquiry.firstName}. Our team will be in touch shortly about ${enquiry.topic}.`,
      badge: enquiry.reference,
      content,
      footerNote: `You're receiving this because this address was used on the contact form at ${escapeHtml(siteHost)}. If that wasn't you, you can safely ignore this email.`,
    }),
    text,
  };
}
