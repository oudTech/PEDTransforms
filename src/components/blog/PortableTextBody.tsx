import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  stegaClean,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { slugify } from "@/lib/format";
import { isExternalHref, safeHref } from "@/lib/url";
import { blurProps, urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";
import CodeBlock from "./CodeBlock";

function blockText(value: PortableTextBlock) {
  return stegaClean(
    (value.children ?? [])
      .map((child) => ("text" in child ? String(child.text) : ""))
      .join(""),
  );
}

export function getHeadings(body: PortableTextBlock[] = []) {
  return body
    .filter(
      (block) =>
        block._type === "block" && (block.style === "h2" || block.style === "h3"),
    )
    .map((block) => {
      const text = blockText(block);
      return { id: slugify(text), text, level: block.style === "h2" ? 2 : 3 };
    })
    .filter((heading) => heading.text);
}

const calloutStyles = {
  info: { box: "border-sky-200 bg-sky-50 text-sky-900", icon: "ℹ" },
  tip: { box: "border-emerald-200 bg-emerald-50 text-emerald-900", icon: "✓" },
  warning: { box: "border-amber-200 bg-amber-50 text-amber-900", icon: "!" },
} as const;

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-6 text-[17px] leading-[1.85] text-[#333]">{children}</p>
    ),
    h2: ({ children, value }) => (
      <h2
        id={slugify(blockText(value))}
        className="mt-14 mb-4 scroll-mt-28 text-2xl font-semibold tracking-tight text-[#1a1a1a] sm:text-[28px]"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={slugify(blockText(value))}
        className="mt-10 mb-3 scroll-mt-28 text-xl font-semibold tracking-tight text-[#1a1a1a]"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-2 text-lg font-semibold text-[#1a1a1a]">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-4 border-[var(--brand)] bg-gradient-to-r from-[#fff5f5] to-transparent py-4 pl-6 pr-4 text-xl font-medium leading-relaxed text-[#1a1a1a]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 space-y-2.5 pl-1 text-[17px] leading-relaxed text-[#333]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 list-decimal space-y-2.5 pl-6 text-[17px] leading-relaxed text-[#333] marker:font-semibold marker:text-[var(--brand)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3">
        <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#1a1a1a]">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="rounded-md bg-[#f4f4f5] px-1.5 py-0.5 font-mono text-[0.88em] text-[var(--brand-dark)]">
        {children}
      </code>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-4">{children}</span>
    ),
    link: ({ children, value }) => {
      const href = safeHref(stegaClean(value?.href));
      if (!href) return <>{children}</>;
      const className =
        "font-medium text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-4 transition hover:decoration-[var(--brand)]";
      if (href.startsWith("/")) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      }
      const newTab = Boolean(value?.openInNewTab) && isExternalHref(href);
      return (
        <a
          href={href}
          className={className}
          target={newTab ? "_blank" : undefined}
          rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      const width = value.dimensions?.width ?? 1600;
      const height = value.dimensions?.height ?? 900;
      const ratio = Math.min(1, 1600 / width);
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(1600).url()}
            alt={value.alt || ""}
            width={Math.round(width * ratio)}
            height={Math.round(height * ratio)}
            {...blurProps(value)}
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full rounded-2xl"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-[#777]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <CodeBlock
        code={value.code}
        language={stegaClean(value.language)}
        filename={value.filename}
      />
    ),
    callout: ({ value }) => {
      const tone = (stegaClean(value.tone) as keyof typeof calloutStyles) || "info";
      const style = calloutStyles[tone] ?? calloutStyles.info;
      return (
        <aside className={`my-8 flex gap-4 rounded-2xl border p-5 ${style.box}`}>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/70 text-sm font-bold">
            {style.icon}
          </span>
          <p className="text-[15px] leading-relaxed">{value.text}</p>
        </aside>
      );
    },
  },
};

export default function PortableTextBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
