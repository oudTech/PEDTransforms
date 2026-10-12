import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/cnippet-empty";
import { cn } from "@/lib/utils";

export const emptyPrimaryAction =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(189,0,0,0.6)] transition hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]";

export const emptySecondaryAction =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1a1a1a]/10 bg-white px-6 py-2.5 text-sm font-semibold text-[#1a1a1a] transition hover:border-[var(--brand)] hover:text-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]";

function ArticleStackIllustration({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div aria-hidden="true" className="relative h-28 w-56">
      <div className="absolute inset-x-8 top-0 h-6 rounded-t-xl border border-black/[0.05] bg-[#f1f1f2]" />
      <div className="absolute inset-x-4 top-3 h-6 rounded-t-xl border border-black/[0.06] bg-[#f6f6f7]" />
      <div className="absolute inset-x-0 top-6 flex h-[76px] items-center gap-3.5 rounded-xl border border-black/[0.07] bg-white px-4 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.25)]">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#ffe3e3] to-[#fff5f5]">
          <div className="absolute bottom-1.5 left-1.5 h-1.5 w-5 rounded-full bg-[var(--brand)]/60" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="h-1.5 w-8 rounded-full bg-[var(--brand)]/70" />
          <div className="h-2.5 w-11/12 rounded bg-[#ececee]" />
          <div className="h-2 w-3/5 rounded bg-[#f3f3f4]" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-white/0 via-white/60 to-white" />
      <span className="absolute -right-3 -top-2 flex size-11 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-[0_10px_24px_-8px_rgba(189,0,0,0.7)] ring-4 ring-white">
        <Icon className="size-5" strokeWidth={2} />
      </span>
    </div>
  );
}

export default function BlogEmptyState({
  icon,
  eyebrow,
  title,
  description,
  actions,
  className,
  headingLevel: Heading = "h2",
}: {
  icon: LucideIcon;
  eyebrow?: string;
  title: string;
  description: ReactNode;
  actions?: ReactNode;
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
}) {
  return (
    <Empty
      className={cn(
        "mx-auto w-full max-w-3xl gap-0 rounded-3xl bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.06]",
        className,
      )}
    >
      <EmptyHeader className="max-w-md">
        <EmptyMedia>
          <ArticleStackIllustration icon={icon} />
        </EmptyMedia>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">
            {eyebrow}
          </p>
        )}
        <EmptyTitle className="text-balance text-2xl font-semibold tracking-tight text-[#1a1a1a]">
          <Heading>{title}</Heading>
        </EmptyTitle>
        <EmptyDescription className="mt-3 text-pretty text-[15px] leading-relaxed text-[#1f1f1f]/80">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      {actions && (
        <EmptyContent className="mt-8 max-w-md flex-row flex-wrap justify-center gap-3">
          {actions}
        </EmptyContent>
      )}
    </Empty>
  );
}
