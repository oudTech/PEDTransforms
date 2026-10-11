"use client";

import { Check, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const AUTO_CLOSE_MS = 5_000;
const EXIT_MS = 160;

/**
 * Confirmation shown after a successful enquiry. It closes itself after five
 * seconds; hovering pauses the countdown so slower readers can finish.
 */
export default function SuccessDialog({
  open,
  firstName,
  email,
  onClose,
}: {
  open: boolean;
  firstName?: string;
  email?: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const remaining = useRef(AUTO_CLOSE_MS);
  const paused = hovered || hidden;

  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      dialog.current?.close();
      setClosing(false);
      setHovered(false);
      remaining.current = AUTO_CLOSE_MS;
      onClose();
    }, EXIT_MS);
  }, [onClose]);

  useEffect(() => {
    const element = dialog.current;
    if (open && element && !element.open) element.showModal();
  }, [open]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!open || paused || closing) return;
    const startedAt = Date.now();
    const timer = window.setTimeout(close, remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt));
    };
  }, [open, paused, closing, close]);

  if (!open) return null;

  // Rendered under <body>: WebKit can fail to paint a modal dialog and its backdrop
  // when it is nested inside this page's content.
  return createPortal(
    <dialog
      ref={dialog}
      aria-labelledby="contact-success-title"
      aria-describedby="contact-success-body"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className={`success-dialog m-auto w-[calc(100%-2rem)] max-w-md overflow-visible bg-transparent p-0 outline-none ${
        closing
          ? "animate-out fade-out-0 zoom-out-95 duration-150 fill-mode-forwards"
          : "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-300"
      }`}
      data-closing={closing || undefined}
    >
      <div
        autoFocus
        tabIndex={-1}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className="relative overflow-hidden rounded-3xl outline-none bg-white px-6 pb-7 pt-9 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:px-9"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-[#777] transition hover:bg-black/5 hover:text-[#1a1a1a] focus-visible:outline-2 focus-visible:outline-[var(--brand)]"
        >
          <X aria-hidden className="size-4.5" />
        </button>

        <div className="relative mx-auto flex size-16 items-center justify-center">
          <span aria-hidden className="absolute inset-0 rounded-full bg-emerald-500/15 motion-safe:animate-ping [animation-iteration-count:1]" />
          <span className="relative flex size-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_20px_-6px_rgba(16,185,129,0.7)]">
              <Check aria-hidden strokeWidth={3} className="size-5" />
            </span>
          </span>
        </div>

        <h2 id="contact-success-title" className="mt-6 text-2xl font-semibold tracking-tight text-[#1a1a1a]">
          Message sent{firstName ? `, ${firstName}` : ""}!
        </h2>
        <div id="contact-success-body" className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#1f1f1f]">
          <p>Thanks for reaching out. We&apos;ve received your enquiry and a member of our team will contact you shortly.</p>
          {email && (
            <p className="text-sm text-[#777]">
              A confirmation is on its way to
              <span className="block font-medium text-[#1a1a1a] [overflow-wrap:anywhere]">{email}</span>
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={close}
          className="mt-7 w-full rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(189,0,0,0.6)] transition hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
        >
          Done
        </button>

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-black/[0.04]">
          <div
            className="h-full origin-left bg-[var(--brand)]"
            style={{
              animation: `success-countdown ${AUTO_CLOSE_MS}ms linear forwards`,
              animationPlayState: paused || closing ? "paused" : "running",
            }}
          />
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
