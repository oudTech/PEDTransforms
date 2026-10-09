import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import type { PostCard as PostCardType } from "@/sanity/lib/types";
import PostMeta from "./PostMeta";

export default function PostCard({ post }: { post: PostCardType }) {
  const href = `/blog/${stegaClean(post.slug)}`;
  const category = post.categories?.[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#fff1f1] to-[#f4f4f5]">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(800).height(500).url()}
            alt={post.mainImage.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-[var(--brand)]/20">
            PT
          </div>
        )}
        {category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--brand)] backdrop-blur">
            {category.title}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-[#1a1a1a] transition group-hover:text-[var(--brand)]">
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#555]">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto pt-5">
          <PostMeta post={post} />
        </div>
      </div>
    </article>
  );
}
