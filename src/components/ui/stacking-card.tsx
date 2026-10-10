import { ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type StackingCardItem = {
  label: string;
  text: string;
  image: StaticImageData;
  imageAlt: string;
  /** Card background colour. */
  color: string;
  tone?: "light" | "dark";
  href?: string;
  linkLabel?: string;
};

type CardProps = StackingCardItem & {
  i: number;
  /** Portion of the stack's scroll, from 0 to 1, after which this card starts shrinking. */
  rangeStart: number;
  targetScale: number;
};

/*
 * Sticky positioning does the stacking. The shrink and image zoom use CSS
 * scroll-driven animations (see .stack-card in globals.css), so no JavaScript
 * runs on scroll; browsers without support simply skip those effects.
 */
export function Card({
  i,
  label,
  text,
  image,
  imageAlt,
  color,
  tone = "light",
  href,
  linkLabel,
  rangeStart,
  targetScale,
}: CardProps) {
  const dark = tone === "dark";

  return (
    <div className="sticky top-0 flex h-screen items-start justify-center px-4 pt-[84px] sm:px-6 md:items-center md:pt-0">
      <article
        style={
          {
            backgroundColor: color,
            "--stack-offset": `${i * 28}px`,
            "--stack-target": targetScale,
            animationRange: `contain ${Math.round(rangeStart * 100)}% contain 100%`,
          } as CSSProperties
        }
        className={cn(
          "stack-card relative top-[var(--stack-offset)] flex w-full max-w-5xl origin-top flex-col overflow-hidden rounded-3xl border p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] sm:p-8 md:top-[calc(-5vh+var(--stack-offset))] md:h-[460px] md:flex-row md:gap-10 lg:p-10",
          dark ? "border-white/10" : "border-black/[0.06]",
        )}
      >
        <div className="flex flex-col md:w-[45%]">
          <p
            className={cn(
              "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
              dark ? "text-[#ff6b6b]" : "text-[var(--brand)]",
            )}
          >
            <span aria-hidden className="h-px w-8 bg-current opacity-60" />
            {label}
          </p>
          <h3
            className={cn(
              "mt-4 text-pretty text-lg font-medium leading-relaxed sm:mt-5 sm:text-2xl md:text-[26px] md:leading-[1.45]",
              dark ? "text-white" : "text-[#1a1a1a]",
            )}
          >
            {text}
          </h3>
          {href && linkLabel && (
            <Link
              href={href}
              className={cn(
                "group mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold md:mt-auto",
                dark ? "text-white hover:text-[#ff6b6b]" : "text-[#1a1a1a] hover:text-[var(--brand)]",
              )}
            >
              {linkLabel}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        <div className="relative mt-6 h-40 overflow-hidden rounded-2xl sm:h-64 md:mt-0 md:h-full md:flex-1">
          <div className="stack-image absolute inset-0">
            <Image
              src={image}
              alt={imageAlt}
              fill
              placeholder="blur"
              sizes="(max-width: 768px) calc(100vw - 48px), 540px"
              className="object-cover"
            />
          </div>
        </div>
      </article>
    </div>
  );
}

export function StackingCards({ items, className }: { items: StackingCardItem[]; className?: string }) {
  return (
    <div className={cn("stack-cards relative", className)}>
      {items.map((item, i) => (
        <Card
          key={item.label}
          i={i}
          {...item}
          rangeStart={i / items.length}
          targetScale={1 - (items.length - i) * 0.05}
        />
      ))}
    </div>
  );
}
