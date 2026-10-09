import Link from "next/link";

export default function PostNotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand)]">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1a1a1a]">
        Article not found
      </h1>
      <p className="mt-3 text-[#666]">
        It may have been moved or unpublished.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-block rounded-full bg-[var(--brand)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)]"
      >
        Back to the blog
      </Link>
    </section>
  );
}
