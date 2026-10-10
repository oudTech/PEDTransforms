import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { blurProps, urlFor } from "@/sanity/lib/image";
import type { PostCard as PostCardType } from "@/sanity/lib/types";
import PostMeta from "./PostMeta";
import ShareButton from "./ShareButton";

export default function PostCard({ post }: { post: PostCardType }) {
  const href = `/blog/${stegaClean(post.slug)}`;
  const category = post.categories?.[0];

  return (
    <article data-reveal className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)] sm:rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#fff1f1] to-[#f4f4f5] sm:aspect-[16/10]">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(800).height(500).url()}
            alt={post.mainImage.alt || post.title}
            fill
            {...blurProps(post.mainImage)}
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 400px"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-[var(--brand)]/20">
            PT
          </div>
        )}
        {category && (
          <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[var(--brand)] backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
            {category.title}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-6">
        <h3 className="line-clamp-3 text-sm font-semibold leading-snug tracking-tight text-[#1a1a1a] transition group-hover:text-[var(--brand)] sm:line-clamp-none sm:text-lg">
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#555] max-sm:hidden">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-3 sm:gap-3 sm:pt-5">
          <PostMeta post={post} compact />
          <ShareButton path={href} title={post.title} className="shrink-0" />
        </div>
      </div>
    </article>
  );
}
