import type { Metadata } from "next";
import Link from "next/link";
import { Symbol } from "../icons";
import { COMPANY, SOCIALS } from "../nav";
import NewsletterForm from "../newsletter-form";
import { Logo } from "../ui";

export const metadata: Metadata = {
  title: "Nextech General Trading - Something's coming up",
  description:
    "Nextech General Trading supplies the Oil and Gas, Refinery and Power generation sectors across the United Arab Emirates. A new identity, a bigger vision — launching soon.",
};

export default function ComingSoon() {
  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-ink text-white">
      {/* The rig film sits behind everything, under scrims heavy enough to
          hold type over any frame it lands on. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/rig-poster.webp"
        aria-hidden
        className="fixed inset-0 -z-30 size-full object-cover"
      >
        <source src="/videos/rig.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-ink/80 via-ink/88 to-ink" />
      <div
        aria-hidden
        className="fixed top-[-25%] right-[-10%] -z-10 size-[48rem] rounded-full bg-[radial-gradient(circle,rgba(2,193,179,0.22),transparent_62%)]"
      />

      {/* ── Masthead ───────────────────────────────────────── */}
      <header className="site-container flex items-center justify-between py-7">
        <Logo onDark />
        <a
          href={COMPANY.phoneHref}
          className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15 sm:inline-flex"
        >
          <Symbol name="phone" className="size-4 text-brand" />
          {COMPANY.phone}
        </a>
      </header>

      <main className="site-container flex flex-1 flex-col justify-center py-6">
        {/* ── Headline ─────────────────────────────────────── */}
        <section>
          <p
            data-intro
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-white uppercase ring-1 ring-white/15"
          >
            <span className="size-1.5 rounded-full bg-brand" />
            Launching soon
          </p>

          <h1
            data-intro
            className="mt-6 text-[clamp(2.5rem,7.5vw,5.5rem)] leading-[1.02] font-bold tracking-tight"
          >
            Something&apos;s coming up
          </h1>

          <div data-intro className="mt-7 flex items-center gap-5">
            <span className="h-px w-16 bg-brand" />
            <p className="text-lg leading-snug text-white/80 sm:text-xl">
              A new identity, a bigger vision.
            </p>
          </div>
        </section>

        {/* ── Keep in touch ────────────────────────────────── */}
        <section
          data-reveal
          className="mt-10 grid gap-6 rounded-[22px] bg-gradient-to-r from-[#0d2a36] via-[#0a1f2b] to-ink p-7 ring-1 ring-white/10 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
        >
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Be the first to know when we launch.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              One email when the new site goes live. Nothing else.
            </p>
          </div>
          <NewsletterForm variant="cta" />
        </section>

        {/* ── Reach us now ─────────────────────────────────── */}
        <section className="mt-8 grid gap-5 sm:grid-cols-3">
          {(
            [
              ["phone", "Call us", COMPANY.phone, COMPANY.phoneHref],
              ["email", "Email", COMPANY.email, `mailto:${COMPANY.email}`],
              ["address", "Visit", COMPANY.addressShort, null],
            ] as const
          ).map(([icon, label, value, href]) => (
            <div key={label} data-reveal className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/12">
                <Symbol name={icon} className="size-4 text-brand" />
              </span>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block text-sm font-medium text-white hover:text-brand"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm leading-snug text-white/80">
                    {value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="site-container flex flex-col gap-3 border-t border-white/10 py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} Nextech General Trading. All rights
          reserved.
        </p>
        <p className="flex items-center gap-5">
          {SOCIALS.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              {name}
            </a>
          ))}
          <Link href="/unlock" className="hover:text-white">
            Client preview
          </Link>
        </p>
      </footer>
    </div>
  );
}
