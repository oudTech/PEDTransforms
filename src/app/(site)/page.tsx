import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import {
  CallToAction,
  CheckIcon,
  Lifecycle,
  SectionHeading,
  WhyUsGrid,
} from "@/components/sections";
import { serviceCategories, servicesInCategory } from "@/data/services";
import { company, images, valueProposition } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { latestPostsQuery } from "@/sanity/lib/queries";
import type { PostCard as PostCardType } from "@/sanity/lib/types";

export const metadata: Metadata = pageMetadata({
  title: `${company.name} | Digital Transformation, Automation & Advisory`,
  description:
    "PEDTransforms turns technology investment into business value through digital transformation, automation, smart systems, technology talent and advisory.",
  path: "/",
  absoluteTitle: true,
});

export default async function HomePage() {
  const posts = await sanityFetch<PostCardType[]>({
    query: latestPostsQuery,
    tags: ["post", "author", "category"],
  });

  return (
    <>
      <Hero />
      <CoreServices />
      <Approach />
      <ValueProposition />
      <section className="bg-[#fafafa] py-20 lg:py-28" aria-labelledby="why-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="why-heading"
            eyebrow="Why PEDTransforms"
            title="A partner for technology, people and results"
            intro="We bring together technology, people and strategic expertise, and stay accountable from first conversation to ongoing support."
          />
          <div className="mt-12">
            <WhyUsGrid />
          </div>
        </div>
      </section>
      {posts && posts.length > 0 && (
        <section className="bg-white py-20 lg:py-28" aria-labelledby="insights-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                id="insights-heading"
                eyebrow="Insights"
                title="Latest from our blog"
              />
              <Link href="/blog" className="text-sm font-semibold text-[var(--brand)] hover:underline">
                View all articles →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CallToAction />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fafafa] via-white to-[#fff5f5]">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--brand)]/[0.06] blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">
            {company.tagline}
          </p>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-[56px]">
            Turn technology investment into{" "}
            <span className="text-[var(--brand)]">business value</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[#555]">
            PEDTransforms is a technology and business transformation company. We help
            organisations improve performance, optimise operations and achieve
            sustainable growth through technology, talent and expertise.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-full bg-[var(--brand)] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-dark)]"
            >
              Explore our services
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-[#1a1a1a]/10 bg-white px-7 py-3.5 text-sm font-semibold text-[#1a1a1a] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              Talk to us
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-2xl shadow-black/10">
            <Image
              src={images.hero}
              alt="Technology team working together on a transformation project"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 grid grid-cols-3 gap-2 rounded-2xl border border-black/5 bg-white/95 p-3 shadow-xl backdrop-blur sm:left-8 sm:right-auto sm:w-[420px]">
            {serviceCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="rounded-xl px-3 py-2 transition hover:bg-[#fff5f5]"
              >
                <span className="block text-xs font-semibold text-[var(--brand)]">
                  {category.number}
                </span>
                <span className="mt-0.5 block text-xs font-semibold leading-snug text-[#1a1a1a]">
                  {category.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreServices() {
  return (
    <section className="bg-white pb-20 pt-24 lg:pb-28 lg:pt-32" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title="Three core services. One accountable partner."
          intro="From strategy and procurement to automation, talent and managed operations, our services work together across the full technology lifecycle."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {serviceCategories.map((category) => (
            <article
              key={category.id}
              id={category.id}
              className="flex scroll-mt-28 flex-col rounded-3xl border border-black/[0.06] bg-[#fafafa] p-8"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-semibold text-[var(--brand)]/25">
                  {category.number}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">
                  {category.tagline}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[#1a1a1a]">
                {category.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#555]">{category.summary}</p>
              <ul className="mt-6 space-y-3">
                {servicesInCategory(category.id).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white px-5 py-4 transition hover:border-[var(--brand)]/30 hover:shadow-sm"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-[#1a1a1a] group-hover:text-[var(--brand)]">
                          {service.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-[#777]">
                          {service.summary}
                        </span>
                      </span>
                      <span
                        className="ml-4 text-[var(--brand)] transition group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="bg-[#0d0d0d] py-20 lg:py-28" aria-labelledby="approach-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff4d4d]">
            Our approach
          </p>
          <h2
            id="approach-heading"
            className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
          >
            Support across the complete technology lifecycle
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/65">
            We start by understanding your objectives, operational challenges and
            technology environment. Then we support you at every stage, not only
            when you buy or implement technology.
          </p>
        </div>
        <div className="mt-12">
          <Lifecycle tone="dark" />
        </div>
      </div>
    </section>
  );
}

function ValueProposition() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="value-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <SectionHeading
          id="value-heading"
          eyebrow="How we help"
          title="Technology that solves real business problems"
          intro="Every engagement is designed around measurable value. We help organisations to:"
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {valueProposition.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-[#fafafa] px-5 py-4 text-[15px] font-medium text-[#333]"
            >
              <CheckIcon className="mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
