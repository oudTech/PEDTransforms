import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { subServices } from "@/data/services";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand)]">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1a1a1a]">
            We could not find that page
          </h1>
          <p className="mt-4 text-[#666]">
            The page may have moved or no longer exists. These links may help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-[var(--brand)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)]"
            >
              Go to the homepage
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-black/15 px-6 py-2.5 text-sm font-semibold text-[#1a1a1a] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              Contact us
            </Link>
          </div>
          <ul className="mx-auto mt-12 grid max-w-2xl gap-2 text-left sm:grid-cols-2">
            {subServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block rounded-xl border border-black/[0.06] px-4 py-3 text-sm font-medium text-[#333] transition hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
