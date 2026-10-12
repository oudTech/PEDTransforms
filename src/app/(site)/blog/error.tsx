"use client";

import { CloudOff, Loader2, RotateCcw, WifiOff } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore, useTransition } from "react";
import BlogEmptyState, { emptyPrimaryAction, emptySecondaryAction } from "@/components/blog/BlogEmptyState";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

/**
 * Blog content comes from Sanity, so a dropped connection (the visitor's or ours)
 * lands here instead of the generic error page.
 */
export default function BlogError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  const isArticle = usePathname() !== "/blog";
  const [retrying, startRetry] = useTransition();
  const tryAgain = () => startRetry(() => retry());

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (online) return;
    const onReconnect = () => startRetry(() => retry());
    window.addEventListener("online", onReconnect, { once: true });
    return () => window.removeEventListener("online", onReconnect);
  }, [online, retry]);

  const subject = isArticle ? "this article" : "our latest articles";

  return (
    <>
      <title>{`${online ? "Insights unavailable" : "You are offline"} | PEDTransforms`}</title>
      <meta name="robots" content="noindex" />
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <BlogEmptyState
          headingLevel="h1"
          icon={online ? CloudOff : WifiOff}
          eyebrow={online ? "Temporarily unavailable" : "Connection lost"}
          title={
            online
              ? `${isArticle ? "This article is" : "Our insights are"} taking a short break`
              : `${isArticle ? "This article is" : "Our insights are"} stuck in transit`
          }
          description={
            online
              ? `We couldn't load ${subject} just now. It's usually temporary, so give it another go in a moment. The rest of the site is working as normal.`
              : `It looks like you've gone offline, so ${subject} can't reach you. Reconnect and this page will refresh itself the moment you're back.`
          }
          actions={
            <>
              <button
                type="button"
                onClick={tryAgain}
                disabled={retrying}
                className={`${emptyPrimaryAction} disabled:opacity-70`}
              >
                {retrying ? (
                  <Loader2 aria-hidden className="size-4 animate-spin" />
                ) : (
                  <RotateCcw aria-hidden className="size-4" />
                )}
                {retrying ? "Trying again…" : "Try again"}
              </button>
              <Link href={isArticle ? "/blog" : "/services"} className={emptySecondaryAction}>
                {isArticle ? "All articles" : "Explore our services"}
              </Link>
            </>
          }
        />
      </section>
    </>
  );
}
