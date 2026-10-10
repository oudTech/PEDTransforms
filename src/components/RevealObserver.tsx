"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "in";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    const seen = new WeakSet<Element>();
    const scan = (markVisibleAsStatic: boolean) => {
      const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
      for (const el of elements) {
        if (seen.has(el)) continue;
        seen.add(el);
        if (markVisibleAsStatic && el.getBoundingClientRect().top < window.innerHeight) {
          el.dataset.revealed = "static";
        } else {
          io.observe(el);
        }
      }
    };

    // Anything already on screen at first paint stays put, so nothing flickers.
    scan(true);
    root.classList.add("reveal-ready");

    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => scan(false));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
