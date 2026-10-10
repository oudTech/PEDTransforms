"use client";

import { House, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Error1 } from "@/components/ui/error1";
import { popularPages } from "@/data/site";

export default function SiteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <title>Something went wrong | PEDTransforms</title>
      <meta name="robots" content="noindex" />
      <Error1
        code="500"
        heading="Something went wrong"
        description="An unexpected error stopped this page from loading. Please try again. If it keeps happening, let us know and we will look into it."
        buttons={[
          { label: "Try again", onClick: retry, icon: RotateCcw },
          { label: "Back to home", href: "/", variant: "outline", icon: House },
        ]}
        details={error.digest ? <>Reference: <code>{error.digest}</code></> : undefined}
        linksLabel="Popular pages"
        links={popularPages}
      />
    </>
  );
}
