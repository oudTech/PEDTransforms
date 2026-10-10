import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ShootingStarsGridSpeed = "slow" | "normal" | "fast" | number;

/**
 * Colours are CSS variables so the background can be themed from outside:
 * --ssg-bg, --ssg-grid, --ssg-vignette-mid, --ssg-vignette-edge, --ssg-glow-a,
 * --ssg-glow-b, --ssg-star, --ssg-star-glow, --ssg-runner-tail,
 * --ssg-runner-core, --ssg-runner-head, --ssg-runner-shadow.
 */
const DEFAULT_PALETTE = {
  "--ssg-bg": "linear-gradient(180deg,#f8fbff 0%,#eaf4ff 52%,#f8fbff 100%)",
  "--ssg-grid": "rgba(14,165,233,0.13)",
  "--ssg-vignette-mid": "rgba(255,255,255,0.3)",
  "--ssg-vignette-edge": "rgba(255,255,255,0.92)",
  "--ssg-glow-a": "rgba(8,145,178,0.28)",
  "--ssg-glow-b": "rgba(99,102,241,0.18)",
  "--ssg-star": "#0e7490",
  "--ssg-star-glow": "rgba(14,165,233,0.5)",
  "--ssg-runner-tail": "rgba(8,145,178,0.14)",
  "--ssg-runner-core": "rgba(103,232,249,0.92)",
  "--ssg-runner-head": "rgba(255,255,255,0.96)",
  "--ssg-runner-shadow": "rgba(6,182,212,0.46)",
} as const;

export type ShootingStarsGridPalette = Partial<Record<keyof typeof DEFAULT_PALETTE, string>>;

export type ShootingStarsGridProps = {
  children: ReactNode;
  starCount?: number;
  shootingStarCount?: number;
  gridSize?: number;
  speed?: ShootingStarsGridSpeed;
  glow?: boolean;
  className?: string;
  contentClassName?: string;
  showGrid?: boolean;
  showStaticStars?: boolean;
  palette?: ShootingStarsGridPalette;
};

const SPEED_SCALE: Record<Exclude<ShootingStarsGridSpeed, number>, number> = {
  slow: 1.25,
  normal: 1,
  fast: 0.72,
};

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 91.73 + salt * 37.11) * 10000;
  return value - Math.floor(value);
}

const round = (value: number, places = 2) => Number(value.toFixed(places));

function createStaticStars(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    x: round(seeded(index, 1) * 100),
    y: round(seeded(index, 2) * 100),
    size: round(1 + seeded(index, 3) * 2.4),
    opacity: round(0.16 + seeded(index, 4) * 0.44, 3),
    delay: round(-seeded(index, 5) * 4),
    duration: round(2.4 + seeded(index, 6) * 3.2),
  }));
}

function createShootingStars(count: number, speedScale: number) {
  const horizontalLines = [3, 5, 7, 9, 11, 13, 16, 19];
  const verticalLines = [2, 4, 6, 8, 11, 14, 17, 20, 23];

  return Array.from({ length: count }, (_, index) => {
    const horizontal = index % 3 !== 1;
    const lanes = horizontal ? horizontalLines : verticalLines;
    // Each run takes the first 30% of the cycle; the rest is the pause between runs.
    const run = (1.65 + seeded(index, 17) * 1.6) * speedScale;
    return {
      horizontal,
      forward: index % 2 === 0,
      line: lanes[index % lanes.length],
      length: round(86 + seeded(index, 15) * 132),
      duration: round(run / 0.3),
      delay: round(seeded(index, 16) * 7 + index * 0.65),
    };
  });
}

export function ShootingStarsGrid({
  children,
  starCount = 48,
  shootingStarCount = 6,
  gridSize = 44,
  speed = "normal",
  glow = true,
  className,
  contentClassName,
  showGrid = true,
  showStaticStars = true,
  palette,
}: ShootingStarsGridProps) {
  const speedScale = typeof speed === "number" ? Math.max(0.35, speed) : SPEED_SCALE[speed];
  const stars = createStaticStars(Math.max(0, Math.min(starCount, 90)));
  const runners = createShootingStars(Math.max(0, Math.min(shootingStarCount, 10)), speedScale);

  return (
    <section
      className={cn(
        "relative isolate min-h-[520px] w-full overflow-hidden rounded-[2rem] border border-zinc-200 text-zinc-950 shadow-2xl shadow-cyan-950/20",
        "[background:var(--ssg-bg)]",
        // Skips rendering, and so the animations, while the section is off screen.
        "[contain-intrinsic-size:auto_520px] [content-visibility:auto]",
        className,
      )}
      style={
        {
          ...DEFAULT_PALETTE,
          ...palette,
          "--shooting-stars-grid-size": `${gridSize}px`,
        } as CSSProperties
      }
    >
      {showGrid && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-30 opacity-60",
            "[background-image:linear-gradient(to_right,var(--ssg-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--ssg-grid)_1px,transparent_1px)]",
            "[background-size:var(--shooting-stars-grid-size)_var(--shooting-stars-grid-size)]",
          )}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,transparent_0%,var(--ssg-vignette-mid)_54%,var(--ssg-vignette-edge)_100%)]"
      />

      {glow && (
        <div
          aria-hidden="true"
          className="ssg-glow pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,var(--ssg-glow-a),transparent_34%),radial-gradient(circle_at_72%_72%,var(--ssg-glow-b),transparent_30%)]"
        />
      )}

      {showStaticStars && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {stars.map((star, index) => (
            <span
              key={index}
              className={cn(
                "ssg-star absolute rounded-full bg-[var(--ssg-star)] shadow-[0_0_12px_var(--ssg-star-glow)]",
                index > 34 && "max-sm:hidden",
              )}
              style={
                {
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                  "--star-opacity": star.opacity,
                  animationDuration: `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {runners.map((runner, index) => {
          const line = `calc(var(--shooting-stars-grid-size) * ${runner.line})`;
          const angle = runner.horizontal
            ? runner.forward ? "90deg" : "270deg"
            : runner.forward ? "180deg" : "0deg";
          return (
            <div
              key={index}
              className={cn(
                "absolute",
                runner.horizontal ? "inset-x-0 h-px [container-type:inline-size]" : "inset-y-0 w-px [container-type:size]",
                index > 4 && "max-sm:hidden",
              )}
              style={runner.horizontal ? { top: line } : { left: line }}
            >
              <span
                className={cn("absolute left-0 top-0 rounded-full", runner.horizontal ? "ssg-run-x" : "ssg-run-y")}
                style={{
                  width: runner.horizontal ? runner.length : 1,
                  height: runner.horizontal ? 1 : runner.length,
                  background: `linear-gradient(${angle}, transparent 0%, var(--ssg-runner-tail) 18%, var(--ssg-runner-core) 52%, var(--ssg-runner-head) 58%, transparent 100%)`,
                  boxShadow: "0 0 16px var(--ssg-runner-shadow), 0 0 28px rgba(148,163,184,0.18)",
                  animationDuration: `${runner.duration}s`,
                  animationDelay: `${runner.delay}s`,
                  animationDirection: runner.forward ? "normal" : "reverse",
                }}
              />
            </div>
          );
        })}
      </div>

      <div
        className={cn(
          "relative z-10 flex min-h-[inherit] w-full items-center justify-center px-6 py-16 sm:px-10",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export default ShootingStarsGrid;
