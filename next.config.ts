import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const sanityImagePath =
  projectId && /^[a-z0-9-]+$/.test(projectId) ? `/images/${projectId}/${dataset}/**` : "/images/**";

// Domains from https://www.smartsupp.com/help/how-to-use-smartsupp-with-content-security-policy-csp/
const smartsupp = /^(true|1|on|yes)$/i.test(process.env.SMARTSUPP_ENABLED?.trim() ?? "")
  ? {
      script: ["https://*.smartsuppchat.com", "https://*.smartsuppcdn.com"],
      style: ["https://*.smartsuppcdn.com"],
      img: ["https://*.smartsuppcdn.com", "https://*.smartsupp.com"],
      font: ["https://*.smartsuppcdn.com"],
      media: ["https://*.smartsuppcdn.com"],
      connect: [
        "https://*.smartsupp.com",
        "wss://*.smartsupp.com",
        "https://*.smartsuppchat.com",
        "https://*.smartsuppcdn.com",
      ],
      frame: ["https://*.smartsupp.com", "https://*.smartsuppchat.com", "https://*.smartsuppcdn.com"],
    }
  : { script: [], style: [], img: [], font: [], media: [], connect: [], frame: [] };

function csp(directives: Record<string, string[]>) {
  return Object.entries(directives)
    .map(([name, values]) => [name, ...values].join(" ").trim())
    .join("; ");
}

// Pages are statically rendered, so the policy is nonce-free and relies on
// 'unsafe-inline' for the framework's inline bootstrap scripts.
const siteCsp = csp({
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : []), ...smartsupp.script],
  "style-src": ["'self'", "'unsafe-inline'", ...smartsupp.style],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://cdn.sanity.io",
    "https://images.unsplash.com",
    ...smartsupp.img,
  ],
  "font-src": ["'self'", ...smartsupp.font],
  "connect-src": ["'self'", "https://*.sanity.io", "wss://*.sanity.io", ...smartsupp.connect],
  "frame-src": ["'self'", ...smartsupp.frame],
  "media-src": ["'self'", ...smartsupp.media],
  "worker-src": ["'self'", "blob:"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'self'"],
  "manifest-src": ["'self'"],
  ...(isDev ? {} : { "upgrade-insecure-requests": [] }),
});

// Sanity Studio needs eval for some editor plugins, user avatars from
// identity providers, and live connections to the Sanity APIs.
const studioCsp = csp({
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "font-src": ["'self'", "data:"],
  "connect-src": ["'self'", "https://*.sanity.io", "wss://*.sanity.io", "https://*.sanity.work"],
  "frame-src": ["'self'"],
  "media-src": ["'self'", "blob:", "https://cdn.sanity.io"],
  "worker-src": ["'self'", "blob:"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  // The Sanity Dashboard (sanity.io) embeds the Studio in an iframe.
  "frame-ancestors": ["'self'", "https://*.sanity.io"],
  ...(isDev ? {} : { "upgrade-insecure-requests": [] }),
});

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: sanityImagePath },
    ],
  },
  async headers() {
    const noIndex = { key: "X-Robots-Tag", value: "noindex, nofollow" };
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders, { key: "Content-Security-Policy", value: siteCsp }],
      },
      // X-Frame-Options has no way to allow sanity.io, so the Studio relies on frame-ancestors.
      {
        source: "/((?!studio(?:/|$)).*)",
        headers: [{ key: "X-Frame-Options", value: "SAMEORIGIN" }],
      },
      // Later entries override earlier ones for the same header key.
      { source: "/studio", headers: [{ key: "Content-Security-Policy", value: studioCsp }, noIndex] },
      {
        source: "/studio/:path*",
        headers: [{ key: "Content-Security-Policy", value: studioCsp }, noIndex],
      },
      { source: "/api/:path*", headers: [noIndex] },
    ];
  },
};

export default nextConfig;
