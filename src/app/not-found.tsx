import type { Metadata } from "next";
import { House, MessageSquare } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Error1 } from "@/components/ui/error1";
import { serviceMenu } from "@/data/services";
import { popularPages } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header menu={serviceMenu} />
      <main id="main" className="flex-1">
        <Error1
          code="404"
          heading="We could not find that page"
          description="The page you are looking for may have moved, been renamed or never existed. Check the address, or try one of the pages below."
          buttons={[
            { label: "Back to home", href: "/", icon: House },
            { label: "Contact us", href: "/contact", variant: "outline", icon: MessageSquare },
          ]}
          linksLabel="Popular pages"
          links={popularPages}
        />
      </main>
      <Footer />
    </>
  );
}
