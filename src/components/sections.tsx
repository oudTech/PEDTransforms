import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Crumb } from "@/lib/seo";
import { lifecycle, whyUs } from "@/data/site";

export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  breadcrumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(189,0,0,0.35),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Breadcrumbs items={breadcrumbs} tone="light" />
        {eyebrow && (
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-[#ff4d4d]">
            {eyebrow}
          </p>
        )}
        <h1
          className={`${eyebrow ? "mt-3" : "mt-8"} max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[56px]`}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/70">{intro}</p>
        )}
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand)]">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-tight text-[#1a1a1a] sm:text-4xl"
      >
        {title}
      </h2>
      {intro && <p className="mt-4 text-pretty text-lg leading-relaxed text-[#555]">{intro}</p>}
    </div>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-white ${className}`}
      aria-hidden
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6l2.5 2.5 4.5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Lifecycle({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-black/[0.06] bg-black/[0.06] sm:grid-cols-2 lg:grid-cols-6">
      {lifecycle.map((item, index) => (
        <li
          key={item.step}
          className={`relative p-6 ${dark ? "bg-[#161616]" : "bg-white"}`}
        >
          <span className={`text-xs font-semibold tracking-widest ${dark ? "text-white/40" : "text-[#aaa]"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className={`mt-2 text-lg font-semibold ${dark ? "text-white" : "text-[#1a1a1a]"}`}>
            {item.step}
            {index < lifecycle.length - 1 && (
              <span className="ml-2 text-[var(--brand)]" aria-hidden>
                →
              </span>
            )}
          </p>
          <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/60" : "text-[#666]"}`}>
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function WhyUsGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {whyUs.map((item, index) => (
        <li
          key={item.title}
          className="rounded-2xl border border-black/[0.06] bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.3)]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f1] text-sm font-bold text-[var(--brand)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-lg font-semibold text-[#1a1a1a]">{item.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#555]">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function CallToAction({
  title = "Ready to turn technology into business value?",
  body = "Tell us about your objectives and challenges. We will recommend a practical next step.",
  href = "/contact",
  label = "Contact us",
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--brand)] px-8 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-2 max-w-xl text-white/85">{body}</p>
          </div>
          <Link
            href={href}
            className="relative mt-6 inline-block shrink-0 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[var(--brand)] transition hover:bg-white/90 lg:mt-0"
          >
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}
