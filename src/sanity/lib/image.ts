import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({
  projectId: isSanityConfigured ? projectId : "unconfigured",
  dataset,
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
