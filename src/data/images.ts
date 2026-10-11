import "server-only";
import type { StaticImageData } from "next/image";
import about from "@/assets/images/about.jpg";
import hero from "@/assets/images/hero.jpg";
import mission from "@/assets/images/mission.jpg";
import businessAdvisory from "@/assets/images/service-business-advisory.jpg";
import forecourtFuel from "@/assets/images/service-forecourt-fuel.jpg";
import projectAdvisory from "@/assets/images/service-project-advisory.jpg";
import smartSystems from "@/assets/images/service-smart-systems.jpg";
import talentManaged from "@/assets/images/service-talent-managed.jpg";
import technologyDigital from "@/assets/images/service-technology-digital.jpg";
import vision from "@/assets/images/vision.jpg";

// Kept apart from the data files that client components import, so the
// image metadata and blur placeholders stay out of client bundles.

export type SiteImage = { src: StaticImageData; alt: string };

export const images = {
  hero: {
    src: hero,
    alt: "Business professionals in discussion around a conference room table",
  },
  about: {
    src: about,
    alt: "Black-and-white photo of a group of people raising their hands together",
  },
  vision: {
    src: vision,
    alt: "Modern glass office towers rising into a clear blue sky",
  },
  mission: {
    src: mission,
    alt: "Top-down view of a team meeting around a wooden table with a laptop and tablet",
  },
} satisfies Record<string, SiteImage>;

const serviceImages: Record<string, SiteImage> = {
  "technology-digital-solutions": {
    src: technologyDigital,
    alt: "Glowing teal LED circuit panel",
  },
  "technology-talent-managed-services": {
    src: talentManaged,
    alt: "Team seated around a long conference table in a bright office",
  },
  "forecourt-fuel-automation": {
    src: forecourtFuel,
    alt: "Brightly lit fuel station forecourt at night",
  },
  "smart-systems-integration": {
    src: smartSystems,
    alt: "Operator monitoring connected systems from an operations centre",
  },
  "business-technology-advisory": {
    src: businessAdvisory,
    alt: "Advisory session around a boardroom table",
  },
  "project-implementation-advisory": {
    src: projectAdvisory,
    alt: "Project team gathered around a laptop reviewing a plan together",
  },
};

export function serviceImage(slug: string): SiteImage {
  return serviceImages[slug] ?? images.about;
}
