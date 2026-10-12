import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { preconnect } from "react-dom";
import JsonLd from "@/components/JsonLd";
import BlogEmptyState, { emptyPrimaryAction, emptySecondaryAction } from "@/components/blog/BlogEmptyState";
import BlogExplorer from "@/components/blog/BlogExplorer";
import FeaturedPost from "@/components/blog/FeaturedPost";
import SanitySetupNotice from "@/components/blog/SanitySetupNotice";
import { CallToAction, PageHero } from "@/components/sections";
import { company } from "@/data/site";
import { absoluteUrl, organizationId, pageMetadata, websiteId } from "@/lib/seo";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { categoriesQuery, postsQuery } from "@/sanity/lib/queries";
import type { Category, PostCard } from "@/sanity/lib/types";

const description = `Practical insights on digital transformation, automation, smart systems, technology talent and advisory from the ${company.name} team.`;

export const metadata: Metadata = pageMetadata({
  title: "Blog: Technology and Transformation Insights",
  description,
  path: "/blog",
});

export default async function BlogPage() {
  preconnect("https://cdn.sanity.io");
  const [posts, categories] = await Promise.all([
    sanityFetch<PostCard[]>({
      query: postsQuery,
      tags: ["post", "author", "category"],
      required: true,
    }),
    sanityFetch<Category[]>({ query: categoriesQuery, tags: ["category", "post"] }),
  ]);

  const allPosts = posts ?? [];
  const [featured, ...rest] = allPosts;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${absoluteUrl("/blog")}#blog`,
          name: `${company.name} Blog`,
          url: absoluteUrl("/blog"),
          description,
          inLanguage: "en-GB",
          isPartOf: { "@id": websiteId },
          publisher: { "@id": organizationId },
          blogPost: allPosts.slice(0, 20).map((post) => ({
            "@type": "BlogPosting",
            headline: stegaClean(post.title),
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: post.publishedAt,
          })),
        }}
      />

      <PageHero
        breadcrumbs={[{ name: "Blog", path: "/blog" }]}
        eyebrow="Insights"
        title={
          <>
            Insights to <span className="text-[#ff4d4d]">transform</span> your business
          </>
        }
        intro="Practical thinking on digital transformation, automation, smart systems, technology talent and advisory, written to help you make better technology decisions."
      />

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!isSanityConfigured ? (
            <div className="flex justify-center">
              <SanitySetupNotice />
            </div>
          ) : allPosts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <FeaturedPost post={featured} />
              {rest.length > 0 && (
                <div className="mt-16">
                  <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[#1a1a1a]">
                    Latest articles
                  </h2>
                  <BlogExplorer posts={rest} categories={categories ?? []} />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CallToAction
        title="Have a challenge you want to discuss?"
        body="Talk to us about the technology, automation, talent or advisory support your organisation needs."
      />
    </>
  );
}

function EmptyState() {
  return (
    <BlogEmptyState
      icon={PenLine}
      eyebrow="Fresh ink, coming soon"
      title="The first chapter is being written"
      description="Our team is turning real client challenges into practical insights on transformation, automation and technology talent. Pull up a chair: the first articles land here soon."
      actions={
        <>
          <Link href="/services" className={emptyPrimaryAction}>
            Explore our services
          </Link>
          <Link href="/contact" className={emptySecondaryAction}>
            Talk to us today
          </Link>
        </>
      }
    />
  );
}