import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import SmartsuppChat from "@/components/SmartsuppChat";
import DraftModeBanner from "@/components/blog/DraftModeBanner";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to content
      </a>
      {isDraftMode && <DraftModeBanner />}
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      {isDraftMode ? <VisualEditing /> : <SmartsuppChat />}
    </>
  );
}
