import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Compass,
  Cpu,
  Gauge,
  Handshake,
  Network,
  PackageSearch,
  Scaling,
  ServerCog,
  Target,
  UserPlus,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import FeatureSection from "@/components/ui/feature-section";
import { Features } from "@/components/ui/features-4";
import type { Crumb } from "@/lib/seo";
import { company, lifecycle, valueProposition, whyUs } from "@/data/site";
import {
  ShootingStarsGrid,
  type ShootingStarsGridPalette,
} from "@/components/ui/shooting-stars-grid";

/** Page-load entrance for hero content. Pure CSS, so it also runs without JS. */
export const enter =
  "animate-in fade-in slide-in-from-bottom-3 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] fill-mode-both motion-reduce:animate-none";

export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <p
      className={`flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] sm:text-sm ${
        dark ? "text-white/65" : "text-[#6f6a66]"
      } ${className}`}
    >
      <span aria-hidden className={`h-px w-12 shrink-0 ${dark ? "bg-white/35" : "bg-[#b5aea8]"}`} />
      {children}
    </p>
  );
}

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
      <AnimatedGridPattern
        className="inset-x-0 h-full skew-y-12 text-[#ff4d4d] [mask-image:radial-gradient(640px_circle_at_70%_40%,white,transparent)]"
        lineColor="rgba(255,255,255,0.07)"
        duration={3}
        maxOpacity={0.22}
        numSquares={24}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Breadcrumbs items={breadcrumbs} tone="light" />
        {eyebrow && (
          <Eyebrow tone="dark" className={`mt-8 ${enter}`}>
            {eyebrow}
          </Eyebrow>
        )}
        <h1
          className={`${eyebrow ? "mt-5" : "mt-8"} max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[56px] ${enter} [animation-delay:90ms]`}
        >
          {title}
        </h1>
        {intro && (
          <p
            className={`mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/70 ${enter} [animation-delay:180ms]`}
          >
            {intro}
          </p>
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
    <div data-reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
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
    <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.06] bg-black/[0.06] lg:grid-cols-6">
      {lifecycle.map((item, index) => (
        <li
          key={item.step}
          className={`relative p-4 sm:p-6 ${dark ? "bg-[#161616]" : "bg-white"}`}
        >
          <span className={`text-xs font-semibold tracking-widest ${dark ? "text-white/40" : "text-[#aaa]"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className={`mt-2 text-base font-semibold sm:text-lg ${dark ? "text-white" : "text-[#1a1a1a]"}`}>
            {item.step}
            {index < lifecycle.length - 1 && (
              <span className="ml-2 text-[var(--brand)]" aria-hidden>
                →
              </span>
            )}
          </p>
          <p className={`mt-2 text-[13px] leading-relaxed sm:text-sm ${dark ? "text-white/60" : "text-[#666]"}`}>
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

const valueDetails: Record<string, { subtitle: string; icon: LucideIcon }> = {
  "Modernise business processes": { subtitle: "Digital Transformation", icon: Workflow },
  "Identify and procure the right technology": { subtitle: "Digital Transformation", icon: PackageSearch },
  "Automate critical operations": { subtitle: "Automation & Smart Systems", icon: Bot },
  "Integrate systems and data": { subtitle: "Automation & Smart Systems", icon: Network },
  "Access specialised technology talent": { subtitle: "Technology Talent", icon: UserPlus },
  "Scale technology teams when required": { subtitle: "Technology Talent", icon: Users },
  "Improve operational visibility and efficiency": { subtitle: "Automation & Smart Systems", icon: Gauge },
  "Manage and support technology environments": { subtitle: "Managed Services", icon: ServerCog },
  "Make better technology and business decisions": { subtitle: "Consulting & Advisory", icon: Compass },
};

export function ValueProposition({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <FeatureSection
      id="value-heading"
      eyebrow={eyebrow}
      title={title}
      intro={intro}
      listLabel="What we help organisations do"
      tasks={valueProposition.map((item) => ({
        title: item,
        subtitle: valueDetails[item]?.subtitle ?? company.name,
        icon: valueDetails[item]?.icon ?? Workflow,
      }))}
      tags={company.tagline.replaceAll(".", "").split(" ")}
    />
  );
}

const whyUsIcons: Record<string, LucideIcon> = {
  "Technology-led": Cpu,
  "Business-focused": Target,
  "People and technology": Users,
  "End-to-end support": Workflow,
  "Scalable solutions": Scaling,
  "One accountable partner": Handshake,
};

export function WhyUs({
  title,
  intro,
  className = "bg-[#fafafa]",
}: {
  title: ReactNode;
  intro?: string;
  className?: string;
}) {
  return (
    <Features
      id="why-heading"
      eyebrow="Why PEDTransforms"
      title={title}
      intro={intro}
      className={className}
      items={whyUs.map((item) => ({ ...item, icon: whyUsIcons[item.title] ?? Cpu }))}
    />
  );
}

export function CallToAction({
  eyebrow = "Let's talk",
  title = "Ready to turn technology into business value?",
  accent,
  body = "Tell us about your objectives and challenges. We will recommend a practical next step.",
  href = "/contact",
  label = "Contact us",
}: {
  eyebrow?: string;
  title?: string;
  accent?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <ShootingStarsGrid
        className="mx-auto min-h-[420px] max-w-7xl rounded-3xl border-0 text-white shadow-xl shadow-[#bd0000]/20 md:min-h-[460px] md:rounded-[40px]"
        palette={ctaPalette}
        starCount={40}
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p
            data-reveal
            className="mb-6 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-white/75 sm:text-sm"
          >
            <span aria-hidden className="h-px w-10 bg-white/40" />
            {eyebrow}
            <span aria-hidden className="h-px w-10 bg-white/40" />
          </p>
          <h2
            data-reveal
            className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {title}
            {accent && (
              <>
                <br />
                <span className="text-white/70">{accent}</span>
              </>
            )}
          </h2>
          <p
            data-reveal
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {body}
          </p>
          <div data-reveal className="mt-9">
            <Link
              href={href}
              className="group inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[var(--brand)] shadow-lg shadow-black/10 transition-[transform,box-shadow] duration-150 hover:scale-105 hover:ring-4 hover:ring-white/25 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
            >
              {label}
              <ArrowRight
                aria-hidden
                className="ml-2 size-4 transition-transform duration-150 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </ShootingStarsGrid>
    </div>
  );
}

const ctaPalette: ShootingStarsGridPalette = {
  "--ssg-bg": "linear-gradient(160deg, #c80000 0%, var(--brand) 45%, var(--brand-dark) 100%)",
  "--ssg-grid": "rgba(255,255,255,0.16)",
  "--ssg-vignette-mid": "rgba(120,0,0,0.1)",
  "--ssg-vignette-edge": "rgba(100,0,0,0.45)",
  "--ssg-glow-a": "rgba(255,255,255,0.16)",
  "--ssg-glow-b": "rgba(255,170,170,0.16)",
  "--ssg-star": "#ffffff",
  "--ssg-star-glow": "rgba(255,255,255,0.6)",
  "--ssg-runner-tail": "rgba(255,255,255,0.12)",
  "--ssg-runner-core": "rgba(255,226,226,0.9)",
  "--ssg-runner-head": "rgba(255,255,255,0.98)",
  "--ssg-runner-shadow": "rgba(255,255,255,0.5)",
};
