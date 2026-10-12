import type { ReactNode } from "react";
import SanityImage from "@/components/blog/SanityImage";
import { formatDate, readingTime } from "@/lib/format";
import { urlFor } from "@/sanity/lib/image";
import type { PostCard } from "@/sanity/lib/types";

export default function PostMeta({
  post,
  tone = "dark",
  compact = false,
  action,
}: {
  post: PostCard;
  tone?: "dark" | "light";
  /** Puts the author on its own line and shrinks the text on phones, for card grids. */
  compact?: boolean;
  /** Shown at the end of the date row in compact mode, e.g. a share button. */
  action?: ReactNode;
}) {
  const muted = tone === "light" ? "text-white/75" : "text-[#666]";
  const strong = tone === "light" ? "text-white" : "text-[#1a1a1a]";
  const avatar = compact ? "size-5 sm:size-7" : "size-7";

  const author = post.author && (
    <span className={`flex min-w-0 items-center ${compact ? "gap-1.5 sm:gap-2" : "gap-2"}`}>
      {post.author.image ? (
        <SanityImage
          src={urlFor(post.author.image).width(64).height(64).url()}
          alt={post.author.name}
          width={28}
          height={28}
          className={`${avatar} shrink-0 rounded-full object-cover`}
        />
      ) : (
        <span
          className={`${avatar} flex shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[10px] font-semibold text-white sm:text-xs`}
        >
          {post.author.name.charAt(0)}
        </span>
      )}
      <span className={`truncate font-medium ${strong}`}>{post.author.name}</span>
    </span>
  );

  const dateAndLength = (
    <>
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden className={compact ? "max-sm:hidden" : ""}>
        ·
      </span>
      <span>{readingTime(post.estimatedReadingTime)}</span>
    </>
  );

  if (compact) {
    return (
      <div className={`min-w-0 text-[11px] sm:text-sm ${muted}`}>
        {author}
        <div className={`flex items-end justify-between gap-2 ${author ? "mt-2" : ""}`}>
          <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">{dateAndLength}</div>
          {action}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-sm ${muted}`}>
      {author}
      {author && <span aria-hidden>·</span>}
      {dateAndLength}
    </div>
  );
}
