import "server-only";

import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { readToken, revalidateSecret } from "@/sanity/lib/token";

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
};

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: FetchOptions): Promise<T | null> {
  if (!isSanityConfigured) return null;

  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    if (!readToken) {
      throw new Error(
        "SANITY_API_READ_TOKEN is required to preview drafts. Add it to .env.local.",
      );
    }
    return client.fetch<T>(query, params, {
      token: readToken,
      perspective: "drafts",
      useCdn: false,
      stega: true,
      cache: "no-store",
    });
  }

  return client.fetch<T>(query, params, {
    stega: false,
    // With a webhook secret, content is cached until Sanity tells us it changed.
    // Without one, fall back to refreshing every minute. Webhooks cannot reach
    // a local machine, so development always reads fresh content.
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 0 : revalidateSecret ? false : 60,
      tags,
    },
  });
}
