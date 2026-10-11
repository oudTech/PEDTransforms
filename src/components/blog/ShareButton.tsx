"use client";

import { Check, Share2 } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  const ok = document.execCommand("copy");
  field.remove();
  if (!ok) throw new Error("Copy failed");
}

export default function ShareButton({
  path,
  title,
  tone = "dark",
  className = "",
}: {
  path: string;
  title: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2200);
    return () => clearTimeout(timer);
  }, [status]);

  // The card's title link covers the whole card, so stop the click reaching it.
  const share = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const url = new URL(path, window.location.origin).toString();
    const data = { title, url };

    if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await copyText(url);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  const light = tone === "light";
  const copied = status === "copied";

  return (
    <span className={`relative z-10 inline-flex ${className}`}>
      <span
        aria-live="polite"
        className={`pointer-events-none absolute right-0 bottom-full mb-2 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm transition duration-200 ${
          status === "idle" ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
        } ${light ? "bg-white text-[#111]" : "bg-[#111] text-white"}`}
      >
        {copied ? "Link copied" : status === "error" ? "Could not copy link" : ""}
      </span>
      <button
        type="button"
        onClick={share}
        aria-label={`Share “${title}”`}
        title="Share"
        className={`flex size-8 items-center sm:size-9 justify-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 ${
          light
            ? "border-white/25 text-white hover:border-white hover:bg-white hover:text-[#111] focus-visible:ring-offset-[#111]"
            : "border-black/10 bg-white text-[#1f1f1f] hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
        } ${copied ? (light ? "border-white bg-white text-[#111]" : "border-[var(--brand)] bg-[var(--brand)] text-white") : ""}`}
      >
        {copied ? <Check aria-hidden className="size-4" /> : <Share2 aria-hidden className="size-4" />}
      </button>
    </span>
  );
}
