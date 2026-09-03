import Link from "next/link";
import SectorSlider from "./sector-slider";
import { CLIENTS, DIVISIONS } from "./nav";
import { Arrow, CtaBand, Eyebrow, Ph } from "./ui";

const STATS = [
  ["10+", "Years of Service"],
  ["29+", "Clients Served"],
  ["3", "Core Divisions"],
  ["24hr", "Enquiry Response"],
  ["100%", "Commitment to Quality"],
];

const IMPACT = [
  ["Experienced Engineers", "A dedicated sales and marketing team with real technical depth."],
  ["Trusted Principals", "We represent manufacturers upstream and downstream."],
  ["Innovative Solutions", "Fresh ideas that solve genuine industry challenges."],
  ["Consistent Growth", "A decade of expanding our client base across the region."],
];

export default function Home() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[var(--tint-a)] via-[var(--tint-b)] to-[var(--surface)]">
        {/*
          The clip belongs on this wrapper rather than the section. It has to
          contain the artwork's parallax drift, but the stats bar below sits
          deliberately half outside the section, and a clip on the section cuts
          it in half.
        */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Hero artwork bleeds off the right edge of the viewport. */}
          <Ph
            data-parallax
            className="absolute inset-y-0 right-0 hidden w-[58%] [mask-image:linear-gradient(to_right,transparent,black_30%)] lg:block"
          />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pt-16 pb-40 lg:grid-cols-2 lg:pb-48">
          <div>
            <span
              data-intro
              className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-1.5 text-xs font-medium text-text-1 shadow-sm ring-1 ring-line"
            >
              <span className="size-1.5 rounded-full bg-brand" />
              Trusted. Reliable. Global.
            </span>

            <h1
              data-intro
              className="mt-6 text-5xl font-bold leading-[1.08] tracking-tight text-text-1 sm:text-6xl"
            >
              Fueling Industries.
              <br />
              <span className="text-brand">Powering Tomorrow.</span>
            </h1>

            <p
              data-intro
              className="mt-6 max-w-md text-base leading-relaxed text-text-2"
            >
              Delivering top-quality products and services to the Oil and Gas,
              Refinery, and Power generation sectors in the UAE.
            </p>

            <div data-intro className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products-services"
                className="inline-flex items-center gap-3 btn bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark"
              >
                Explore Solutions <Arrow />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center btn border border-brand bg-surface-2 px-6 py-3.5 text-sm font-medium text-brand hover:bg-[var(--tint-b)]"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>

          <div className="relative">
            <Ph className="aspect-[4/3] w-full rounded-xl lg:hidden" />
            <div
              data-intro
              className="mt-4 flex items-start gap-2 lg:absolute lg:-top-24 lg:right-0 lg:mt-0"
            >
              <span className="mt-1.5 size-2 rounded-full ring-2 ring-brand" />
              <div>
                <p className="text-xs font-semibold text-text-1">Global Reach</p>
                <p className="text-xs leading-snug text-text-2">
                  Delivering value
                  <br />
                  across the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar, overlapping the hero base */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2">
          <div className="mx-auto max-w-7xl px-6">
            <dl
              data-intro
              className="grid grid-cols-2 gap-y-6 rounded-[18px] bg-surface-2/95 p-8 shadow-xl ring-1 ring-line backdrop-blur sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-line"
            >
              {STATS.map(([value, label]) => (
                <div key={label} className="flex items-center gap-4 lg:px-6">
                  <Ph className="size-10 shrink-0 rounded-lg" />
                  <div>
                    <dt data-count className="text-2xl font-bold text-text-1">
                      {value}
                    </dt>
                    <dd className="text-xs leading-snug text-text-2">
                      {label}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── We create impact ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-surface-2 pt-28 pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-4">
            <Eyebrow>We create impact</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-text-1">
              A trusted name in
              <br />
              Oil and Gas trading
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-text-2">
              Nextech General Trading is a reputable organization that delivers
              top-quality products and services to the Oil and Gas, Refinery,
              and Power generation sectors in the UAE.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-3 btn border border-line px-5 py-3 text-sm font-medium text-brand hover:border-brand"
            >
              Learn More About Us <Arrow />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-4">
            {IMPACT.map(([title, copy]) => (
              <div
                key={title}
                data-reveal
                className="rounded-[18px] border border-line bg-surface-2 p-5 shadow-sm"
              >
                <Ph className="size-9 rounded-md" />
                <h3 className="mt-6 text-sm font-semibold text-text-1">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-text-2">
                  {copy}
                </p>
              </div>
            ))}
          </div>

          <div data-reveal className="lg:col-span-4">
            <Ph className="aspect-square w-full rounded-xl" />
          </div>
        </div>
      </section>

      {/* ── Sectors ────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[var(--tint-c)] to-[var(--tint-d)] py-24">
        <div data-reveal className="mx-auto max-w-7xl px-6 text-center">
          <Eyebrow>What we do best</Eyebrow>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-text-1">
            Solutions for <span className="text-brand">Every Critical Sector</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-2">
            We proudly represent manufacturers from both upstream and downstream
            sectors, serving as a trusted partner in the dynamic world of energy
            and industry.
          </p>

          <SectorSlider />
        </div>
      </section>

      {/* ── Capabilities ───────────────────────────────────── */}
      <section className="bg-surface py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-4">
            <Eyebrow>Our capabilities</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-text-1">
              Delivering Excellence
              <br />
              Across the Value Chain
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-2">
              Mechanical, Electrical and Instrumentation — supplied with the
              technical expertise provided by our principals.
            </p>
            <Link
              href="/products-services"
              className="mt-7 inline-flex items-center gap-3 btn border border-line px-5 py-3 text-sm font-medium text-brand hover:border-brand"
            >
              View All Services <Arrow />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
            {DIVISIONS.map(([title, copy]) => (
              <article
                key={title}
                data-reveal
                className="overflow-hidden rounded-[18px] border border-line bg-surface-2 shadow-sm"
              >
                <Ph className="aspect-[4/3] w-full" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold leading-tight text-text-1">
                      {title}
                    </h3>
                    <Arrow className="mt-0.5 text-text-2" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-2">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[var(--tint-c)] via-[var(--tint-d)] to-[var(--tint-a)] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 data-reveal className="text-center text-lg font-semibold text-text-1">
            Trusted by Industry Leaders Worldwide
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous clients"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 text-text-2 shadow ring-1 ring-line"
            >
              <Arrow className="rotate-180" />
            </button>
            <div className="flex flex-1 items-center justify-between gap-6 overflow-hidden">
              {CLIENTS.slice(0, 6).map((name) => (
                <div
                  key={name}
                  data-reveal
                  className="grid h-10 flex-1 place-items-center rounded ph"
                >
                  <span className="px-2 text-center text-xs font-semibold text-text-1">
                    {name}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next clients"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 text-text-2 shadow ring-1 ring-line"
            >
              <Arrow />
            </button>
          </div>
        </div>
      </section>

      {/* ── Sustainability ─────────────────────────────────── */}
      <section className="grid bg-surface-2 lg:grid-cols-2">
        <Ph data-reveal className="min-h-[320px] w-full" />
        <div className="flex items-center bg-gradient-to-br from-[var(--surface)] to-[var(--tint-b)] px-6 py-16 lg:px-16">
          <div data-reveal className="max-w-lg">
            <Eyebrow>Sustainable future</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-text-1">
              Driving a Sustainable
              <br />
              and Responsible Tomorrow
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-2">
              With a decade of dedicated service, we deliver excellence, safety,
              and sustainability, contributing to the growth and prosperity of
              the UAE.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 btn bg-brand px-5 py-3 text-sm font-medium text-ink hover:bg-brand-dark"
              >
                Our Commitment <Arrow />
              </Link>
              <div className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 px-4 py-3 shadow-sm">
                <Ph className="size-8 rounded-md" />
                <p className="text-xs leading-snug text-text-2">
                  Building today for
                  <br />a better tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
