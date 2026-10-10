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
    alt: "Two technology professionals working together at a computer",
  },
  about: {
    src: about,
    alt: "PEDTransforms consultants reviewing a solution with a client team",
  },
  vision: {
    src: vision,
    alt: "City lights across the Earth at night, seen from orbit",
  },
  mission: {
    src: mission,
    alt: "Technology specialist with a tablet in a data centre",
  },
} satisfies Record<string, SiteImage>;

const serviceImages: Record<string, SiteImage> = {
  "technology-digital-solutions": {
    src: technologyDigital,
    alt: "Illuminated circuit board display representing enterprise technology",
  },
  "technology-talent-managed-services": {
    src: talentManaged,
    alt: "Technology specialists monitoring systems in an operations room",
  },
  "forecourt-fuel-automation": {
    src: forecourtFuel,
    alt: "Fuel dispenser nozzles at a station forecourt",
  },
  "smart-systems-integration": {
    src: smartSystems,
    alt: "Robotic arms working on an automated production line",
  },
  "business-technology-advisory": {
    src: businessAdvisory,
    alt: "Analytics dashboard showing business performance data",
  },
  "project-implementation-advisory": {
    src: projectAdvisory,
    alt: "Project team in a briefing reviewing an implementation plan",
  },
};

export function serviceImage(slug: string): SiteImage {
  return serviceImages[slug] ?? images.about;
}
