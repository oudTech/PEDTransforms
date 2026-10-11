import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionButton = {
  label: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  icon?: LucideIcon;
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

interface QuickLink {
  label: string;
  href: string;
}

export interface Error1Props {
  code?: string;
  heading?: string;
  description?: string;
  buttons?: ActionButton[];
  linksLabel?: string;
  links?: QuickLink[];
  /** Extra detail under the buttons, such as an error reference. */
  details?: ReactNode;
  className?: string;
}

export function Error1({
  code,
  heading,
  description,
  buttons = [],
  linksLabel,
  links = [],
  details,
  className,
}: Error1Props) {
  return (
    <section className={cn("relative isolate w-full overflow-hidden py-20 md:py-28", className)}>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_35%,#000_40%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-10 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(189,0,0,0.10),transparent)]"
      />

      <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
        {code && (
          <p className="animate-in fade-in slide-in-from-bottom-2 bg-gradient-to-b from-[#1a1a1a] to-[#1a1a1a]/25 bg-clip-text text-8xl font-bold leading-none tracking-tight text-transparent duration-700 motion-reduce:animate-none md:text-9xl">
            {code}
          </p>
        )}

        {heading && (
          <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
            {heading}
          </h1>
        )}

        {description && (
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#1f1f1f] md:text-lg">
            {description}
          </p>
        )}

        {buttons.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {buttons.map(({ label, variant = "default", icon: Icon, ...action }) => {
              const content = (
                <>
                  {Icon && <Icon aria-hidden className="size-4" />}
                  {label}
                </>
              );
              const classes = cn(
                "gap-2 rounded-full px-7 font-semibold",
                variant === "outline" &&
                  "border-black/15 text-[#1a1a1a] hover:border-[var(--brand)] hover:bg-white hover:text-[var(--brand)]",
              );
              return action.href ? (
                <Button key={label} variant={variant} size="lg" className={classes} asChild>
                  <Link href={action.href}>{content}</Link>
                </Button>
              ) : (
                <Button key={label} variant={variant} size="lg" className={classes} onClick={action.onClick}>
                  {content}
                </Button>
              );
            })}
          </div>
        )}

        {details && <div className="mt-5 text-xs text-[#888]">{details}</div>}

        {links.length > 0 && (
          <nav aria-label={linksLabel} className="mt-14 border-t border-black/[0.07] pt-8">
            {linksLabel && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#888]">{linksLabel}</p>
            )}
            <ul className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group/error1 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#1a1a1a] transition-colors hover:text-[var(--brand)]"
                  >
                    {link.label}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform group-hover/error1:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}

export default Error1;
