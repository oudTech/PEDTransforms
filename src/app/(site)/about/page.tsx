import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import {
  CallToAction,
  CheckIcon,
  Lifecycle,
  PageHero,
  SectionHeading,
  WhyUsGrid,
} from "@/components/sections";
import { company, images, mission, valueProposition, vision, whatWeDo } from "@/data/site";
import { team } from "@/data/team";
import { absoluteUrl, organizationId, pageMetadata } from "@/lib/seo";

const description =
  "PEDTransforms is a technology and business transformation company combining technology, talent and expertise to improve performance and drive growth.";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${company.name}`,
          url: absoluteUrl("/about"),
          description,
          about: { "@id": organizationId },
        }}
      />

      <PageHero
        breadcrumbs={[{ name: "About Us", path: "/about" }]}
        eyebrow="About PEDTransforms"
        title="Transforming businesses through technology, talent and expertise"
        intro="We help organisations harness technology, talent and innovation to improve performance, optimise operations and achieve sustainable growth."
      />

      <section className="bg-white py-20 lg:py-28" aria-labelledby="who-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading id="who-heading" eyebrow="Who we are" title="A technology transformation partner" />
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-[#444]">
              <p>
                {company.name} works with organisations to navigate a changing technology
                landscape. We identify and procure the right solutions, implement intelligent
                systems, build digital capabilities, provide specialised technology talent and
                manage critical technology operations.
              </p>
              <p>
                Our services span Digital Transformation, Automation &amp; Smart Systems,
                Consulting &amp; Advisory, and Technology Talent &amp; Managed Services. Together
                they give clients practical, scalable and business-focused solutions.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-black/10">
            <Image
              src={images.about}
              alt="PEDTransforms consultants collaborating with a client team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fafafa] py-20 lg:py-28" aria-labelledby="what-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="what-heading" eyebrow="What we do" title="Four capabilities, one partner" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {whatWeDo.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-black/[0.06] bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.3)]"
              >
                <h3 className="text-xl font-semibold text-[#1a1a1a] group-hover:text-[var(--brand)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#555]">{item.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--brand)]">
                  Learn more <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28" aria-labelledby="approach-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="approach-heading"
            eyebrow="Our approach"
            title="Technology should solve real problems and create measurable value"
            intro="We begin with your objectives, operational challenges and technology environment, then design the right solution. Our model supports the complete technology lifecycle."
          />
          <div className="mt-12">
            <Lifecycle />
          </div>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[#555]">
            This means we support clients not only when they purchase or implement technology,
            but also when they need the expertise and ongoing support to get full value from it.
          </p>
        </div>
      </section>

      <section className="bg-[#0d0d0d] py-20 lg:py-24" aria-label="Vision and mission">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {[
            { label: "Our vision", text: vision },
            { label: "Our mission", text: mission },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:p-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#ff4d4d]">
                {item.label}
              </h2>
              <p className="mt-4 text-xl font-medium leading-relaxed text-white lg:text-2xl">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28" aria-labelledby="value-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <SectionHeading
            id="value-heading"
            eyebrow="Our value proposition"
            title="Technology, people and strategic expertise, together"
            intro="We help organisations to:"
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

      <section className="bg-[#fafafa] py-20 lg:py-28" aria-labelledby="why-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="why-heading" eyebrow="Why PEDTransforms" title="What sets us apart" />
          <div className="mt-12">
            <WhyUsGrid />
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="bg-white py-20 lg:py-28" aria-labelledby="team-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="team-heading"
              eyebrow="Our team"
              title="The people behind PEDTransforms"
            />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <li key={member.name} className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
                  <div className="relative aspect-[4/5] bg-[#f4f4f5]">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={`${member.name}, ${member.role}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-5xl font-semibold text-[var(--brand)]/30">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#1a1a1a]">{member.name}</h3>
                    <p className="text-sm text-[var(--brand)]">{member.role}</p>
                    {member.bio && (
                      <p className="mt-2 text-sm leading-relaxed text-[#555]">{member.bio}</p>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-semibold text-[#1a1a1a] hover:text-[var(--brand)]"
                      >
                        LinkedIn profile
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CallToAction
        title="Transform. Automate. Augment. Optimise."
        body="Let us help you turn technology investment into business value."
      />
    </>
  );
}
