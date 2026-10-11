import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function Features({
  id,
  eyebrow,
  title,
  intro,
  items,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  items: Feature[];
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn("py-20 lg:py-28", className)}>
      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 md:space-y-16 lg:px-8">
        <div data-reveal className="relative z-10 mx-auto max-w-2xl text-center">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand)]">
              {eyebrow}
            </p>
          )}
          <h2
            id={id}
            className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-5 text-pretty text-lg leading-relaxed text-[#1f1f1f]">{intro}</p>}
        </div>

        <ul className="relative mx-auto grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.07] lg:max-w-none lg:grid-cols-3">
          {items.map(({ icon: Icon, title: itemTitle, description }) => (
            <li
              key={itemTitle}
              data-reveal
              className="group space-y-3 bg-white p-4 transition-colors hover:bg-[#fffafa] sm:p-8 lg:p-10"
            >
              <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#fff1f1] text-[var(--brand)] transition-colors group-hover:bg-[var(--brand)] group-hover:text-white">
                  <Icon aria-hidden className="size-[18px]" strokeWidth={1.8} />
                </span>
                <h3 className="text-sm font-semibold leading-snug text-[#1a1a1a] sm:text-base">{itemTitle}</h3>
              </div>
              <p className="text-[13px] leading-relaxed text-[#1f1f1f] sm:text-[15px]">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
