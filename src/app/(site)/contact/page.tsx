import type { Metadata } from "next";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { PageHero } from "@/components/sections";
import { company, contact } from "@/data/site";
import { absoluteUrl, organizationId, pageMetadata } from "@/lib/seo";
import ContactForm, { ContactFormWithParams } from "./ContactForm";

const description =
  "Contact PEDTransforms to discuss digital transformation, automation, smart systems, technology talent or advisory support for your organisation.";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description,
  path: "/contact",
});

const nextSteps = [
  {
    title: "We review your enquiry",
    description: "A specialist reads your message and the service area it relates to.",
  },
  {
    title: "We arrange a conversation",
    description: "We contact you to understand your objectives, environment and constraints.",
  },
  {
    title: "We recommend a next step",
    description: "You receive a practical recommendation, whether that is advice, a solution or a team.",
  },
];

type Detail = { label: string; value: string; href?: string };

export default function ContactPage() {
  const details = [
    contact.email && { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && {
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
    },
    contact.address && { label: "Address", value: contact.address },
    contact.hours && { label: "Business hours", value: contact.hours },
  ].filter((item): item is Detail => Boolean(item));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${company.name}`,
          url: absoluteUrl("/contact"),
          description,
          about: { "@id": organizationId },
        }}
      />

      <PageHero
        breadcrumbs={[{ name: "Contact Us", path: "/contact" }]}
        eyebrow="Contact us"
        title="Let's discuss what you want to achieve"
        intro="Tell us about your objectives and challenges. We will help you identify the right technology, automation, talent or advisory support."
      />

      <section className="bg-[#fafafa] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
          <div>
            <h2 className="sr-only">Send us a message</h2>
            <Suspense fallback={<ContactForm />}>
              <ContactFormWithParams />
            </Suspense>
          </div>

          <aside className="space-y-6">
            {details.length > 0 && (
              <div className="rounded-2xl border border-black/[0.06] bg-white p-7">
                <h2 className="text-lg font-semibold text-[#1a1a1a]">Contact details</h2>
                <address className="mt-4 space-y-4 not-italic">
                  {details.map((item) => (
                    <div key={item.label}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#888]">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block font-medium text-[#1a1a1a] hover:text-[var(--brand)]">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 whitespace-pre-line font-medium text-[#1a1a1a]">{item.value}</p>
                      )}
                    </div>
                  ))}
                </address>
              </div>
            )}

            <div className="rounded-2xl bg-[#0d0d0d] p-7 text-white">
              <h2 className="text-lg font-semibold">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-semibold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-0.5 text-sm text-white/65">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
