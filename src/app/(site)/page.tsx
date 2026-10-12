import { ArrowUpRight, Bot, Compass, Layers, Workflow, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import {
  CallToAction,
  Eyebrow,
  enter,
  Lifecycle,
  SectionHeading,
  ValueProposition,
  WhyUs,
} from "@/components/sections";
import { serviceCategories, servicesInCategory, type ServiceCategoryId } from "@/data/services";
import { images } from "@/data/images";
import { company } from "@/data/site";
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
      <ValueProposition
        eyebrow="How we help"
        title="Technology that solves real business problems."
        intro="Every engagement is designed around measurable value, from modernising processes to managing the technology you depend on."
      />
      <WhyUs
        title="A partner for technology, people and results"
        intro="We bring together technology, people and strategic expertise, and stay accountable from first conversation to ongoing support."
      />
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
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CallToAction title="Ready to turn technology" accent="into business value?" />
    </>
  );
}

const heroServiceIcons: Record<ServiceCategoryId, LucideIcon> = {
  "digital-transformation": Layers,
  "automation-smart-systems": Bot,
  "consulting-advisory": Compass,
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fafafa] via-white to-[#fff5f5]">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--brand)]/[0.06] blur-3xl" />
      <AnimatedGridPattern
        className="inset-x-0 h-full skew-y-12 text-[var(--brand)] [mask-image:radial-gradient(640px_circle_at_28%_45%,white,transparent)]"
        lineColor="rgba(0,0,0,0.07)"
        duration={3}
        maxOpacity={0.1}
        numSquares={30}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-24">
        <div>
          <Eyebrow className={enter}>{company.tagline}</Eyebrow>
          <h1
            className={`mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-[56px] ${enter} [animation-delay:90ms]`}
          >
            Turn technology investment into{" "}
            <span className="text-[var(--brand)]">business value</span>
          </h1>
          <p
            className={`mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[#1f1f1f] ${enter} [animation-delay:180ms]`}
          >
            PEDTransforms is a technology and business transformation company. We help
            organisations improve performance, optimise operations and achieve
            sustainable growth through technology, talent and expertise.
          </p>
          <div className={`mt-9 flex flex-wrap gap-3 ${enter} [animation-delay:270ms]`}>
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

        <div
          className={`relative animate-in zoom-in-[0.97] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] fill-mode-both motion-reduce:animate-none [animation-delay:150ms]`}
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-2xl shadow-black/10">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              placeholder="blur"
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 1024px) calc(100vw - 32px), 600px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
            />
          </div>

          <div
            className={`absolute left-3 top-3 flex items-center gap-3 rounded-2xl bg-white/85 py-2.5 pl-2.5 pr-4 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/70 backdrop-blur-md sm:left-5 sm:top-5 ${enter} [animation-delay:450ms]`}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)] text-white shadow-[0_8px_18px_-8px_rgba(189,0,0,0.8)]">
              <Workflow aria-hidden className="size-[18px]" strokeWidth={2} />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold text-[#1a1a1a]">One accountable partner</span>
              <span className="mt-0.5 block text-[11px] text-[#1f1f1f]/70">From advice to managed operations</span>
            </span>
          </div>

          <nav
            aria-label="Core services"
            className={`absolute -bottom-9 inset-x-3 rounded-2xl bg-white/90 p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.04] backdrop-blur-xl sm:inset-x-6 ${enter} [animation-delay:550ms]`}
          >
            <ul className="grid grid-cols-3">
              {serviceCategories.map((category, index) => {
                const Icon = heroServiceIcons[category.id];
                return (
                  <li key={category.id} className="relative">
                    {index > 0 && (
                      <span aria-hidden className="absolute inset-y-3 left-0 w-px bg-black/[0.07]" />
                    )}
                    <a
                      href={`#${category.id}`}
                      className="group relative flex h-full flex-col gap-2.5 rounded-xl p-2.5 transition-colors hover:bg-[#fff5f5] focus-visible:outline-2 focus-visible:outline-[var(--brand)] sm:p-3.5"
                    >
                      <span className="flex items-center justify-between">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-[#fff1f1] text-[var(--brand)] transition-colors group-hover:bg-[var(--brand)] group-hover:text-white sm:size-9 sm:rounded-xl">
                          <Icon aria-hidden className="size-4 sm:size-[18px]" strokeWidth={1.8} />
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="hidden size-4 -translate-x-1 translate-y-1 text-[var(--brand)] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 sm:block"
                        />
                      </span>
                      <span className="text-[11px] font-semibold leading-snug text-[#1a1a1a] sm:text-[13px]">
                        {category.title}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
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
          {serviceCategories.map((category, index) => (
            <article
              key={category.id}
              id={category.id}
              data-reveal
              className="flex scroll-mt-28 flex-col rounded-3xl border border-black/[0.06] bg-[#fafafa] p-8"
            >
              <div className="flex items-baseline justify-between">
                <span aria-hidden className="text-4xl font-semibold text-[var(--brand)]/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">
                  {category.tagline}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[#1a1a1a]">
                {category.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#1f1f1f]">{category.summary}</p>
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
        <div data-reveal className="max-w-3xl">
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