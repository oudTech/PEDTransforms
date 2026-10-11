import Image from "next/image";
import Link from "next/link";
import { serviceImage } from "@/data/images";
import type { SubService } from "@/data/services";

export default function ServiceCard({ service }: { service: SubService }) {
  const image = serviceImage(service.slug);
  return (
    <article data-reveal className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)] sm:rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          placeholder="blur"
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 400px"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-6">
        <h3 className="text-sm font-semibold leading-snug tracking-tight text-[#1a1a1a] transition group-hover:text-[var(--brand)] sm:text-lg">
          <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0">
            {service.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-4 text-xs leading-relaxed text-[#1f1f1f] sm:mt-2 sm:line-clamp-none sm:text-sm">
          {service.summary}
        </p>
        <span className="mt-auto pt-3 text-xs font-semibold text-[var(--brand)] sm:pt-5 sm:text-sm">
          Learn more
          <span className="ml-1 inline-block transition group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </span>
      </div>
    </article>
  );
}
