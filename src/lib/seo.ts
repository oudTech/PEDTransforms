import type { Metadata } from "next";
import { company, contact, socialProfiles } from "@/data/site";
import { siteUrl } from "@/sanity/env";

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /**
   * Share image. Omit to use the site-wide image, or pass `false` when the
   * route has its own opengraph-image file.
   */
  image?: { url: string; width: number; height: number; alt?: string } | false;
  type?: "website" | "article";
  /** Use the title as-is instead of applying the "%s | PEDTransforms" template. */
  absoluteTitle?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  absoluteTitle = false,
  article,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${company.name}`;
  const shareImage =
    image === false
      ? undefined
      : (image ?? {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${company.name}: digital transformation, automation and advisory`,
        });
  const shared = {
    siteName: company.name,
    locale: "en_GB",
    url: path,
    title: fullTitle,
    description,
    ...(shareImage ? { images: [shareImage] } : {}),
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph:
      type === "article" ? { ...shared, type: "article", ...article } : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(shareImage ? { images: [shareImage.url] } : {}),
    },
  };
}

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

export function organizationJsonLd() {
  const contactPoint =
    contact.email || contact.phone
      ? [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            ...(contact.email ? { email: contact.email } : {}),
            ...(contact.phone ? { telephone: contact.phone } : {}),
          },
        ]
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    logo: absoluteUrl("/logo-light.png"),
    description: company.description,
    slogan: company.tagline,
    ...(contact.address ? { address: contact.address } : {}),
    ...(contactPoint ? { contactPoint } : {}),
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: company.name,
    url: siteUrl,
    publisher: { "@id": organizationId },
    inLanguage: "en-GB",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
