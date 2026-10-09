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

export const serverEnv = {
  resendApiKey: read("RESEND_API_KEY", z.string().startsWith("re_")),
  contactToEmail: read("CONTACT_TO_EMAIL", z.email()),
  contactFromEmail: read("CONTACT_FROM_EMAIL", mailbox),
  googleSiteVerification: read("GOOGLE_SITE_VERIFICATION", verificationToken),
  bingSiteVerification: read("BING_SITE_VERIFICATION", verificationToken),
};
