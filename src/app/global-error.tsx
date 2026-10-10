"use client";

import { Poppins } from "next/font/google";
import { House, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Error1 } from "@/components/ui/error1";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function GlobalError({
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
    <html lang="en-GB" className={`${poppins.variable} h-full antialiased`}>
      <body className={`${poppins.className} flex min-h-full flex-col`}>
        <title>Something went wrong | PEDTransforms</title>
        <meta name="robots" content="noindex" />
        <header className="border-b border-black/[0.06] bg-white">
          <div className="mx-auto flex h-[68px] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            {/* eslint-disable-next-line @next/next/no-img-element -- next/image may be what failed */}
            <img src="/logo-light.png" alt="PEDTransforms" width={738} height={216} className="h-10 w-auto sm:h-11" />
          </div>
        </header>
        <main className="flex flex-1 items-center">
          <Error1
            code="500"
            heading="Something went wrong"
            description="We hit an unexpected problem loading the site. Please try again in a moment."
            buttons={[
              { label: "Try again", onClick: retry, icon: RotateCcw },
              { label: "Back to home", href: "/", variant: "outline", icon: House },
            ]}
            details={error.digest ? <>Reference: <code>{error.digest}</code></> : undefined}
          />
        </main>
      </body>
    </html>
  );
}
