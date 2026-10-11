import { Bot, Compass, Layers, UsersRound, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import AboutShowcase from "@/components/AboutShowcase";
import JsonLd from "@/components/JsonLd";
import {
  CallToAction,
  Lifecycle,
  PageHero,
  SectionHeading,
  ValueProposition,
  WhyUs,
} from "@/components/sections";
import HowItWorks01 from "@/components/ui/how-it-works-01";
import { StackingCards } from "@/components/ui/stacking-card";
import { images } from "@/data/images";
import { company, mission, vision, whatWeDo } from "@/data/site";
import { team } from "@/data/team";
import { absoluteUrl, organizationId, pageMetadata } from "@/lib/seo";

const description =
  "PEDTransforms is a technology and business transformation company combining technology, talent and expertise to improve performance and drive growth.";

const whatWeDoIcons: Record<string, LucideIcon> = {
  "Digital Transformation": Layers,
  "Automation & Smart Systems": Bot,
  "Consulting & Advisory": Compass,
  "Technology Talent & Managed Services": UsersRound,
};

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
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
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
          <AboutShowcase
            image={images.about}
            capabilities={whatWeDo.length}
          />
        </div>
      </section>

      <HowItWorks01
        id="what-heading"
        eyebrow="What we do"
        title="Four capabilities, one partner"
        intro="Each capability stands on its own, and together they cover the full technology lifecycle, from first advice to ongoing management."
        className="bg-[#fafafa] lg:py-28"
        steps={whatWeDo.map((item) => ({
          icon: whatWeDoIcons[item.title] ?? Layers,
          title: item.title,
          body: item.description,
          href: item.href,
        }))}
        cta={{ href: "/services", label: "Explore our services" }}
      />

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
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[#1f1f1f]">
            This means we support clients not only when they purchase or implement technology,
            but also when they need the expertise and ongoing support to get full value from it.
          </p>
        </div>
      </section>

      <section className="bg-[#fafafa] pt-20 lg:pt-28" aria-labelledby="purpose-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="purpose-heading"
            eyebrow="Our purpose"
            title="Vision and mission"
            align="center"
          />
        </div>
        <StackingCards
          className="-mb-[10vh] md:-mt-[8vh]"
          items={[
            {
              label: "Our vision",
              text: vision,
              image: images.vision.src,
              imageAlt: images.vision.alt,
              color: "#f3eee9",
              href: "/contact",
              linkLabel: "Work with us",
            },
            {
              label: "Our mission",
              text: mission,
              image: images.mission.src,
              imageAlt: images.mission.alt,
              color: "#16181d",
              tone: "dark",
              href: "/services",
              linkLabel: "Explore our services",
            },
          ]}
        />
      </section>

      <ValueProposition
        eyebrow="Our value proposition"
        title="Technology, people and strategic expertise, together."
        intro="We combine all three so organisations can modernise, automate, scale and decide with confidence."
      />

      <WhyUs title="What sets us apart" />

      {team.length > 0 && (
        <section className="bg-white py-20 lg:py-28" aria-labelledby="team-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              id="team-heading"
              eyebrow="Our team"
              title="The people behind PEDTransforms"
            />
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {team.map((member) => (
                <li key={member.name} className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
                  <div className="relative aspect-[4/5] bg-[#f4f4f5]">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={`${member.name}, ${member.role}`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-5xl font-semibold text-[var(--brand)]/30">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 sm:p-5">
                    <h3 className="text-sm font-semibold text-[#1a1a1a] sm:text-lg">{member.name}</h3>
                    <p className="text-xs text-[var(--brand)] sm:text-sm">{member.role}</p>
                    {member.bio && (
                      <p className="mt-2 text-[13px] leading-relaxed text-[#1f1f1f] sm:text-sm">{member.bio}</p>
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
