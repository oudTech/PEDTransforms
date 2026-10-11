"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { onConsentSettingsOpen, setConsent, useConsent, type ConsentChoice } from "@/lib/consent";

export default function CookieConsent({ liveChat }: { liveChat: boolean }) {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const titleId = useId();

  useEffect(() => onConsentSettingsOpen(() => setReopened(true)), []);

  // Hidden during server render and hydration; shown once we know there is no valid choice.
  const open = consent === null || reopened;
  if (consent === undefined || !open) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setReopened(false);
  };

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-black/[0.08] bg-white p-5 text-[#1a1a1a] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] animate-in fade-in slide-in-from-bottom-4 duration-500 motion-reduce:animate-none sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[400px] sm:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#fff1f1] text-[var(--brand)]">
          <Cookie aria-hidden className="size-[18px]" />
        </span>
        <div>
          <h2 id={titleId} className="text-base font-semibold">
            Cookies on this website
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-[#1f1f1f]">
            {liveChat
              ? "PEDTransforms uses strictly necessary cookies to run this site. If you accept, we also load our Smartsupp live chat and its cookies. If you reject, you can still start a chat yourself with the chat button. "
              : "PEDTransforms uses only strictly necessary cookies to run this site and remember your choice. "}
            You can change your choice at any time under &ldquo;Cookie settings&rdquo; in the
            footer. Read our{" "}
            <Link href="/cookie-policy" className="font-medium text-[var(--brand)] underline underline-offset-2">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="font-medium text-[var(--brand)] underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="rounded-full border-2 border-[#1a1a1a]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#1a1a1a] transition hover:border-[#1a1a1a]/40"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-full border-2 border-[var(--brand)] bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[var(--brand-dark)] hover:bg-[var(--brand-dark)]"
        >
          Accept
        </button>
      </div>
    </section>
  );
}
