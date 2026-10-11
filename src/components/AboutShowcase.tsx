import { ArrowRight, Handshake, Workflow } from "lucide-react";
import Image from "next/image";
import type { SiteImage } from "@/data/images";

const card =
  "rounded-2xl border border-black/[0.04] bg-white shadow-[0_18px_45px_-18px_rgba(15,23,42,0.35)]";

function CapabilityRing({ count }: { count: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const gap = 7;
  const segment = circumference / count - gap;
  return (
    <div className="relative size-16 shrink-0">
      <svg viewBox="0 0 64 64" className="size-full -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r={radius} fill="none" stroke="#f1f1f1" strokeWidth="7" />
        {Array.from({ length: count }, (_, index) => (
          <circle
            key={index}
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${segment} ${circumference - segment}`}
            strokeDashoffset={-(index * (segment + gap)) - gap / 2}
          />
        ))}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#1a1a1a]">
        {count}
      </span>
    </div>
  );
}

export default function AboutShowcase({
  image,
  capabilities,
}: {
  image: SiteImage;
  capabilities: number;
}) {
  return (
    <div className="relative pb-24 pt-16 sm:pb-12 sm:pl-10 sm:pt-10 lg:pl-14">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#f3f3f3] shadow-xl shadow-black/10">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          placeholder="blur"
          sizes="(max-width: 1024px) calc(100vw - 32px), 600px"
          className="object-cover"
        />
      </div>

      <div
        data-reveal
        className={`${card} absolute left-0 top-0 w-[min(15.5rem,70%)] p-3.5 sm:w-64 sm:p-4`}
      >
        <p className="text-[13px] font-semibold leading-snug text-[#1a1a1a] sm:text-sm">
          Technology, talent and expertise in one partner
        </p>
        <div
          aria-hidden
          className="mt-3 flex items-center justify-between gap-2 rounded-full bg-[#f5f5f5] py-1 pl-3.5 pr-1"
        >
          <span className="truncate text-[11px] text-[#8a8a8a] sm:text-xs">Your next project</span>
          <span className="flex h-7 shrink-0 items-center gap-1 rounded-full bg-[var(--brand)] px-3 text-[11px] font-semibold text-white">
            Start
            <ArrowRight className="size-3" />
          </span>
        </div>
      </div>

      <div
        data-reveal
        className={`${card} absolute left-0 top-[46%] hidden w-56 p-4 sm:block`}
      >
        <div aria-hidden className="flex items-center gap-2.5">
          <span className="size-7 rounded-full bg-[#fff1f1]" />
          <span className="flex-1 space-y-1.5">
            <span className="block h-1.5 w-4/5 rounded-full bg-[#ececec]" />
            <span className="block h-1.5 w-1/2 rounded-full bg-[#f3f3f3]" />
          </span>
        </div>
        <div className="mt-3.5 flex items-center gap-3">
          <CapabilityRing count={capabilities} />
          <p className="text-sm font-semibold leading-snug text-[#1a1a1a]">
            Core capabilities
            <span className="mt-0.5 block text-xs font-normal text-[#777]">One accountable team</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 right-2 w-[min(16rem,78%)] space-y-2.5 sm:-right-3 sm:w-64 lg:-right-6">
        <div data-reveal className={`${card} flex items-center gap-3 p-3`}>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1f1] text-[var(--brand)]">
            <Handshake aria-hidden className="size-5" strokeWidth={1.8} />
          </span>
          <p className="min-w-0 text-[13px] font-semibold leading-snug text-[#1a1a1a]">
            One accountable partner
            <span className="block text-xs font-normal text-[#777]">From advice to managed services</span>
          </p>
        </div>
        <div data-reveal className={`${card} flex items-center gap-3 p-3`}>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f3f3] text-[#1f1f1f]">
            <Workflow aria-hidden className="size-5" strokeWidth={1.8} />
          </span>
          <p className="min-w-0 text-[13px] font-semibold leading-snug text-[#1a1a1a]">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#999]">
              End-to-end delivery
            </span>
            Advise, implement, manage
          </p>
        </div>
      </div>
    </div>
  );
}
