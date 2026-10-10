import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type FeatureTask = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

function TaskList({ tasks, hidden }: { tasks: FeatureTask[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {tasks.map(({ title, subtitle, icon: Icon }) => (
        <li key={title} className="flex items-center gap-3 border-b border-black/[0.06] px-5 py-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white text-[var(--brand)] shadow-sm">
            <Icon aria-hidden className="size-[18px]" strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium leading-snug text-[#1a1a1a]">{title}</span>
            <span className="block truncate text-xs text-[#777]">{subtitle}</span>
          </span>
          <Check aria-hidden className="size-4 shrink-0 text-[var(--brand)]/70" />
        </li>
      ))}
    </ul>
  );
}

export default function FeatureSection({
  id,
  eyebrow,
  title,
  intro,
  tasks,
  tags = [],
  listLabel,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tasks: FeatureTask[];
  tags?: string[];
  listLabel?: string;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn("relative w-full overflow-x-clip bg-white py-20 lg:py-28", className)}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:gap-20 lg:px-8">
        <div data-reveal className="relative isolate mx-auto w-full max-w-md md:mx-0">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(189,0,0,0.08),transparent_70%)]"
          />
          <Card className="overflow-hidden rounded-2xl border-black/[0.06] bg-[#fafafa] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
            <CardContent className="relative h-[360px] p-0">
              <div
                role="region"
                aria-label={listLabel}
                tabIndex={0}
                className="relative h-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand)] motion-reduce:overflow-y-auto"
              >
                <div
                  className="animate-marquee-y"
                  style={{ "--marquee-duration": `${tasks.length * 3.5}s` } as CSSProperties}
                >
                  <TaskList tasks={tasks} />
                  <div className="motion-reduce:hidden">
                    <TaskList tasks={tasks} hidden />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#fafafa] via-[#fafafa]/70 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/70 to-transparent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div data-reveal className="space-y-6 max-md:order-first">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand)]">{eyebrow}</p>
          )}
          <h2
            id={id}
            className="text-balance text-2xl font-semibold leading-snug tracking-tight text-[#1a1a1a] sm:text-[28px] lg:text-[30px] lg:leading-[1.35]"
          >
            {title}{" "}
            {intro && <span className="font-normal text-[#7a7a7a]">{intro}</span>}
          </h2>
          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <li key={tag}>
                  <Badge
                    variant="outline"
                    className="gap-2 border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#333]"
                  >
                    <span aria-hidden className="size-1.5 rounded-full bg-[var(--brand)]" />
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
