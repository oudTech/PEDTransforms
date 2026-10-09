import Image from "next/image";
import Link from "next/link";
import { companyLinks } from "@/data/navigation";
import { subServices } from "@/data/services";
import { company, contact } from "@/data/site";

export default function Footer() {
  const hasContact = Boolean(contact.email || contact.phone || contact.address);

  return (
    <footer className="bg-[#111] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-block" aria-label={`${company.name} home`}>
            <Image src="/logo-dark.png" alt={company.name} width={864} height={216} className="h-11 w-auto" />
          </Link>
          <p className="mt-5 text-sm font-semibold tracking-wide text-white">
            {company.tagline}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
            {company.shortDescription}
          </p>
        </div>

        <nav aria-label="Services">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Services</h2>
          <ul className="space-y-2.5">
            {subServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Company</h2>
          <ul className="space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/65 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Get in touch</h2>
          {hasContact ? (
            <address className="space-y-2.5 text-sm not-italic text-white/65">
              {contact.email && (
                <p>
                  <a href={`mailto:${contact.email}`} className="transition hover:text-white">
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.phone && (
                <p>
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="transition hover:text-white">
                    {contact.phone}
                  </a>
                </p>
              )}
              {contact.address && <p className="leading-relaxed">{contact.address}</p>}
            </address>
          ) : (
            <p className="text-sm leading-relaxed text-white/65">
              Tell us about your objectives and we will recommend the right next step.
            </p>
          )}
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)]"
          >
            Contact us
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>We help organisations turn technology investment into business value.</p>
        </div>
      </div>
    </footer>
  );
}
