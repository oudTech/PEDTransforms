import type { MetadataRoute } from "next";
import { legalLinks } from "@/data/legal";
import { subServices } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { sitemapPostsQuery } from "@/sanity/lib/queries";
import { revalidateSecret } from "@/sanity/lib/token";

type SitemapPost = { slug: string; _updatedAt: string };

async function getPosts(): Promise<SitemapPost[]> {
  if (!isSanityConfigured) return [];
  try {
    return await client.fetch<SitemapPost[]>(
      sitemapPostsQuery,
      {},
      { stega: false, next: { revalidate: revalidateSecret ? false : 3600, tags: ["post"] } },
    );
  } catch (error) {
    console.error("[sitemap] Could not load posts from Sanity:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const latestPost = posts[0]?._updatedAt ? new Date(posts[0]._updatedAt) : undefined;

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    ...subServices.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.6 },
    {
      url: absoluteUrl("/blog"),
      changeFrequency: "weekly",
      priority: 0.7,
      ...(latestPost ? { lastModified: latestPost } : {}),
    },
    ...legalLinks.map((link) => ({
      url: absoluteUrl(link.href),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  return [
    ...pages,
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
