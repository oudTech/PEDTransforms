import { company } from "@/data/site";

export const legal = {
  /** Registered name as it appears with the Corporate Affairs Commission (CAC). */
  controllerName: company.legalName,
  /** Mailbox for privacy requests, data subject rights and legal notices. */
  privacyEmail: "info@pedtransforms.com",
  country: "the Federal Republic of Nigeria",
  lastUpdated: "10 October 2026",
  regulator: {
    name: "Nigeria Data Protection Commission (NDPC)",
    url: "https://ndpc.gov.ng",
  },
};

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export type CookieRow = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  category: "Strictly necessary" | "Functional" | "Marketing";
};

export const necessaryCookies: CookieRow[] = [
  {
    name: "ped_cookie_consent",
    provider: `${company.name} (first party)`,
    purpose: "Remembers whether you accepted or rejected non-essential cookies, so we do not ask on every page.",
    duration: "6 months",
    category: "Strictly necessary",
  },
  {
    name: "ped_chat_consent (session storage)",
    provider: `${company.name} (first party)`,
    purpose:
      "Remembers that you chose Start chat, so the live chat stays available while you browse. Set only if you start a chat.",
    duration: "Until you close the browser tab",
    category: "Strictly necessary",
  },
  {
    name: "__prerender_bypass",
    provider: `${company.name} (first party)`,
    purpose:
      "Set only for our content editors when they preview unpublished blog content. Not set for ordinary visitors.",
    duration: "Session",
    category: "Strictly necessary",
  },
];

export const liveChatCookies: CookieRow[] = [
  {
    name: "ssupp.vid",
    provider: "Smartsupp.com, s.r.o. (Czech Republic)",
    purpose:
      "Identifies your browser to the live chat so an ongoing conversation continues when you move between pages.",
    duration: "6 months",
    category: "Functional",
  },
  {
    name: "ssupp.visits",
    provider: "Smartsupp.com, s.r.o. (Czech Republic)",
    purpose:
      "Counts your previous visits so chat greetings and automated messages are relevant. Set only if you accept all cookies, not when you only start a chat.",
    duration: "6 months",
    category: "Marketing",
  },
  {
    name: "ssupp_… (local storage)",
    provider: "Smartsupp.com, s.r.o. (Czech Republic)",
    purpose: "Stores chat preferences and conversation state in your browser.",
    duration: "Until you clear your browser storage",
    category: "Functional",
  },
];
