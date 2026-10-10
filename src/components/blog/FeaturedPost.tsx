import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { blurProps, urlFor } from "@/sanity/lib/image";
import type { PostCard } from "@/sanity/lib/types";
import PostMeta from "./PostMeta";
import ShareButton from "./ShareButton";

export default function FeaturedPost({ post }: { post: PostCard }) {
  const href = `/blog/${stegaClean(post.slug)}`;

  return (
    <article className="group relative grid overflow-hidden rounded-3xl bg-[#111] shadow-xl lg:grid-cols-[1.25fr_1fr]">
      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[440px]">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(1400).height(900).url()}
            alt={post.mainImage.alt || post.title}
            fill
            fetchPriority="high"
            loading="eager"
            {...blurProps(post.mainImage)}
            sizes="(max-width: 1024px) 100vw, 720px"
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand)] to-[#3a0000]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111]" />
      </div>

      <div className="relative flex flex-col justify-center p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Featured
          </span>
          {post.categories?.slice(0, 2).map((category) => (
            <span
              key={category._id}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/80"
            >
              {category.title}
            </span>
          ))}
        </div>
        <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-[34px]">
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="mt-4 line-clamp-4 text-[15px] leading-relaxed text-white/70">
            {post.excerpt}
          </p>
        )}
        <div className="mt-7">
          <PostMeta post={post} tone="light" />
        </div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            Read article
            <span className="transition group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </span>
          <ShareButton path={href} title={post.title} tone="light" />
        </div>
      </div>
    </article>
  );
}
