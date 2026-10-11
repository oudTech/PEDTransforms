import "server-only";
import { z } from "zod";

const mailbox = z
  .string()
  .regex(
    /^(?:[^<>@\r\n]{1,64}\s<[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+>|[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+)$/,
  );
// Accepts the bare token, "google-site-verification=TOKEN", or a pasted <meta> tag.
const verificationToken = z
  .string()
  .transform((value) => value.match(/content=["']([^"']+)["']/)?.[1] ?? value.replace(/^[\w.-]+=/, ""))
  .pipe(z.string().regex(/^[\w-]{8,128}$/));

function read<T>(name: string, schema: z.ZodType<T>): T | undefined {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  const result = schema.safeParse(raw);
  if (!result.success) {
    console.error(`[env] ${name} is set but invalid, so it is being ignored.`);
    return undefined;
  }
  return result.data;
}

function flag(name: string) {
  return /^(true|1|on|yes)$/i.test(process.env[name]?.trim() ?? "");
}

const turnstileSiteKey = read("TURNSTILE_SITE_KEY", z.string().regex(/^[\w-]{10,100}$/));
const turnstileSecretKey = read("TURNSTILE_SECRET_KEY", z.string().regex(/^[\w-]{10,200}$/));
if (Boolean(turnstileSiteKey) !== Boolean(turnstileSecretKey)) {
  console.error("[env] Set both TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY to enable the contact form bot check.");
}

export const serverEnv = {
  /** Both Cloudflare Turnstile keys, or undefined when the bot check is off. */
  turnstile:
    turnstileSiteKey && turnstileSecretKey
      ? { siteKey: turnstileSiteKey, secretKey: turnstileSecretKey }
      : undefined,
  smartsuppKey: flag("SMARTSUPP_ENABLED")
    ? read("SMARTSUPP_KEY", z.string().regex(/^[a-f0-9]{40}$/i))
    : undefined,
  resendApiKey: read("RESEND_API_KEY", z.string().startsWith("re_")),
  contactToEmail: read("CONTACT_TO_EMAIL", z.email()),
  contactFromEmail: read("CONTACT_FROM_EMAIL", mailbox),
  googleSiteVerification: read("GOOGLE_SITE_VERIFICATION", verificationToken),
  bingSiteVerification: read("BING_SITE_VERIFICATION", verificationToken),
};
