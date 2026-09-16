import Link from "next/link";
import { NAV } from "./nav";
import { Logo, Ph } from "./ui";

/**
 * Full-viewport opener. Carries its own logo and nav because the sticky
 * SiteHeader is cloaked while this section fills the screen — see the
 * [data-video-hero] rules in globals.css and the reveal trigger in motion.tsx.
 * Two visible navbars at once is the thing to avoid here.
 *
 * Deliberately full-bleed rather than sitting inside the site's max-w-7xl
 * container: the logo and nav hug the screen edges, which is what separates a
 * cinematic opener from another contained section.
 */
export default function VideoHero() {
  return (
    <section
      data-video-hero
      className="relative isolate h-[100svh] min-h-[560px] overflow-hidden"
    >
      {/* Swap for:
          <video autoPlay muted loop playsInline poster="..."
                 className="absolute inset-0 -z-20 size-full object-cover" /> */}
      <Ph data-parallax className="absolute inset-0 -z-20" />

      {/*
        Scrim. Keeps the mark and the nav legible over footage whose brightness
        we do not control, and gives the section the weight of a film still
        rather than a large grey rectangle.
      */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />

      {/* ── Mark, top-left of the screen ───────────────────────── */}
      <Link
        href="/"
        aria-label="Nextech General Trading, home"
        data-intro
        className="absolute top-7 left-6 sm:top-8 sm:left-10"
      >
        <Logo onDark />
      </Link>

      {/*
        ── Nav, a vertical rail pinned to the right edge ────────
        Right-aligned so the ragged edge falls on the left and the items keep a
        clean line against the screen edge. Each row is padded to a 44px hit
        target rather than spaced with gap, so the targets meet without
        visually crowding the labels.

        Sits a little above centre, per the brief.
      */}
      <nav className="absolute top-[42%] right-6 flex -translate-y-1/2 flex-col items-end sm:right-10">
        {NAV.map((node) =>
          "children" in node ? (
            <div key={node.label} className="flex flex-col items-end">
              {/* A grouping label, not a link. The rail has the vertical room
                  to show it, so the two pages under it never need a hover
                  menu to be discovered. */}
              <span className="pt-3 pb-1 text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                {node.label}
              </span>
              {node.children.map((child) => (
                <RailLink key={child.href} {...child} />
              ))}
            </div>
          ) : (
            <RailLink key={node.href} {...node} />
          ),
        )}
      </nav>
    </section>
  );
}

function RailLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      data-intro
      className="group flex items-center justify-end gap-3 py-3"
    >
      {/* Rule grows out of the label on hover. */}
      <span className="h-px w-0 bg-brand transition-[width] duration-300 ease-out group-hover:w-6" />
      <span className="text-sm font-medium tracking-wide text-white/75 transition-colors group-hover:text-white">
        {label}
      </span>
    </Link>
  );
}
