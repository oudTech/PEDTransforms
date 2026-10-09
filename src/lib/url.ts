const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

function isSameOriginPath(value: string) {
  return value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\");
}

/** Returns the href if it is relative, an in-page anchor or uses an allowed scheme. */
export function safeHref(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const href = value.trim();
  if (!href) return null;
  if (isSameOriginPath(href) || href.startsWith("#")) return href;
  try {
    return SAFE_PROTOCOLS.has(new URL(href).protocol) ? href : null;
  } catch {
    return null;
  }
}

/** Resolves a user-supplied redirect target to a path on this site, or the fallback. */
export function safeRedirectPath(value: string | null, fallback = "/"): string {
  if (!value || !isSameOriginPath(value)) return fallback;
  const base = "http://localhost";
  const url = new URL(value, base);
  return url.origin === base ? `${url.pathname}${url.search}${url.hash}` : fallback;
}

export function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}
