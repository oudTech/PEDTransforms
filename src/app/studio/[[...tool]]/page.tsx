import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";
import SanitySetupNotice from "@/components/blog/SanitySetupNotice";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4">
        <SanitySetupNotice />
      </div>
    );
  }

  return <NextStudio config={config} />;
}
