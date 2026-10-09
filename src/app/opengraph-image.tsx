import { company } from "@/data/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${company.name}: digital transformation, automation and advisory`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Technology & business transformation",
    title: "Turn technology investment into business value",
    subtitle: "Digital transformation, automation and smart systems, technology talent and advisory.",
  });
}
