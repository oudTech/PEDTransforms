import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

export default function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: Crumb[];
  tone?: "dark" | "light";
}) {
  const crumbs = [{ name: "Home", path: "/" }, ...items];
  const muted = tone === "light" ? "text-white/55 hover:text-white" : "text-[#888] hover:text-[var(--brand)]";
  const current = tone === "light" ? "text-white/90" : "text-[#1a1a1a]";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={current}>
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className={`transition ${muted}`}>
                      {crumb.name}
                    </Link>
                    <span aria-hidden className={tone === "light" ? "text-white/30" : "text-[#ccc]"}>
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
