import { getCategory, getSubService, subServices } from "@/data/services";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "PEDTransforms service overview";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return subServices.map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getSubService(slug);
  if (!service) return new Response("Not found", { status: 404 });

  return renderOgImage({
    eyebrow: getCategory(service.category).title,
    title: service.title,
    subtitle: service.summary,
  });
}
