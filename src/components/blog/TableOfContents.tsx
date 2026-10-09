"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#999]">
        On this page
      </p>
      <ul className="space-y-1 border-l border-black/10">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`-ml-px block border-l-2 py-1.5 text-sm transition ${
                  heading.level === 3 ? "pl-7" : "pl-4"
                } ${
                  active
                    ? "border-[var(--brand)] font-medium text-[var(--brand)]"
                    : "border-transparent text-[#666] hover:text-[#1a1a1a]"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
