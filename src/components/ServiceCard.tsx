import Image from "next/image";
import Link from "next/link";
import type { SubService } from "@/data/services";

export default function ServiceCard({ service }: { service: SubService }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight text-[#1a1a1a] transition group-hover:text-[var(--brand)]">
          <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0">
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#555]">{service.summary}</p>
        <span className="mt-auto pt-5 text-sm font-semibold text-[var(--brand)]">
          Learn more
          <span className="ml-1 inline-block transition group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </span>
      </div>
    </article>
  );
}
