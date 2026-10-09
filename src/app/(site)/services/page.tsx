import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ServiceCard from "@/components/ServiceCard";
import { CallToAction, Lifecycle, PageHero, SectionHeading } from "@/components/sections";
import { serviceCategories, servicesInCategory, subServices } from "@/data/services";
import { absoluteUrl, organizationId, pageMetadata } from "@/lib/seo";

const description =
  "Explore PEDTransforms services: digital transformation, technology talent, forecourt and fuel automation, smart systems, and business and project advisory.";

export const metadata: Metadata = pageMetadata({
  title: "Our Services",
  description,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Our Services",
          url: absoluteUrl("/services"),
          description,
          provider: { "@id": organizationId },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: subServices.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: service.title,
              url: absoluteUrl(`/services/${service.slug}`),
            })),
          },
        }}
      />

      <PageHero
        breadcrumbs={[{ name: "Our Services", path: "/services" }]}
        eyebrow="Our services"
        title="Technology, automation and expertise that deliver results"
        intro="Three core service areas and six specialist services, designed to work together from strategy and procurement through to implementation and ongoing operations."
      >
        <nav aria-label="Service areas" className="mt-10 flex flex-wrap gap-3">
          {serviceCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
            >
              {category.number} {category.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {serviceCategories.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          aria-labelledby={`${category.id}-heading`}
          className={`scroll-mt-20 py-20 lg:py-24 ${index % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
              <div>
                <span className="text-5xl font-semibold text-[var(--brand)]/20">{category.number}</span>
                <SectionHeading
                  id={`${category.id}-heading`}
                  eyebrow={category.tagline}
                  title={category.title}
                  intro={category.summary}
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {servicesInCategory(category.id).map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[#0d0d0d] py-20 lg:py-24" aria-labelledby="lifecycle-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff4d4d]">How we work</p>
          <h2
            id="lifecycle-heading"
            className="mt-2 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            One partner from advice to ongoing management
          </h2>
          <div className="mt-12">
            <Lifecycle tone="dark" />
          </div>
        </div>
      </section>

      <CallToAction
        title="Not sure which service you need?"
        body="Describe your objective and we will recommend the right combination of services."
      />
    </>
  );
}
