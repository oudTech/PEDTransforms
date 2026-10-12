"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";

/**
 * Sanity's CDN resizes and converts images itself (`auto=format` serves AVIF/WebP),
 * so requests go straight to it instead of through the Next.js optimiser.
 * Width and height are scaled together so `fit=max` keeps the requested bounds.
 */
const sanityLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  const baseWidth = Number(url.searchParams.get("w"));
  const baseHeight = Number(url.searchParams.get("h"));
  url.searchParams.set("w", String(width));
  if (baseWidth && baseHeight) {
    url.searchParams.set("h", String(Math.round((width * baseHeight) / baseWidth)));
  }
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
};

export default function SanityImage({ alt, ...props }: Omit<ImageProps, "loader">) {
  return <Image alt={alt} {...props} loader={sanityLoader} />;
}
