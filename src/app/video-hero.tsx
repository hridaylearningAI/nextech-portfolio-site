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
        aria-label="Nextech General Trading — home"
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
      */}
      <nav className="absolute top-1/2 right-6 flex -translate-y-1/2 flex-col items-end sm:right-10">
        {NAV.map(([label, href]) => {
          const active = href === "/";
          return (
            <Link
              key={href}
              href={href}
              data-intro
              aria-current={active ? "page" : undefined}
              className="group flex items-center justify-end gap-3 py-3"
            >
              {/* Rule grows out of the label on hover; held open for the
                  current page so the active item reads without relying on
                  colour alone. */}
              <span
                className={`h-px bg-brand transition-[width] duration-300 ease-out ${
                  active ? "w-6" : "w-0 group-hover:w-6"
                }`}
              />
              <span
                className={`text-sm font-medium tracking-wide transition-colors ${
                  active ? "text-brand" : "text-white/75 group-hover:text-white"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Wordless scroll cue ────────────────────────────────── */}
      <span
        data-intro
        aria-hidden
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <span className="scroll-cue" />
      </span>
    </section>
  );
}
