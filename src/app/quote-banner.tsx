import Link from "next/link";
import { Arrow, Photo } from "./ui";

/**
 * "Ready to Power What's Next?" call to action. A dark band in both themes on
 * purpose: it is a moment of emphasis, like the pull-quote card, not a surface
 * that should follow the page.
 *
 * `href` is a prop because the right target depends on where it sits. On the
 * contact page a link to /contact would reload the page you are already on, so
 * there it points at the enquiry form instead.
 */
export default function QuoteBanner({ href = "/contact" }: { href?: string }) {
  return (
    <div
      data-reveal
      className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0d2a36] via-[#0a1d2a] to-ink px-8 py-10 shadow-xl ring-1 ring-white/10 sm:px-12 md:py-12"
    >
      {/*
        Planet. A lined placeholder like every other image slot on the site,
        darkened so it reads as night rather than as a pale disc on navy.
        Swap the Ph for a night-side Earth photograph when one is available.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-8%] left-[56%] -z-10 hidden aspect-square w-[38%] md:block"
      >
        <div className="absolute inset-0 rounded-full shadow-[0_0_80px_rgba(2,193,179,0.28)]" />
        <Photo
          src="/images/earth-night.webp"
          className="absolute inset-0 size-full rounded-full"
        />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(8,16,26,0.25),rgba(8,16,26,0.9)_72%)] ring-1 ring-brand/30" />
      </div>

      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
        <div className="max-w-md">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">
            Let&apos;s build a stronger tomorrow
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
            Ready to Power What&apos;s Next?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Get in touch with our team for tailored solutions, competitive
            pricing and expert support.
          </p>
        </div>

        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-3 btn bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-lg hover:bg-white/90"
        >
          Get a Quote <Arrow />
        </Link>
      </div>

      {/* Stacked tagline against the right edge, over the planet. */}
      <div
        aria-hidden
        className="absolute top-1/2 right-8 hidden -translate-y-1/2 flex-col items-center lg:flex"
      >
        <p className="text-center text-[11px] leading-[2] font-semibold tracking-[0.22em] text-white/80 uppercase">
          Global
          <br />
          Solutions
          <br />
          Brighter
          <br />
          Tomorrows
        </p>
        <span className="mt-4 h-px w-7 bg-white/40" />
      </div>
    </div>
  );
}
