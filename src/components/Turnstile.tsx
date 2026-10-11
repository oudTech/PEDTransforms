"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

type TurnstileApi = {
  render(container: HTMLElement, options: Record<string, unknown>): string | undefined;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
  getResponse(widgetId: string): string | undefined;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// Must be loaded from this exact URL; Cloudflare does not support proxied or cached copies.
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile missing")));
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export type TurnstileHandle = {
  reset(): void;
  getResponse(): string | undefined;
};

/**
 * Cloudflare Turnstile bot check. It runs invisibly and only shows a challenge
 * when Cloudflare is unsure. The token is posted with the form as
 * `cf-turnstile-response`.
 */
export default function Turnstile({
  siteKey,
  action,
  ref,
}: {
  siteKey: string;
  action: string;
  ref?: Ref<TurnstileHandle>;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    },
    getResponse() {
      return widgetId.current ? window.turnstile?.getResponse(widgetId.current) : undefined;
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !container.current) return;
        widgetId.current = turnstile.render(container.current, {
          sitekey: siteKey,
          action,
          theme: "light",
          size: "flexible",
          appearance: "interaction-only",
        });
      })
      .catch((error: Error) => console.error("[turnstile]", error.message));
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [siteKey, action]);

  return <div ref={container} className="empty:hidden" />;
}
