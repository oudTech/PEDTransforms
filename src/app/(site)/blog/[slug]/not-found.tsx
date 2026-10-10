import { House, Newspaper } from "lucide-react";
import { Error1 } from "@/components/ui/error1";
import { popularPages } from "@/data/site";

export default function PostNotFound() {
  return (
    <Error1
      code="404"
      heading="Article not found"
      description="This article may have been moved or unpublished. You can browse our latest insights on the blog."
      buttons={[
        { label: "Back to the blog", href: "/blog", icon: Newspaper },
        { label: "Go home", href: "/", variant: "outline", icon: House },
      ]}
      linksLabel="Popular pages"
      links={popularPages.filter((link) => link.href !== "/blog")}
    />
  );
}
