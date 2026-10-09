import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { company } from "@/data/site";
import { serverEnv } from "@/lib/env.server";
import { siteUrl } from "@/sanity/env";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const verification: Metadata["verification"] = {
  ...(serverEnv.googleSiteVerification ? { google: serverEnv.googleSiteVerification } : {}),
  ...(serverEnv.bingSiteVerification
    ? { other: { "msvalidate.01": serverEnv.bingSiteVerification } }
    : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Digital Transformation, Automation & Advisory`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  creator: company.name,
  publisher: company.name,
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  ...(Object.keys(verification).length ? { verification } : {}),
};

export const viewport: Viewport = {
  themeColor: "#bd0000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${poppins.variable} h-full antialiased`}>
      <body className={`${poppins.className} flex min-h-full flex-col`}>
        {children}
      </body>
    </html>
  );
}
