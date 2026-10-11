import "server-only";

export const TURNSTILE_ACTION = "contact";

type SiteverifyResponse = {
  success: boolean;
  action?: string;
  "error-codes"?: string[];
  metadata?: { result_with_testing_key?: boolean };
};

/** Checks a Cloudflare Turnstile token. Tokens are single use and expire after 5 minutes. */
export async function verifyTurnstile(secretKey: string, token: string, ip: string): Promise<boolean> {
  if (!token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    const result = (await response.json()) as SiteverifyResponse;
    if (!result.success) {
      console.warn("[turnstile] Rejected:", result["error-codes"]?.join(", ") || "unknown reason");
      return false;
    }
    // Cloudflare's test secrets (used for local testing) don't echo the action.
    if (result.action === TURNSTILE_ACTION || result.metadata?.result_with_testing_key) return true;
    console.warn("[turnstile] Token was issued for a different action:", result.action);
    return false;
  } catch (error) {
    console.error("[turnstile] Verification request failed:", error instanceof Error ? error.message : error);
    return false;
  }
}
