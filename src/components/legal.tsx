import type { ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import { PageHero } from "@/components/sections";
import { legal, type CookieRow } from "@/data/legal";
import { absoluteUrl, organizationId } from "@/lib/seo";

export type LegalSectionMeta = { id: string; title: string };

/** Props for <LegalSection>, numbered by the section's position in the page's list. */
export function sectionProps(sections: LegalSectionMeta[], id: string) {
  const index = sections.findIndex((s) => s.id === id);
  return { section: sections[index], number: index + 1 };
}

export function LegalPage({
  title,
  intro,
  path,
  sections,
  children,
}: {
  title: string;
  intro: string;
  path: string;
  sections: LegalSectionMeta[];
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          url: absoluteUrl(path),
          description: intro,
          publisher: { "@id": organizationId },
        }}
      />
      <PageHero breadcrumbs={[{ name: title, path }]} eyebrow="Legal" title={title} intro={intro} />

      <div className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#888]">
              Last updated
            </p>
            <p className="mt-1 text-sm font-medium text-[#1a1a1a]">{legal.lastUpdated}</p>
            <nav aria-label="On this page" className="mt-8 hidden lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#888]">
                On this page
              </p>
              <ol className="mt-3 space-y-2 border-l border-black/[0.08] text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-[#666] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="max-w-3xl text-[15px] leading-relaxed text-[#444] [&_a]:font-medium [&_a]:text-[var(--brand)] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-[#1a1a1a]">
            {children}
          </article>
        </div>
      </div>
    </>
  );
}

export function LegalSection({
  section,
  number,
  children,
}: {
  section: LegalSectionMeta;
  number: number;
  children: ReactNode;
}) {
  return (
    <section id={section.id} className="scroll-mt-28 border-t border-black/[0.06] py-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold tracking-tight text-[#1a1a1a]">
        <span className="mr-2 text-[var(--brand)]">{number}.</span>
        {section.title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-[var(--brand)]">{children}</ul>
  );
}

export function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-black/[0.08]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-[#fafafa] text-xs uppercase tracking-wider text-[#666]">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Name</th>
            <th scope="col" className="px-4 py-3 font-semibold">Provider</th>
            <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
            <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
            <th scope="col" className="px-4 py-3 font-semibold">Type</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.06]">
          {rows.map((row) => (
            <tr key={row.name} className="align-top">
              <td className="px-4 py-3 font-mono text-xs text-[#1a1a1a]">{row.name}</td>
              <td className="px-4 py-3">{row.provider}</td>
              <td className="px-4 py-3">{row.purpose}</td>
              <td className="px-4 py-3 whitespace-nowrap">{row.duration}</td>
              <td className="px-4 py-3 whitespace-nowrap">{row.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
