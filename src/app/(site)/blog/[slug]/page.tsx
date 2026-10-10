import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PortableTextBody, { getHeadings } from "@/components/blog/PortableTextBody";
import PostCard from "@/components/blog/PostCard";
import PostMeta from "@/components/blog/PostMeta";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ShareButtons from "@/components/blog/ShareButtons";
import TableOfContents from "@/components/blog/TableOfContents";
import { absoluteUrl, organizationId, pageMetadata } from "@/lib/seo";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { blurProps, urlFor } from "@/sanity/lib/image";
import { postQuery, postSlugsQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/types";

export async function generateStaticParams() {
  if (!isSanityConfigured) return [];
  const slugs = await client.fetch<string[]>(
    postSlugsQuery,
    {},
    { perspective: "published", stega: false },
  );
  return slugs.map((slug) => ({ slug }));
}

async function getPost(slug: string) {
  return sanityFetch<Post>({
    query: postQuery,
    params: { slug },
    tags: ["post", `post:${slug}`, "author", "category"],
  });
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };

  const title = stegaClean(post.seoTitle || post.title);
  const description = stegaClean(post.seoDescription || post.excerpt || "");

  return pageMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
    type: "article",
    image: post.mainImage
      ? {
          url: urlFor(post.mainImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: stegaClean(post.mainImage.alt) || title,
        }
      : undefined,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [stegaClean(post.author.name)] : undefined,
      tags: post.categories?.map((category) => stegaClean(category.title)),
    },
  });
}

function postJsonLd(post: Post, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: stegaClean(post.seoTitle || post.title),
    description: stegaClean(post.seoDescription || post.excerpt),
    ...(post.mainImage
      ? { image: [urlFor(post.mainImage).width(1200).height(630).url()] }
      : {}),
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    inLanguage: "en-GB",
    ...(post.categories?.length
      ? {
          articleSection: stegaClean(post.categories[0].title),
          keywords: post.categories.map((category) => stegaClean(category.title)).join(", "),
        }
      : {}),
    ...(post.estimatedReadingTime
      ? { timeRequired: `PT${Math.max(1, post.estimatedReadingTime)}M` }
      : {}),
    author: post.author
      ? {
          "@type": "Person",
          name: stegaClean(post.author.name),
          ...(post.author.role ? { jobTitle: stegaClean(post.author.role) } : {}),
        }
      : { "@id": organizationId },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const headings = getHeadings(post.body);
  const url = absoluteUrl(`/blog/${post.slug}`);

  return (
    <>
      <JsonLd data={postJsonLd(post, url)} />
      <ReadingProgress />

      <article>
        <header className="relative overflow-hidden bg-gradient-to-b from-[#fff5f5] via-white to-white">
          <div className="mx-auto max-w-4xl px-4 pb-10 pt-12 text-center sm:px-6 lg:pt-16">
            <div className="mb-8 flex justify-center">
              <Breadcrumbs
                items={[
                  { name: "Blog", path: "/blog" },
                  { name: stegaClean(post.title), path: `/blog/${post.slug}` },
                ]}
              />
            </div>

            {post.categories && post.categories.length > 0 && (
              <div className="mb-5 flex flex-wrap justify-center gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="rounded-full bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--brand)]"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-[#555]">
                {post.excerpt}
              </p>
            )}
            <div className="mt-8 flex justify-center">
              <PostMeta post={post} />
            </div>
          </div>

          {post.mainImage && (
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="relative aspect-[16/8] overflow-hidden rounded-3xl shadow-2xl shadow-black/10">
                <Image
                  src={urlFor(post.mainImage).width(2000).height(1000).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  fetchPriority="high"
                  loading="eager"
                  {...blurProps(post.mainImage)}
                  sizes="(max-width: 1280px) 100vw, 1152px"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </header>

        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:px-8 lg:py-20">
          <div className="mx-auto w-full max-w-[720px]">
            {post.body ? (
              <PortableTextBody value={post.body} />
            ) : (
              <p className="text-[#666]">This article has no content yet.</p>
            )}

            <div className="mt-14 flex flex-col gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-[#1a1a1a]">Share this article</p>
              <ShareButtons url={url} title={post.title} />
            </div>

            {post.author && (
              <div className="mt-10 flex gap-5 rounded-2xl bg-[#fafafa] p-6">
                {post.author.image ? (
                  <Image
                    src={urlFor(post.author.image).width(160).height(160).url()}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-xl font-semibold text-white">
                    {post.author.name.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#999]">
                    Written by
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[#1a1a1a]">
                    {post.author.name}
                  </p>
                  {post.author.role && (
                    <p className="text-sm text-[var(--brand)]">{post.author.role}</p>
                  )}
                  {post.author.bio && (
                    <p className="mt-2 text-sm leading-relaxed text-[#555]">
                      {post.author.bio}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-10">
              <TableOfContents headings={headings} />
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#999]">
                  Share
                </p>
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>
          </aside>
        </div>
      </article>

      {post.related && post.related.length > 0 && (
        <section className="border-t border-black/5 bg-[#fafafa] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-[#1a1a1a] sm:text-3xl">
                Related articles
              </h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-[var(--brand)] hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {post.related.map((related) => (
                <PostCard key={related._id} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
