import type { Metadata } from "next";
import Link from "next/link";
import { LegalList, LegalPage, LegalSection, sectionProps } from "@/components/legal";
import { legal } from "@/data/legal";
import { company } from "@/data/site";
import { serverEnv } from "@/lib/env.server";
import { pageMetadata } from "@/lib/seo";

const description = `How ${company.name} collects, uses, shares and protects personal data, and your rights under the Nigeria Data Protection Act 2023.`;

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description,
  path: "/privacy-policy",
});

const sections = [
  { id: "who-we-are", title: "Who we are" },
  { id: "data-we-collect", title: "Personal data we collect" },
  { id: "how-we-use", title: "How we use your data and why" },
  { id: "sharing", title: "Who we share your data with" },
  { id: "transfers", title: "Transfers outside Nigeria" },
  { id: "retention", title: "How long we keep your data" },
  { id: "security", title: "How we protect your data" },
  { id: "your-rights", title: "Your rights" },
  { id: "children", title: "Children" },
  { id: "complaints", title: "Complaints" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact us" },
];

export default function PrivacyPolicyPage() {
  const liveChat = Boolean(serverEnv.smartsuppKey);
  const botCheck = Boolean(serverEnv.turnstile);
  const email = <a href={`mailto:${legal.privacyEmail}`}>{legal.privacyEmail}</a>;
  const section = (id: string) => sectionProps(sections, id);

  return (
    <LegalPage
      title="Privacy Policy"
      intro={`How ${company.name} handles your personal data, in line with the Nigeria Data Protection Act 2023.`}
      path="/privacy-policy"
      sections={sections}
    >
      <LegalSection {...section("who-we-are")}>
        <p>
          {legal.controllerName} (&ldquo;{company.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a
          technology and business transformation company based in {legal.country}. We are the data
          controller for personal data collected through this website, pedtransforms.com.
        </p>
        <p>
          We process personal data in accordance with the <strong>Nigeria Data Protection Act 2023</strong>{" "}
          (&ldquo;NDPA&rdquo;) and the <strong>General Application and Implementation Directive 2025</strong>{" "}
          (&ldquo;GAID&rdquo;) issued by the {legal.regulator.name}. For any privacy question or request,
          email {email}.
        </p>
      </LegalSection>

      <LegalSection {...section("data-we-collect")}>
        <p>
          <strong>Information you give us.</strong> When you use our contact form we collect your name,
          email address, organisation (optional), phone number (optional), the topic of your enquiry and
          your message.{" "}
          {liveChat &&
            "If you use our live chat, we collect the messages you send and any details you choose to share, such as your name or email address. "}
          If you email us, we receive your email address and the content of your email.
        </p>
        <p>
          <strong>Information collected automatically.</strong> Like most websites, our hosting provider
          records technical information when you visit, such as your IP address, browser type, pages
          requested and the date and time of the request. We also use your IP address briefly to limit
          repeated contact form submissions and prevent spam. Cookies are described in our{" "}
          <Link href="/cookie-policy">Cookie Policy</Link>.
        </p>
        <p>
          <strong>Sensitive data.</strong> We do not ask for sensitive personal data, such as health,
          religious, ethnic, financial or biometric information. Please do not include it in your
          messages.
        </p>
      </LegalSection>

      <LegalSection {...section("how-we-use")}>
        <p>
          We only process personal data where we have a lawful basis under section 25 of the NDPA. We use
          your data to:
        </p>
        <LegalList>
          <li>
            <strong>Respond to your enquiry</strong> and tell you about the services you asked about. Basis:
            your consent when you submit the form, and taking steps at your request before entering into a
            contract.
          </li>
          {liveChat && (
            <li>
              <strong>Provide live chat support.</strong> Basis: your consent, given by accepting cookies in
              our cookie notice or by choosing Start chat.
            </li>
          )}
          <li>
            <strong>Deliver services to clients</strong> and manage our working relationship. Basis:
            performance of a contract.
          </li>
          <li>
            <strong>Keep this website secure</strong>, prevent spam and abuse, and fix problems. Basis: our
            legitimate interests in operating a safe and reliable website, balanced against your rights.
          </li>
          <li>
            <strong>Meet our legal obligations</strong>, for example tax, accounting and regulatory
            requirements, and requests from lawful authorities. Basis: legal obligation.
          </li>
        </LegalList>
        <p>
          We will only send you marketing communications with your consent, and you can opt out at any
          time. We do not sell your personal data, and we do not make decisions about you based solely on
          automated processing or profiling.
        </p>
      </LegalSection>

      <LegalSection {...section("sharing")}>
        <p>
          We share personal data only with trusted service providers who process it on our behalf, under
          written terms that require them to protect it and use it only for the purposes below:
        </p>
        <LegalList>
          <li>
            <strong>Vercel Inc.</strong> (United States) hosts this website and processes technical request
            data.
          </li>
          <li>
            <strong>Resend</strong> (United States) delivers contact form submissions to our inbox and
            sends you a confirmation that we received your enquiry.
          </li>
          {botCheck && (
            <li>
              <strong>Cloudflare, Inc.</strong> (United States) runs the Turnstile security check on our
              contact form, which processes technical data such as your IP address and browser signals to
              tell people apart from automated spam.
            </li>
          )}
          <li>
            <strong>Our business email provider</strong> stores the enquiries and emails we receive.
          </li>
          {liveChat && (
            <li>
              <strong>Smartsupp.com, s.r.o.</strong> (Czech Republic) provides our live chat. It is only
              loaded if you accept non-essential cookies or choose to start a chat.
            </li>
          )}
        </LegalList>
        <p>
          We may also disclose personal data to professional advisers such as lawyers and auditors, to
          law enforcement, courts or regulators where the law requires it, or to a buyer or successor if our
          business is reorganised or sold, subject to equivalent protections.
        </p>
      </LegalSection>

      <LegalSection {...section("transfers")}>
        <p>
          Some of our service providers store or process data outside Nigeria, including in the United
          States and the European Union. We only transfer personal data outside Nigeria in line with Part
          VIII (sections 41 to 43) of the NDPA, for example where the recipient is subject to adequate data
          protection rules or binding contractual safeguards, where the transfer is necessary to respond to
          your request or perform a contract with you, or with your consent.
        </p>
      </LegalSection>

      <LegalSection {...section("retention")}>
        <p>We keep personal data only for as long as we need it for the purposes above:</p>
        <LegalList>
          <li>
            <strong>Enquiries and related correspondence:</strong> up to 24 months after our last contact,
            unless you become a client.
          </li>
          <li>
            <strong>Client records:</strong> for the duration of the engagement and afterwards for as long
            as Nigerian tax, company and other laws require.
          </li>
          {liveChat && (
            <li>
              <strong>Live chat conversations:</strong> up to 12 months.
            </li>
          )}
          <li>
            <strong>IP addresses used for spam prevention:</strong> held in memory for no more than 10
            minutes.
          </li>
          <li>
            <strong>Server logs:</strong> for the short period set by our hosting provider.
          </li>
        </LegalList>
        <p>
          When the retention period ends we delete or anonymise the data. Once deleted, it can no longer be
          provided in response to an access request.
        </p>
      </LegalSection>

      <LegalSection {...section("security")}>
        <p>
          We use appropriate technical and organisational measures to protect personal data, including
          encrypted connections (HTTPS), security headers, spam and abuse protection, access controls and
          careful selection of service providers.
        </p>
        <p>
          If a personal data breach occurs that is likely to put your rights and freedoms at risk, we will
          notify the {legal.regulator.name} within 72 hours of becoming aware of it, as section 40 of the
          NDPA requires, and inform you without undue delay where the risk is high.
        </p>
      </LegalSection>

      <LegalSection {...section("your-rights")}>
        <p>Under sections 34 to 38 of the NDPA, you have the right to:</p>
        <LegalList>
          <li>be informed about how we process your personal data;</li>
          <li>access your personal data and receive a copy of it;</li>
          <li>have inaccurate or incomplete data corrected;</li>
          <li>have your data erased where we no longer have a lawful reason to keep it;</li>
          <li>restrict how we process your data in certain circumstances;</li>
          <li>object to processing, including for direct marketing;</li>
          <li>receive your data in a commonly used, machine-readable format (data portability);</li>
          <li>
            withdraw your consent at any time, without affecting processing carried out before you withdrew
            it; and
          </li>
          <li>not be subject to a decision based solely on automated processing.</li>
        </LegalList>
        <p>
          To exercise any of these rights, email {email}. We may ask you to confirm your identity first. We
          respond without undue delay and within 30 days, free of charge unless a request is manifestly
          unfounded or excessive.
        </p>
      </LegalSection>

      <LegalSection {...section("children")}>
        <p>
          This website and our services are intended for businesses and adults. We do not knowingly collect
          personal data from anyone under 18. If you believe a child has given us their data, contact us and
          we will delete it.
        </p>
      </LegalSection>

      <LegalSection {...section("complaints")}>
        <p>
          If you have a concern about how we handle your data, please contact us first at {email} so we
          can try to resolve it. You also have the right to lodge a complaint with the{" "}
          <a href={legal.regulator.url} target="_blank" rel="noopener noreferrer">
            {legal.regulator.name}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection {...section("changes")}>
        <p>
          We may update this policy from time to time. The &ldquo;Last updated&rdquo; date shows when it
          last changed. Where changes are significant, we will highlight them on this website.
        </p>
      </LegalSection>

      <LegalSection {...section("contact")}>
        <p>
          {legal.controllerName}, {legal.country}. Email: {email}. You can also reach us through our{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
