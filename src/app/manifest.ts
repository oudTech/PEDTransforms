import type { MetadataRoute } from "next";
import { company } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.name,
    description: company.shortDescription,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#bd0000",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
