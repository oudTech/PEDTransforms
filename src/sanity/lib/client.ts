import { createClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  isSanityConfigured,
  projectId,
  studioUrl,
} from "@/sanity/env";

export const client = createClient({
  // createClient rejects an empty projectId, so fall back to a dummy value
  // until NEXT_PUBLIC_SANITY_PROJECT_ID is set. Fetches are skipped in that case.
  projectId: isSanityConfigured ? projectId : "unconfigured",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { studioUrl },
});
