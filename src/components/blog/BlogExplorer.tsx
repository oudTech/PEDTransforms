"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { stegaClean } from "next-sanity";
import type { Category, PostCard as PostCardType } from "@/sanity/lib/types";
import PostCard from "./PostCard";

const PAGE_SIZE = 9;

export default function BlogExplorer({
  posts,
  categories,
}: {
  posts: PostCardType[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const inCategory =
        !activeCategory ||
        post.categories?.some((c) => stegaClean(c.slug) === activeCategory);
      if (!inCategory) return false;
      if (!needle) return true;
      const haystack = [
        post.title,
        post.excerpt,
        post.author?.name,
        ...(post.categories?.map((c) => c.title) ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [posts, activeCategory, deferredQuery]);

  const shown = filtered.slice(0, visible);

  function selectCategory(slug: string | null) {
    setActiveCategory(slug);
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      <div className="sticky top-[68px] z-30 -mx-4 mb-8 border-b border-black/5 bg-white/85 px-4 py-4 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-3 [scrollbar-width:thin]"
            role="tablist"
            aria-label="Filter by category"
          >
            <FilterChip
              active={activeCategory === null}
              onClick={() => selectCategory(null)}
              label="All"
              count={posts.length}
            />
            {categories.map((category) => {
              const slug = stegaClean(category.slug);
              const count = posts.filter((p) =>
                p.categories?.some((c) => stegaClean(c.slug) === slug),
              ).length;
              return (
                <FilterChip
                  key={category._id}
                  active={activeCategory === slug}
                  onClick={() => selectCategory(slug)}
                  label={category.title}
                  count={count}
                />
              );
            })}
          </div>

          <label className="relative block w-full lg:w-80">
            <span className="sr-only">Search articles</span>
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder="Search articles, topics, authors…"
              className="w-full rounded-full border border-black/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-[#999] focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand)]/10"
            />
          </label>
        </div>
      </div>

      <p className="mb-6 text-sm text-[#666]" aria-live="polite">
        {filtered.length === posts.length
          ? `${posts.length} article${posts.length === 1 ? "" : "s"}`
          : `${filtered.length} of ${posts.length} articles`}
      </p>

      {shown.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3">
          {shown.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/10 bg-[#fafafa] px-6 py-16 text-center">
          <p className="text-lg font-semibold text-[#1a1a1a]">No articles found</p>
          <p className="mt-1 text-sm text-[#666]">
            Try a different search term or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              selectCategory(null);
            }}
            className="mt-5 rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)]"
          >
            Clear filters
          </button>
        </div>
      )}

      {filtered.length > visible && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border-2 border-[var(--brand)] px-7 py-3 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
          >
            Load more articles
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-[var(--brand)] text-white shadow-sm"
          : "bg-[#f4f4f5] text-[#444] hover:bg-[#e9e9eb]"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 text-xs ${
          active ? "bg-white/20 text-white" : "bg-white text-[#777]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
