import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  numSquares?: number;
  className?: string;
  /** Colour of the grid lines. Squares use the text colour. */
  lineColor?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  /** Area the squares are scattered over, in grid cells. */
  columns?: number;
  rows?: number;
}

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 91.73 + salt * 37.11) * 10000;
  return value - Math.floor(value);
}

const round = (value: number) => Number(value.toFixed(2));

/**
 * Grid with squares that fade in and out. Rendered on the server and animated
 * with CSS opacity only, so it costs no JavaScript and stays on the compositor.
 */
export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  numSquares = 50,
  className,
  lineColor = "rgba(156,163,175,0.3)",
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  columns = 40,
  rows = 20,
}: AnimatedGridPatternProps) {
  const cycle = duration * 2 + repeatDelay;
  const squares = Array.from({ length: numSquares }, (_, index) => ({
    left: Math.floor(seeded(index, 1) * columns) * width + x + 1,
    top: Math.floor(seeded(index, 2) * rows) * height + y + 1,
    duration: round(cycle * (0.8 + seeded(index, 3) * 0.7)),
    // Negative delays start each square part-way through its cycle.
    delay: round(-seeded(index, 4) * cycle * 1.5),
  }));

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={
        {
          "--grid-max-opacity": maxOpacity,
          backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: `${width}px ${height}px`,
          backgroundPosition: `${x}px ${y}px`,
        } as CSSProperties
      }
    >
      {squares.map((square, index) => (
        <span
          key={index}
          className="grid-square absolute bg-current"
          style={{
            left: square.left,
            top: square.top,
            width: width - 1,
            height: height - 1,
            animationDuration: `${square.duration}s`,
            animationDelay: `${square.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default AnimatedGridPattern;
