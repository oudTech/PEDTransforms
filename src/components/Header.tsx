"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { company } from "@/data/site";
import { mainNav } from "@/data/navigation";
import { serviceCategories, servicesInCategory } from "@/data/services";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    }
    function onClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  function openMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 120);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${company.name} home`}>
          <Image
            src="/logo-light.png"
            alt={company.name}
            width={864}
            height={216}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            const linkClass = `flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition ${
              active ? "text-[var(--brand)]" : "text-[#333] hover:text-[var(--brand)]"
            }`;

            if (!("hasMenu" in item)) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.href}
                ref={menuRef}
                className="relative"
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={linkClass}
                  aria-expanded={menuOpen}
                  aria-controls={menuId}
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  {item.label}
                  <svg
                    className={`h-3.5 w-3.5 transition ${menuOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  id={menuId}
                  hidden={!menuOpen}
                  className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)]">
                    <div className="grid grid-cols-3 gap-2 p-5">
                      {serviceCategories.map((category) => (
                        <div key={category.id}>
                          <p className="px-3 text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">
                            {category.number} {category.title}
                          </p>
                          <ul className="mt-2 space-y-1">
                            {servicesInCategory(category.id).map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  className={`block rounded-lg px-3 py-2.5 transition hover:bg-[#fff5f5] ${
                                    pathname === `/services/${service.slug}` ? "bg-[#fff5f5]" : ""
                                  }`}
                                >
                                  <span className="block text-sm font-semibold text-[#1a1a1a]">
                                    {service.title}
                                  </span>
                                  <span className="mt-0.5 block text-xs leading-snug text-[#666]">
                                    {service.summary}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/services"
                      className="flex items-center justify-between border-t border-black/5 bg-[#fafafa] px-8 py-3.5 text-sm font-semibold text-[#1a1a1a] transition hover:text-[var(--brand)]"
                    >
                      View all services
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)] sm:inline-block"
          >
            Contact Us
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <div className="flex w-5 flex-col gap-1.5" aria-hidden>
              <span className={`h-0.5 bg-[#1a1a1a] transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 bg-[#1a1a1a] transition ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-[#1a1a1a] transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-black/5 bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          {mainNav.map((item) =>
            "hasMenu" in item ? (
              <div key={item.href} className="border-b border-black/5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-base font-semibold text-[#1a1a1a]"
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services"
                  onClick={() => setMobileServicesOpen((open) => !open)}
                >
                  {item.label}
                  <svg
                    className={`h-4 w-4 transition ${mobileServicesOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div id="mobile-services" hidden={!mobileServicesOpen} className="pb-3">
                  {serviceCategories.map((category) => (
                    <div key={category.id} className="mb-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand)]">
                        {category.title}
                      </p>
                      {servicesInCategory(category.id).map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block py-2 pl-3 text-sm text-[#444]"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link href="/services" className="block py-2 text-sm font-semibold text-[#1a1a1a]">
                    View all services →
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-black/5 py-3 text-base font-semibold text-[#1a1a1a]"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href="/contact"
            className="mt-5 block rounded-full bg-[var(--brand)] px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
