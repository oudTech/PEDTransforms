import type { Metadata } from "next";
import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { CookieTable, LegalList, LegalPage, LegalSection, sectionProps } from "@/components/legal";
import { legal, liveChatCookies, necessaryCookies } from "@/data/legal";
import { company } from "@/data/site";
import { serverEnv } from "@/lib/env.server";
import { pageMetadata } from "@/lib/seo";

const description = `The cookies ${company.name} uses on this website, why we use them and how to accept, reject or withdraw consent.`;

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description,
  path: "/cookie-policy",
});

const sections = [
  { id: "what-are-cookies", title: "What cookies are" },
  { id: "who-is-responsible", title: "Who is responsible" },
  { id: "cookies-we-use", title: "Cookies we use" },
  { id: "your-choices", title: "Your choices and withdrawing consent" },
  { id: "browser-controls", title: "Browser controls" },
  { id: "changes", title: "Changes to this policy" },
];

export default function CookiePolicyPage() {
  const liveChat = Boolean(serverEnv.smartsuppKey);
  const section = (id: string) => sectionProps(sections, id);

  return (
    <LegalPage
      title="Cookie Policy"
      intro="Which cookies we use, why we use them and how you stay in control."
      path="/cookie-policy"
      sections={sections}
    >
      <LegalSection {...section("what-are-cookies")}>
        <p>
          Cookies are small text files that a website stores in your browser. Similar technologies, such as
          local storage, work in the same way. This policy covers all of them and we refer to them together
          as &ldquo;cookies&rdquo;.
        </p>
        <p>
          We use as few cookies as possible. We do not use advertising cookies, and we do not use analytics
          or tracking tools that follow you across other websites.
        </p>
      </LegalSection>

      <LegalSection {...section("who-is-responsible")}>
        <p>
          {legal.controllerName} is responsible for the cookies used on pedtransforms.com. We use them in
          line with the Nigeria Data Protection Act 2023 and Article 19 of the General Application and
          Implementation Directive 2025, which require your consent for any cookie that is not strictly
          necessary. Questions can be sent to{" "}
          <a href={`mailto:${legal.privacyEmail}`}>{legal.privacyEmail}</a>.
        </p>
      </LegalSection>

      <LegalSection {...section("cookies-we-use")}>
        <h3 className="text-base font-semibold text-[#1a1a1a]">Strictly necessary cookies</h3>
        <p>
          These are needed for the website to work and to remember your cookie choice. They do not process
          sensitive or financial data, so they do not require consent.
        </p>
        <CookieTable rows={necessaryCookies} />

        {liveChat ? (
          <>
            <h3 className="pt-4 text-base font-semibold text-[#1a1a1a]">
              Live chat cookies (only with your consent)
            </h3>
            <p>
              Our live chat is provided by Smartsupp. It is not loaded, and none of the cookies below are
              set, until you agree in one of two ways:
            </p>
            <LegalList>
              <li>
                <strong>Accept</strong> in the cookie notice. The chat loads on every page, and Smartsupp may
                also count your visits so greetings and automated messages are relevant.
              </li>
              <li>
                <strong>Start chat</strong> in the chat button at the bottom of each page. The chat loads
                for the rest of your browser session, only to hold your conversation. Visit counting stays
                off.
              </li>
            </LegalList>
            <p>
              If you do neither, the chat button stays on screen but loads nothing from Smartsupp. You can
              also reach us through our <Link href="/contact">contact page</Link>.
            </p>
            <CookieTable rows={liveChatCookies} />
            <p>
              Smartsupp&rsquo;s own use of data is described in the{" "}
              <a href="https://smartsupp.helpjuice.com/en_US/privacy" target="_blank" rel="noopener noreferrer">
                Smartsupp privacy information
              </a>
              .
            </p>
          </>
        ) : (
          <p>We do not currently use any cookies that require your consent.</p>
        )}
      </LegalSection>

      <LegalSection {...section("your-choices")}>
        <p>
          When you first visit, a cookie notice asks you to <strong>Accept</strong> or{" "}
          <strong>Reject</strong> non-essential cookies. Closing or ignoring the notice is not treated as
          consent, and nothing non-essential is loaded until you choose.
        </p>
        <p>
          You can change your mind at any time. Select <strong>Cookie settings</strong> at the bottom of any
          page, or use the button below, and choose again. If you choose <strong>Reject</strong>, this also
          withdraws any consent you gave by starting a chat: we stop loading the live chat and remove its
          cookies from your browser. Withdrawing consent does not affect anything done
          before you withdrew it.
        </p>
        <p>
          <CookieSettingsButton className="rounded-full border-2 border-[var(--brand)] px-5 py-2 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white" />
        </p>
        <p>We keep a record of your choice for 6 months, after which we ask again.</p>
      </LegalSection>

      <LegalSection {...section("browser-controls")}>
        <p>Most browsers also let you view, block and delete cookies:</p>
        <LegalList>
          <li>Chrome: Settings, then Privacy and security, then Third-party cookies or Site data.</li>
          <li>Safari: Settings, then Privacy, then Manage Website Data.</li>
          <li>Firefox: Settings, then Privacy &amp; Security, then Cookies and Site Data.</li>
          <li>Edge: Settings, then Cookies and site permissions.</li>
        </LegalList>
        <p>
          Blocking strictly necessary cookies may stop parts of the website from working, and we will ask for
          your cookie choice again on each visit.
        </p>
      </LegalSection>

      <LegalSection {...section("changes")}>
        <p>
          We will update this policy if we change the cookies we use. If a change affects your consent, we
          will ask you again. See also our <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
