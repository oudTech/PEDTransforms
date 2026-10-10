import type { Metadata } from "next";
import Link from "next/link";
import { LegalList, LegalPage, LegalSection, sectionProps } from "@/components/legal";
import { legal } from "@/data/legal";
import { company } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const description = `The terms that apply when you use the ${company.name} website, governed by the laws of the Federal Republic of Nigeria.`;

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description,
  path: "/terms",
});

const sections = [
  { id: "agreement", title: "About these terms" },
  { id: "use", title: "Using this website" },
  { id: "information", title: "Information on this website" },
  { id: "services", title: "Enquiries and our services" },
  { id: "intellectual-property", title: "Intellectual property" },
  { id: "submissions", title: "What you send us" },
  { id: "third-parties", title: "Third-party links and services" },
  { id: "availability", title: "Availability and changes" },
  { id: "liability", title: "Our liability" },
  { id: "law", title: "Governing law and disputes" },
  { id: "general", title: "General" },
  { id: "contact", title: "Contact us" },
];

export default function TermsPage() {
  const email = <a href={`mailto:${legal.privacyEmail}`}>{legal.privacyEmail}</a>;
  const section = (id: string) => sectionProps(sections, id);

  return (
    <LegalPage
      title="Terms of Service"
      intro={`The terms that apply when you use the ${company.name} website.`}
      path="/terms"
      sections={sections}
    >
      <LegalSection {...section("agreement")}>
        <p>
          These terms apply to your use of pedtransforms.com (the &ldquo;website&rdquo;), operated by{" "}
          {legal.controllerName} (&ldquo;{company.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a
          company based in {legal.country}. By using the website you agree to these terms. If you do not
          agree, please do not use the website.
        </p>
        <p>
          Our <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
          <Link href="/cookie-policy">Cookie Policy</Link> also apply and form part of these terms.
        </p>
      </LegalSection>

      <LegalSection {...section("use")}>
        <p>You may use the website for lawful purposes only. You must not:</p>
        <LegalList>
          <li>use the website in a way that breaks any law, including the Cybercrimes (Prohibition, Prevention, etc.) Act 2015 as amended;</li>
          <li>attempt to gain unauthorised access to the website, its servers or any connected system;</li>
          <li>introduce viruses, malware or any other harmful code;</li>
          <li>send spam, misleading or abusive messages through our contact form or live chat;</li>
          <li>impersonate any person or misrepresent your connection with any organisation; or</li>
          <li>copy, scrape or harvest content or data in a way that burdens or disrupts the website.</li>
        </LegalList>
        <p>We may restrict or block access for anyone who breaches these terms.</p>
      </LegalSection>

      <LegalSection {...section("information")}>
        <p>
          Content on the website, including our blog, is general information about our services and
          industry topics. It is not professional, technical, legal or financial advice for your specific
          situation, and you should not rely on it as such. We work to keep information accurate and up to
          date, but we do not guarantee that it is complete, current or free from errors.
        </p>
      </LegalSection>

      <LegalSection {...section("services")}>
        <p>
          Submitting an enquiry, starting a chat or receiving information or a proposal from us does not
          create a contract. Any services we provide are governed by a separate written agreement or
          statement of work between you and {company.name}. If that agreement conflicts with these terms,
          the agreement prevails.
        </p>
      </LegalSection>

      <LegalSection {...section("intellectual-property")}>
        <p>
          The website and its content, including text, graphics, the {company.name} name and logo, and the
          design and layout, are owned by or licensed to {company.name} and protected by the Copyright Act
          2022 and other intellectual property laws of Nigeria and other countries. Some images are used
          under licence from third parties.
        </p>
        <p>
          You may view, download and print pages for your own information or internal business use. You may
          not otherwise copy, reproduce, modify, republish or commercially exploit any content without our
          written permission.
        </p>
      </LegalSection>

      <LegalSection {...section("submissions")}>
        <p>
          When you send us information through the website, you confirm that it is accurate and that you are
          entitled to share it. Please do not send confidential or commercially sensitive information until
          we have agreed appropriate confidentiality terms. We handle personal data as described in our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection {...section("third-parties")}>
        <p>
          The website may link to third-party websites and use third-party services, such as live chat.
          These are provided for convenience. We do not control them and are not responsible for their
          content, availability or privacy practices.
        </p>
      </LegalSection>

      <LegalSection {...section("availability")}>
        <p>
          We may update, change, suspend or withdraw any part of the website at any time without notice. We
          do not guarantee that the website will always be available or uninterrupted.
        </p>
      </LegalSection>

      <LegalSection {...section("liability")}>
        <p>
          The website is provided &ldquo;as is&rdquo;. To the fullest extent permitted by the laws of
          Nigeria, including the Federal Competition and Consumer Protection Act 2018, we exclude all
          warranties and conditions that are not expressly stated in these terms, and we are not liable for
          any indirect or consequential loss, or for loss of profits, revenue, data or business opportunity,
          arising from your use of or inability to use the website.
        </p>
        <p>
          Nothing in these terms limits or excludes liability that cannot lawfully be limited or excluded,
          such as liability for fraud, or for death or personal injury caused by negligence.
        </p>
      </LegalSection>

      <LegalSection {...section("law")}>
        <p>
          These terms, and any dispute or claim arising from them or from your use of the website, are
          governed by the laws of {legal.country}.
        </p>
        <p>
          If a dispute arises, please contact us first so we can try to resolve it amicably. If it is not
          resolved within 30 days, either party may refer it to mediation, or to the courts of competent
          jurisdiction in Nigeria, which will have exclusive jurisdiction.
        </p>
      </LegalSection>

      <LegalSection {...section("general")}>
        <p>
          If any part of these terms is found invalid or unenforceable, the rest remains in effect. If we
          do not enforce a right straight away, we do not waive it. We may update these terms from time to
          time, and the &ldquo;Last updated&rdquo; date shows when they last changed. Continuing to use the
          website after a change means you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection {...section("contact")}>
        <p>
          Questions about these terms can be sent to {email} or through our{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
