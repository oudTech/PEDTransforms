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

/** Blur-up placeholder props for next/image when Sanity provided an LQIP. */
export function blurProps(image?: { lqip?: string } | null) {
  return image?.lqip ? ({ placeholder: "blur", blurDataURL: image.lqip } as const) : {};
}
