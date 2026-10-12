"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { TeamMember } from "@/data/team";

const EXIT_MS = 160;

function Portrait({
  member,
  sizes,
  eager,
}: {
  member: TeamMember;
  sizes: string;
  eager?: boolean;
}) {
  return member.photo ? (
    <Image
      src={member.photo}
      alt={`${member.name}, ${member.role}`}
      fill
      sizes={sizes}
      placeholder="blur"
      loading={eager ? "eager" : undefined}
      className="object-cover object-top"
    />
  ) : (
    <span className="absolute inset-0 flex items-center justify-center text-5xl font-semibold text-[var(--brand)]/30">
      {member.name.charAt(0)}
    </span>
  );
}

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
        {members.map((member, index) => (
          <li key={member.name} data-reveal className="flex">
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-haspopup="dialog"
              className="group flex w-full flex-col rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
            >
              <span className="relative block aspect-[4/5] w-full shrink-0 overflow-hidden rounded-2xl bg-[#f4f4f5]">
                <span className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <Portrait
                    member={member}
                    sizes="(max-width: 1024px) 50vw, 300px"
                  />
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="absolute bottom-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow-sm backdrop-blur transition duration-300 group-hover:bg-[var(--brand)] group-hover:text-white sm:bottom-3.5 sm:right-3.5 sm:size-10"
                >
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45 sm:size-5" />
                </span>
              </span>

              <span className="mt-4 flex flex-1 flex-col items-start">
                <span className="block text-[15px] font-semibold leading-snug tracking-tight text-[#1a1a1a] sm:text-lg">
                  {member.name}
                </span>
                <span className="mt-1 block text-[13px] font-medium leading-snug text-[var(--brand)] sm:text-sm">
                  {member.role}
                </span>
                {member.focus && (
                  <span className="mt-1 block text-xs leading-snug text-[#1f1f1f]/70 sm:text-[13px]">
                    {member.focus}
                  </span>
                )}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-semibold text-[#1a1a1a] transition-colors group-hover:text-[var(--brand)] sm:text-sm">
                  Read bio
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active !== null && (
        <ProfileDialog
          members={members}
          index={active}
          onNavigate={setActive}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}

function ProfileDialog({
  members,
  index,
  onNavigate,
  onClose,
}: {
  members: TeamMember[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const member = members[index];
  const previous = members[(index - 1 + members.length) % members.length];
  const next = members[(index + 1) % members.length];
  const step = (offset: number) =>
    onNavigate((index + offset + members.length) % members.length);

  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      dialog.current?.close();
      onClose();
    }, EXIT_MS);
  }, [onClose]);

  useEffect(() => {
    const element = dialog.current;
    if (element && !element.open) element.showModal();
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    body.current?.scrollTo({ top: 0 });
  }, [index]);

  // Rendered under <body>: WebKit can fail to paint a modal dialog and its backdrop
  // when it is nested inside page content.
  return createPortal(
    <dialog
      ref={dialog}
      aria-labelledby="team-profile-name"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
      className={`team-dialog m-auto w-[calc(100%-1.5rem)] max-w-4xl overflow-visible bg-transparent p-0 outline-none ${
        closing
          ? "animate-out fade-out-0 zoom-out-95 duration-150 fill-mode-forwards"
          : "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-300"
      }`}
      data-closing={closing || undefined}
    >
      <div
        autoFocus
        tabIndex={-1}
        className="relative grid max-h-[88dvh] grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] outline-none md:h-[min(620px,88dvh)] md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close profile"
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-[#555] shadow-sm backdrop-blur transition hover:bg-[#f4f4f5] hover:text-[#1a1a1a] focus-visible:outline-2 focus-visible:outline-[var(--brand)] md:right-4 md:top-4"
        >
          <X aria-hidden className="size-4.5" />
        </button>

        <div className="relative hidden bg-[#f4f4f5] md:row-span-2 md:block">
          <Portrait key={member.name} member={member} sizes="320px" eager />
        </div>

        <div
          ref={body}
          className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-6 pt-5 sm:px-8 sm:pt-8 md:px-10 md:pb-8 md:pt-10"
        >
          <div className="flex items-center gap-4 pr-10 md:block md:pr-8">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-[#f4f4f5] md:hidden">
              <Portrait key={member.name} member={member} sizes="80px" eager />
            </div>
            <div className="min-w-0">
              <h2
                id="team-profile-name"
                className="text-balance text-xl font-semibold leading-tight tracking-tight text-[#1a1a1a] sm:text-2xl md:text-3xl"
              >
                {member.name}
              </h2>
              <p className="mt-1.5 text-sm font-medium leading-snug text-[var(--brand)] md:text-base">
                {member.role}
              </p>
              {member.focus && (
                <p className="mt-1 text-[13px] leading-snug text-[#1f1f1f]/70 md:text-sm">
                  {member.focus}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#1f1f1f] md:mt-7 md:text-base">
            {member.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a1a1a] hover:text-[var(--brand)]"
            >
              LinkedIn profile
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          )}
        </div>

        {members.length > 1 && (
          <nav
            aria-label="Team members"
            className="flex items-center justify-between gap-3 bg-[#fafafa] px-3 py-2.5 sm:px-5 md:col-start-2"
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="flex min-w-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#1f1f1f] transition hover:bg-black/[0.04] hover:text-[#1a1a1a] focus-visible:outline-2 focus-visible:outline-[var(--brand)]"
            >
              <ArrowLeft aria-hidden className="size-4 shrink-0" />
              <span className="sr-only">Previous: </span>
              <span className="truncate">{previous.name.split(",")[0]}</span>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="flex min-w-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#1f1f1f] transition hover:bg-black/[0.04] hover:text-[#1a1a1a] focus-visible:outline-2 focus-visible:outline-[var(--brand)]"
            >
              <span className="sr-only">Next: </span>
              <span className="truncate">{next.name.split(",")[0]}</span>
              <ArrowRight aria-hidden className="size-4 shrink-0" />
            </button>
          </nav>
        )}
      </div>
    </dialog>,
    document.body,
  );
}
