import "server-only";
import { company, contact } from "@/data/site";
import { siteUrl } from "@/sanity/env";
import { emailLogo } from "./logo";

export const LOGO_CID = "pedtransforms-logo";

const brand = "#bd0000";
const ink = "#141414";
const body = "#3d3d42";
const muted = "#7a7a82";
const panel = "#f5f5f7";
const canvas = "#eeeef1";
const font =
  "'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const siteHost = new URL(siteUrl).host;

export const logoAttachment = {
  filename: "pedtransforms-logo.png",
  content: Buffer.from(emailLogo.base64, "base64"),
  contentType: "image/png",
  contentId: LOGO_CID,
};

export function eyebrow(text: string) {
  return `<p style="margin:0 0 12px;font-family:${font};font-size:12px;line-height:16px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${brand}">${escapeHtml(text)}</p>`;
}

export function heading(text: string) {
  return `<h1 class="h1" style="margin:0;font-family:${font};font-size:28px;line-height:36px;font-weight:700;letter-spacing:-0.4px;color:${ink}">${escapeHtml(text)}</h1>`;
}

/** `html` must already be escaped. */
export function paragraph(html: string, spacing = "16px 0 0") {
  return `<p style="margin:${spacing};font-family:${font};font-size:16px;line-height:26px;color:${body}">${html}</p>`;
}

/** Small print. `html` must already be escaped. */
export function note(html: string, spacing = "28px 0 0") {
  return `<p style="margin:${spacing};font-family:${font};font-size:13px;line-height:20px;color:${muted}">${html}</p>`;
}

export function strong(text: string) {
  return `<strong style="color:${ink};font-weight:600">${escapeHtml(text)}</strong>`;
}

export function button(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn" style="margin:28px 0 0"><tr>
<td align="center" style="border-radius:10px;background:${brand}">
<a href="${escapeHtml(href)}" style="display:block;padding:14px 26px;font-family:${font};font-size:15px;line-height:20px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px">${escapeHtml(label)}&nbsp;&nbsp;&rarr;</a>
</td></tr></table>`;
}

export function sectionLabel(text: string) {
  return `<p style="margin:36px 0 14px;font-family:${font};font-size:13px;line-height:18px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:${muted}">${escapeHtml(text)}</p>`;
}

function field(label: string, value: string | { html: string }) {
  const content = typeof value === "string" ? escapeHtml(value) : value.html;
  return `<p style="margin:0;font-family:${font};font-size:12px;line-height:16px;color:${muted}">${escapeHtml(label)}</p>
<p style="margin:4px 0 0;font-family:${font};font-size:15px;line-height:22px;font-weight:600;color:${ink};word-break:break-word">${content}</p>`;
}

export type DetailItem = {
  label: string;
  /** Escaped unless given as `{ html }`. */
  value: string | { html: string };
  /** Spans the full width, for long values such as email addresses. */
  wide?: boolean;
};

/** Label-over-value pairs in a soft panel, two per row on wide screens and one per row on phones. */
export function details(items: DetailItem[]) {
  const rows: string[] = [];
  let pending: DetailItem[] = [];
  const flush = () => {
    if (!pending.length) return;
    const cells = pending
      .map(
        (item, column) =>
          `<td class="col" width="50%" valign="top" style="padding:0 ${column === 0 ? "12px" : "0"} 20px ${column === 1 ? "12px" : "0"}">${field(item.label, item.value)}</td>`,
      )
      .join("");
    const filler = pending.length === 1 ? `<td class="col col-empty" width="50%" style="padding:0">&nbsp;</td>` : "";
    rows.push(`<tr>${cells}${filler}</tr>`);
    pending = [];
  };
  for (const item of items) {
    if (item.wide) {
      flush();
      rows.push(`<tr><td class="col" colspan="2" valign="top" style="padding:0 0 20px">${field(item.label, item.value)}</td></tr>`);
    } else {
      pending.push(item);
      if (pending.length === 2) flush();
    }
  }
  flush();
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${panel};border-radius:14px"><tr><td class="panel" style="padding:24px 24px 4px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows.join("")}</table>
</td></tr></table>`;
}

