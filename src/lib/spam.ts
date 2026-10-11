import "server-only";
import { createHash } from "node:crypto";
import { resolve4, resolveMx } from "node:dns/promises";

const URL_PATTERN = /\b(?:https?:\/\/|www\.)\S+/gi;
const MARKUP = /\[\/?(?:url|link|img)\b|<a\s+href=/i;

export const MAX_MESSAGE_LINKS = 3;

export function containsLink(value: string) {
  return countLinks(value) > 0 || MARKUP.test(value);
}

export function countLinks(value: string) {
  return value.match(URL_PATTERN)?.length ?? 0;
}

/** Signs of automated or bulk content that real enquiries almost never contain. */
export function looksLikeSpam(message: string) {
  if (MARKUP.test(message)) return true;
  // Long unbroken strings (encoded payloads, keyword stuffing without spaces), ignoring URLs.
  if (/\S{120,}/.test(message.replace(URL_PATTERN, ""))) return true;
  // The same character repeated many times.
  if (/(.)\1{24,}/.test(message)) return true;
  return false;
}

const seen = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;

function messageKey(email: string, message: string) {
  return createHash("sha256")
    .update(`${email.toLowerCase()}\n${message.replace(/\s+/g, " ").trim().toLowerCase()}`)
    .digest("hex");
}

/** True when the same sender already sent this exact message recently. Records it otherwise. */
export function isDuplicate(email: string, message: string) {
  const now = Date.now();
  if (seen.size > 5_000) {
    for (const [key, expires] of seen) if (expires <= now) seen.delete(key);
  }
  const key = messageKey(email, message);
  const expires = seen.get(key);
  if (expires && expires > now) return true;
  seen.set(key, now + DUPLICATE_WINDOW_MS);
  return false;
}

/** Forgets a message so the sender can retry after a delivery failure. */
export function forgetMessage(email: string, message: string) {
  seen.delete(messageKey(email, message));
}

function withTimeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([promise, new Promise<null>((resolve) => setTimeout(() => resolve(null), ms))]);
}

function dnsCode(error: unknown) {
  return (error as NodeJS.ErrnoException).code;
}

/**
 * False only when DNS confirms the email domain cannot receive mail. Timeouts
 * and other DNS failures are treated as deliverable so real visitors are never
 * blocked by a slow resolver.
 */
export async function canReceiveEmail(email: string) {
  const domain = email.split("@").pop()?.toLowerCase();
  if (!domain) return false;
  try {
    const records = await withTimeout(resolveMx(domain), 3_000);
    if (records === null) return true;
    // A single "." record (RFC 7505) means the domain accepts no mail.
    return records.some((record) => record.exchange && record.exchange !== ".");
  } catch (error) {
    if (dnsCode(error) === "ENOTFOUND") return false;
    if (dnsCode(error) !== "ENODATA") return true;
  }
  // No MX record: mail falls back to the domain's own address (RFC 5321).
  try {
    const addresses = await withTimeout(resolve4(domain), 3_000);
    return addresses === null || addresses.length > 0;
  } catch (error) {
    const code = dnsCode(error);
    return code !== "ENOTFOUND" && code !== "ENODATA";
  }
}
