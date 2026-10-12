import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HowItWorksStep = {
  icon: LucideIcon;
  title: string;
  body: string;
  href?: string;
};

export default function HowItWorks01({
  id,
  eyebrow,
  title,
  intro,
  steps,
  cta,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  steps: HowItWorksStep[];
  cta?: { href: string; label: string };
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn("bg-background py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="flex flex-col items-center gap-3 text-center">
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-widest text-[var(--brand)]">
              {eyebrow}
            </span>
          )}
          <h2
            id={id}
            className="text-balance font-semibold tracking-tight text-foreground"
            style={{
              fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            {title}
          </h2>
          {intro && (
            <p className="max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
              {intro}
            </p>
          )}
        </div>

        <ol
          className={cn(
            "mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6",
            steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
          )}
        >
          {steps.map((step) => (
            <li
              key={step.title}
              data-reveal
              className="group relative flex flex-col gap-2.5 rounded-2xl border border-border bg-card p-5 shadow-sm shadow-black/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.3)] sm:gap-3 sm:p-6"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-[#fff1f1] text-[var(--brand)] transition-colors group-hover:bg-[var(--brand)] group-hover:text-white sm:size-10 sm:rounded-xl">
                <step.icon aria-hidden className="size-[18px] sm:size-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-1 text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-[var(--brand)] sm:text-lg">
                {step.href ? (
                  <Link href={step.href} className="after:absolute after:inset-0">
                    {step.title}
                  </Link>
                ) : (
                  step.title
                )}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              {step.href && (
                <span className="mt-auto pt-2 text-sm font-semibold text-[var(--brand)]">
                  Learn more
                  <span className="ml-1 inline-block transition group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              )}
            </li>
          ))}
        </ol>

        {cta && (
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="gap-2 rounded-full px-7 font-semibold">
              <Link href={cta.href}>
                {cta.label}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