export function messagePanel(text: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${panel};border-radius:14px"><tr>
<td class="panel" style="padding:22px 24px;font-family:${font};font-size:15px;line-height:25px;color:${ink};white-space:pre-wrap;word-break:break-word">${escapeHtml(text)}</td>
</tr></table>`;
}

export function steps(items: { title: string; body: string }[]) {
  const rows = items
    .map(
      (item, index) => `<tr>
<td valign="top" style="padding:0 16px ${index === items.length - 1 ? "0" : "20px"} 0;width:32px">
<div style="width:32px;height:32px;border-radius:10px;background:${brand};color:#ffffff;font-family:${font};font-size:14px;line-height:32px;font-weight:700;text-align:center">${index + 1}</div>
</td>
<td valign="top" style="padding:5px 0 ${index === items.length - 1 ? "0" : "20px"}">
<p style="margin:0;font-family:${font};font-size:15px;line-height:22px;font-weight:600;color:${ink}">${escapeHtml(item.title)}</p>
<p style="margin:3px 0 0;font-family:${font};font-size:14px;line-height:22px;color:${body}">${escapeHtml(item.body)}</p>
</td>
</tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
}

export function link(href: string, label: string) {
  const nowrap = href.startsWith("tel:") ? ";white-space:nowrap" : "";
  return `<a href="${escapeHtml(href)}" style="color:${brand};font-weight:600;text-decoration:none${nowrap}">${escapeHtml(label)}</a>`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function layout({
  title,
  preheader,
  badge,
  content,
  footerNote,
}: {
  title: string;
  preheader: string;
  /** Short text shown opposite the logo, such as a reference number. */
  badge?: string;
  /** Pre-escaped HTML for the card body. */
  content: string;
  /** Pre-escaped HTML shown under the contact details. */
  footerNote: string;
}) {
  const separator = `<span style="color:#c4c4cc">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>`;
  const contactLine = contact.email ? link(`mailto:${contact.email}`, contact.email) : "";
  const officeLines = contact.offices
    .map(
      (office) =>
        `<p style="margin:2px 0 0">${escapeHtml(office.location)}${separator}${link(telHref(office.phone), office.phone)}</p>`,
    )
    .join("\n");
  const logoHeight = Math.round((150 * emailLogo.height) / emailLogo.width);

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${escapeHtml(title)}</title>
<style>
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
  @media (max-width:600px) {
    .outer { padding:0 !important; }
    .card { border-radius:0 !important; }
    .px { padding-left:20px !important; padding-right:20px !important; }
    .head { padding-top:22px !important; padding-bottom:4px !important; }
    .main { padding-top:24px !important; padding-bottom:32px !important; }
    .h1 { font-size:24px !important; line-height:31px !important; }
    .panel { padding-left:18px !important; padding-right:18px !important; }
    .col { display:block !important; width:100% !important; padding:0 0 18px !important; }
    .col-empty { display:none !important; }
    .btn { width:100% !important; }
    .foot { padding:28px 20px 36px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${canvas}">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all">${escapeHtml(preheader)}${"&#8203;&nbsp;".repeat(60)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${canvas}">
<tr><td align="center" class="outer" style="padding:40px 16px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px">
<tr><td class="card" style="background:#ffffff;border-radius:20px;box-shadow:0 1px 3px rgba(20,20,20,0.06)">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td class="px head" style="padding:32px 40px 8px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle"><a href="${escapeHtml(siteUrl)}" style="text-decoration:none"><img src="cid:${LOGO_CID}" width="150" height="${logoHeight}" alt="${escapeHtml(company.name)}" style="display:block;border:0;outline:none;width:150px;height:auto"></a></td>
${badge ? `<td valign="middle" align="right" style="font-family:${font};font-size:12px;line-height:16px;font-weight:600;color:${muted};white-space:nowrap">${escapeHtml(badge)}</td>` : ""}
</tr></table>
</td></tr>
<tr><td class="px main" style="padding:32px 40px 44px">
${content}
</td></tr>
</table>
</td></tr>
<tr><td align="center" class="foot" style="padding:32px 24px 8px;font-family:${font};font-size:13px;line-height:21px;color:${muted}">
<p style="margin:0;font-size:14px;font-weight:700;color:${ink}">${escapeHtml(company.name)}</p>
<p style="margin:2px 0 0">${escapeHtml(company.tagline)}</p>
${contactLine || officeLines ? `<div style="margin:12px 0 0">${contactLine ? `<p style="margin:0">${contactLine}</p>` : ""}
${officeLines}</div>` : ""}
<p style="margin:18px auto 0;max-width:440px;font-size:12px;line-height:18px;color:#9a9aa2">${footerNote}</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
