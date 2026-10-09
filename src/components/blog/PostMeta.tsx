import Image from "next/image";
import { formatDate, readingTime } from "@/lib/format";
import { urlFor } from "@/sanity/lib/image";
import type { PostCard } from "@/sanity/lib/types";

export default function PostMeta({
  post,
  tone = "dark",
}: {
  post: PostCard;
  tone?: "dark" | "light";
}) {
  const muted = tone === "light" ? "text-white/75" : "text-[#666]";
  const strong = tone === "light" ? "text-white" : "text-[#1a1a1a]";

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-sm ${muted}`}>
      {post.author && (
        <span className="flex items-center gap-2">
          {post.author.image ? (
            <Image
              src={urlFor(post.author.image).width(64).height(64).url()}
              alt={post.author.name}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand)] text-xs font-semibold text-white">
              {post.author.name.charAt(0)}
            </span>
          )}
          <span className={`font-medium ${strong}`}>{post.author.name}</span>
        </span>
      )}
      {post.author && <span aria-hidden>·</span>}
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span>{readingTime(post.estimatedReadingTime)}</span>
    </div>
  );
}
