import Link from "next/link";

export default function DraftModeBanner() {
  return (
    <div className="relative z-[70] flex items-center justify-center gap-3 bg-[#1a1a1a] px-4 py-2 text-xs text-white">
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
        Previewing draft content
      </span>
      <Link
        href="/api/draft-mode/disable"
        prefetch={false}
        className="rounded-full bg-white/10 px-3 py-1 font-medium transition hover:bg-white/20"
      >
        Exit preview
      </Link>
    </div>
  );
}
