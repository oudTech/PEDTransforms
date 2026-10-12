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
  /**
   * Pages that 404 on a null result should pass `true`, so a network failure in
   * development shows the real error instead of a misleading "not found".
   */
  required?: boolean;
};

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  required = false,
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

  const isDev = process.env.NODE_ENV === "development";

  try {
    return await client.fetch<T>(query, params, {
      stega: false,
      // With a webhook secret, content is cached until Sanity tells us it changed.
      // Without one, fall back to refreshing every minute. Webhooks cannot reach
      // a local machine, so development always reads fresh content.
      next: {
        revalidate: isDev ? 0 : revalidateSecret ? false : 60,
        tags,
      },
    });
  } catch (error) {
    // In production the error must propagate so ISR keeps serving the last good
    // page instead of caching one without CMS content.
    if (!isDev || required) throw error;
    console.warn(
      `[sanity] Could not reach Sanity (${error instanceof Error ? error.message : error}); rendering without CMS content.`,
    );
    return null;
  }
}
