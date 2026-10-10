"use client";

import Link from "next/link";
import { Loader2, MessageCircle, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { grantChatConsent, useChatConsent, useConsent } from "@/lib/consent";

type SmartsuppFn = ((...args: unknown[]) => void) & { _?: unknown[][] };

declare global {
  interface Window {
    smartsupp?: SmartsuppFn;
    _smartsupp?: Record<string, unknown>;
  }
}

function clearSmartsuppStorage() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const name of document.cookie.split("; ").map((c) => c.split("=")[0])) {
    if (!name.startsWith("ssupp")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ""}`;
    }
  }
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith("ssupp")) localStorage.removeItem(key);
  }
}

/** Installs Smartsupp's command queue and loader script once; safe to call repeatedly. */
function loadSmartsupp(chatKey: string) {
  if (window.smartsupp) return window.smartsupp;
  window._smartsupp = {
    ...window._smartsupp,
    key: chatKey,
    privacyNoticeEnabled: true,
    privacyNoticeUrl: new URL("/privacy-policy", location.origin).toString(),
  };
  const queue: SmartsuppFn = (...args) => {
    queue._!.push(args);
  };
  queue._ = [];
  window.smartsupp = queue;
  const script = document.createElement("script");
  script.async = true;
  script.charset = "utf-8";
  script.src = "https://www.smartsuppchat.com/loader.js?";
  document.head.append(script);
  return queue;
}

function whenIdle(callback: () => void) {
  const run = () =>
    "requestIdleCallback" in window ? window.requestIdleCallback(callback) : setTimeout(callback, 1);
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
}

/**
 * Smartsupp sets cookies as soon as it loads, so it only loads after the visitor
 * accepts all cookies or explicitly starts a chat. Until then a first-party chat
 * button that sets nothing stands in for it.
 */
export default function SmartsuppLoader({ chatKey }: { chatKey: string }) {
  const consent = useConsent();
  const chatConsent = useChatConsent();
  const allowed = consent === "accepted" || chatConsent === true;
  const loaded = useRef(false);
  const openOnLoad = useRef(false);

  useEffect(() => {
    if (consent === undefined || chatConsent === undefined) return;

    if (!allowed) {
      if (consent !== "rejected") return;
      clearSmartsuppStorage();
      // The widget cannot be unloaded in place, so withdraw consent with a fresh page.
      if (loaded.current) location.reload();
      return;
    }

    const start = () => {
      const smartsupp = loadSmartsupp(chatKey);
      loaded.current = true;
      // Statistics and marketing cookies need full consent, not just a chat.
      const full = consent === "accepted";
      smartsupp("analyticsConsent", full);
      smartsupp("marketingConsent", full);
      if (openOnLoad.current) {
        openOnLoad.current = false;
        smartsupp("chat:open");
      }
    };
    if (loaded.current || openOnLoad.current) start();
    else whenIdle(start);
  }, [allowed, chatConsent, chatKey, consent]);

  if (consent === undefined || chatConsent === undefined || allowed) return null;

  return (
    <ChatPrompt
      onStart={() => {
        openOnLoad.current = true;
        grantChatConsent();
      }}
    />
  );
}

function ChatPrompt({ onStart }: { onStart: () => void }) {
  const [open, setOpen] = useState(false);
  const [starting, setStarting] = useState(false);
  const panelId = useId();
  const titleId = useId();
  const startRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    startRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          className="w-[min(340px,calc(100vw-2rem))] rounded-2xl border border-black/[0.08] bg-white p-5 text-[#1a1a1a] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 id={titleId} className="text-base font-semibold">
              Chat with us
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-m-1 rounded-full p-1 text-[#777] transition hover:bg-[#f4f4f5] hover:text-[#1a1a1a]"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-[#555]">
            Our live chat is provided by Smartsupp. Starting a chat loads it and sets the cookies it needs
            to keep your conversation going. See our{" "}
            <Link href="/cookie-policy" className="font-medium text-[var(--brand)] underline underline-offset-2">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-full border-2 border-[#1a1a1a]/15 px-4 py-2 text-center text-sm font-semibold transition hover:border-[#1a1a1a]/40"
            >
              Email us
            </Link>
            <button
              ref={startRef}
              type="button"
              disabled={starting}
              onClick={() => {
                setStarting(true);
                onStart();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--brand)] bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white transition hover:border-[var(--brand-dark)] hover:bg-[var(--brand-dark)] disabled:opacity-80"
            >
              {starting && <Loader2 aria-hidden className="size-4 animate-spin" />}
              Start chat
            </button>
          </div>
        </section>
      )}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close chat options" : "Chat with us"}
        className="flex size-14 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-[0_12px_30px_-8px_rgba(189,0,0,0.55)] transition hover:scale-105 hover:bg-[var(--brand-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
      >
        {open ? <X aria-hidden className="size-6" /> : <MessageCircle aria-hidden className="size-6" />}
      </button>
    </div>
  );
}
