import { Symbol } from "../icons";
import GlobalReach from "../global-reach";
import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, CtaBand, PageHero, Ph, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "About Us - Nextech General Trading",
  description:
    "Nextech General Trading delivers top-quality products and services to the Oil and Gas, Refinery, and Power generation sectors in the UAE.",
};

const WHO_WE_ARE = [
  "Nextech General Trading is a reputable organization that delivers top-quality products and services to the Oil and Gas, Refinery, and Power generation sectors in the UAE. Over the past decade, we have maintained consistent growth and successfully expanded our client base within the region.",
  "Our dedicated team of experienced engineers in sales and marketing, combined with the technical expertise provided by our principals, empowers our customers to overcome industry challenges. We offer innovative ideas and solutions that ensure the successful achievement of end objectives.",
  "We proudly represent manufacturers from both upstream and downstream sectors, serving as a trusted partner in the dynamic world of energy and industry. At Nextech General Trading, our commitment is to excellence, innovation, and sustainable solutions for a brighter energy future.",
];

const STATS = [
  ["10+", "Years of Service"],
  ["29+", "Clients Served"],
  ["3", "Core Divisions"],
  ["24hr", "Enquiry Response"],
  ["100%", "Commitment to Quality"],
];

const PILLARS = [
  [
    "Excellence",
    "Consistent quality across every product and service we deliver.",
  ],
  [
    "Innovation",
    "Fresh ideas and solutions that solve real industry challenges.",
  ],
  [
    "Sustainability",
    "Working towards a brighter, more responsible energy future.",
  ],
];

const SECTORS = [
  ["Oil & Gas", "Upstream and downstream supply across the Emirates."],
  ["Refinery", "Products and services for refining operations."],
  ["Power Generation", "Equipment supply for power producers and utilities."],
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Built on Trust."
        accent="Driven by Excellence."
        copy="A trusted name in the world of Oil and Gas trading, based in the dynamic heart of the UAE."
      />

      {/* ── Who we are ─────────────────────────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container grid items-center gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-2">
          <Ph data-reveal className="aspect-[4/3] w-full rounded-xl" />
          <div data-reveal>
            <SectionHead eyebrow="Our Story" title="Who" accent="we are?" />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-text-2">
              {WHO_WE_ARE.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 btn bg-brand px-5 py-3 text-sm font-medium text-ink hover:bg-brand-dark"
            >
              Get in Touch <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[var(--tint-d)] to-[var(--surface)] py-16">
        <dl className="site-container grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-line">
          {STATS.map(([value, label]) => (
            <div
              key={label}
              data-reveal
              className="flex items-center gap-4 lg:px-6"
            >
              <Symbol
                name={
                  label.includes("Years")
                    ? "calendar"
                    : label.includes("Clients")
                      ? "users"
                      : label.includes("Divisions")
                        ? "cog"
                        : label.includes("Response")
                          ? "clock"
                          : "shield"
                }
                className="size-10 text-brand"
              />
              <div>
                <dt data-count className="text-2xl font-bold text-text-1">
                  {value}
                </dt>
                <dd className="text-xs leading-snug text-text-2">{label}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <GlobalReach />

      {/* ── Commitment ─────────────────────────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container">
          <SectionHead
            center
            eyebrow="What Drives Us"
            title="The principles behind"
            accent="every shipment."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map(([title, copy]) => (
              <div
                key={title}
                data-reveal
                className="rounded-[18px] border border-line bg-surface-2 p-7 shadow-sm"
              >
                <Symbol
                  name={
                    title === "Excellence"
                      ? "certificate"
                      : title === "Innovation"
                        ? "bolt"
                        : "leaf"
                  }
                  className="size-10 text-brand"
                />
                <h3 className="mt-6 text-base font-semibold text-text-1">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-2">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sectors served ─────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[var(--tint-c)] to-[var(--tint-d)] section-space">
        <div className="site-container">
          <SectionHead
            center
            eyebrow="Sectors We Serve"
            title="Where our products"
            accent="go to work."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SECTORS.map(([title, copy]) => (
              <article
                key={title}
                data-reveal
                className="overflow-hidden rounded-[18px] bg-surface-2 shadow-sm"
              >
                <Ph className="aspect-[16/10] w-full" />
                <div className="p-6">
                  <h3 className="text-base font-semibold text-text-1">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-2">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
