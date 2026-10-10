import { Clock, Mail, MapPin, PhoneCall, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { PageHero } from "@/components/sections";
import { serviceMenu } from "@/data/services";
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

type Detail = { label: string; value: string; href?: string; icon: LucideIcon };

export default function ContactPage() {
  const details = [
    contact.email && { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
    contact.phone && {
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
      icon: PhoneCall,
    },
    contact.address && { label: "Location", value: contact.address, icon: MapPin },
    contact.hours && { label: "Business hours", value: contact.hours, icon: Clock },
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

      <section className="bg-white py-14 sm:py-20 lg:py-24" aria-labelledby="contact-heading">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16 lg:px-8">
          <div className="min-w-0 lg:pt-4">
            <h2
              id="contact-heading"
              className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-5xl"
            >
              How can we help you today?
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[#666]">
              Our team is just a message or call away. Tell us what you want to achieve and we will
              recommend a practical next step.
            </p>

            {details.length > 0 && (
              <address className="mt-8 grid gap-5 not-italic sm:mt-10 sm:gap-6">
                {details.map(({ label, value, href, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#fff1f1] text-[var(--brand)]">
                      <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-[#777]">{label}:</p>
                      {href ? (
                        <a
                          href={href}
                          className="block break-words text-[17px] font-semibold text-[var(--brand)] transition hover:text-[var(--brand-dark)] hover:underline hover:underline-offset-4"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-[17px] font-semibold text-[#1a1a1a]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </address>
            )}
          </div>

          <div className="min-w-0">
            <h2 className="sr-only">Send us a message</h2>
            <Suspense fallback={<ContactForm menu={serviceMenu} />}>
              <ContactFormWithParams menu={serviceMenu} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
