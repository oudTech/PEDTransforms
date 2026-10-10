import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServiceCard from "@/components/ServiceCard";
import { CallToAction, CheckIcon, PageHero, SectionHeading } from "@/components/sections";
import { serviceImage } from "@/data/images";
import { getCategory, getSubService, subServices } from "@/data/services";
import { absoluteUrl, organizationId, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return subServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getSubService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: false,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getSubService(slug);
  if (!service) notFound();

  const category = getCategory(service.category);
  const related = service.related
    .map((relatedSlug) => getSubService(relatedSlug))
    .filter((item) => item !== undefined);
  const url = absoluteUrl(`/services/${service.slug}`);
  const image = serviceImage(service.slug);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: service.title,
            serviceType: service.title,
            category: category.title,
            description: service.metaDescription,
            url,
            image: absoluteUrl(image.src.src),
            provider: { "@id": organizationId },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: service.title,
              itemListElement: service.capabilities.map((capability) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: capability.title,
                  description: capability.description,
                },
              })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />

      <PageHero
        breadcrumbs={[
          { name: "Our Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        eyebrow={`${category.number} ${category.title}`}
        title={service.title}
        intro={service.intro}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href={`/contact?service=${service.slug}`}
            className="rounded-full bg-[var(--brand)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)]"
          >
            Discuss your requirements
          </Link>
          <a
            href="#capabilities"
            className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/50"
          >
            What we deliver
          </a>
        </div>
      </PageHero>

      <section className="bg-white py-20 lg:py-24" aria-labelledby="challenges-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              id="challenges-heading"
              eyebrow="The challenge"
              title={service.headline}
            />
            <p className="mt-5 text-[17px] leading-relaxed text-[#444]">
              We work with organisations facing challenges such as:
            </p>
            <ul className="mt-5 space-y-3">
              {service.challenges.map((challenge) => (
                <li key={challenge} className="flex items-start gap-3 text-[15px] text-[#333]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" aria-hidden />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-black/10">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) calc(100vw - 32px), 600px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="scroll-mt-20 bg-[#fafafa] py-20 lg:py-24"
        aria-labelledby="capabilities-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="capabilities-heading"
            eyebrow="What we deliver"
            title={`Our ${service.title.toLowerCase()} capabilities`}
          />
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {service.capabilities.map((capability, index) => (
              <li key={capability.title} className="rounded-xl border border-black/[0.06] bg-white p-4 sm:rounded-2xl sm:p-7">
                <span className="flex size-8 items-center justify-center rounded-lg bg-[#fff1f1] text-xs font-bold text-[var(--brand)] sm:size-10 sm:rounded-xl sm:text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-[#1a1a1a] sm:mt-5 sm:text-lg">{capability.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#555] sm:mt-2 sm:text-[15px]">{capability.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24" aria-labelledby="outcomes-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading id="outcomes-heading" eyebrow="The outcome" title="What you can expect" />
            <ul className="mt-8 space-y-4">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-[16px] font-medium text-[#333]">
                  <CheckIcon className="mt-0.5" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="How we deliver" title="A clear, structured process" />
            <ol className="mt-8 space-y-4">
              {service.process.map((step, index) => (
                <li key={step.title} className="flex gap-4 rounded-2xl border border-black/[0.06] bg-[#fafafa] p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a]">{step.title}</h3>
                    <p className="mt-0.5 text-sm text-[#555]">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#fafafa] py-20 lg:py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQs"
            title="Frequently asked questions"
            align="center"
          />
          <div className="mt-10 divide-y divide-black/[0.06] overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-5 open:bg-[#fffafa]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base">{faq.question}</h3>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f4f4f5] text-lg leading-none text-[var(--brand)] transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#555]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-20 lg:py-24" aria-labelledby="related-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading id="related-heading" eyebrow="Related services" title="Often delivered together" />
              <Link href="/services" className="text-sm font-semibold text-[var(--brand)] hover:underline">
                All services →
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
              {related.map((item) => (
                <ServiceCard key={item.slug} service={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CallToAction
        title={`Let's talk about ${service.shortTitle.toLowerCase()}`}
        body="Share your objectives and current challenges, and we will recommend a practical next step."
        href={`/contact?service=${service.slug}`}
        label="Start the conversation"
      />
    </>
  );
}
