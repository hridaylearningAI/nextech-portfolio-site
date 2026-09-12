import { Symbol } from "../icons";
import type { Metadata } from "next";
import Link from "next/link";
import { DIVISIONS } from "../nav";
import { Arrow, CtaBand, PageHero, Ph, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "Products & Services — Nextech General Trading",
  description:
    "Mechanical, Electrical and Instrumentation products and services for the UAE energy sector.",
};

const WHY = [
  ["Technical Expertise", "Engineers who understand the specification."],
  ["Trusted Principals", "Manufacturers we directly represent."],
  ["Regional Reach", "A decade of delivery across the UAE."],
  ["End Objectives", "Solutions measured by your outcome."],
];

export default function ProductsServices() {
  return (
    <>
      <PageHero
        eyebrow="Products & Services"
        title="Delivering Excellence"
        accent="Across the Value Chain."
        copy="Mechanical, Electrical and Instrumentation — supplied with the technical expertise provided by our principals."
      />

      {/* ── Three divisions ────────────────────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container">
          <SectionHead
            center
            eyebrow="Our Divisions"
            title="Three divisions,"
            accent="one standard."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {DIVISIONS.map(([title, copy]) => (
              <article
                key={title}
                data-reveal
                className="overflow-hidden rounded-[18px] border border-line bg-surface-2 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative">
                  <Ph className="aspect-[4/3] w-full" />
                  <span className="absolute top-4 left-4 grid size-11 place-items-center rounded-lg bg-surface-2 shadow-sm">
                    <Symbol
                      name={
                        title === "Electrical"
                          ? "bolt"
                          : title === "Mechanical"
                            ? "cog"
                            : "clock"
                      }
                      className="size-5 text-brand"
                    />
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-text-1">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-2">
                    {copy}
                  </p>
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark"
                  >
                    Read More <Arrow />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our principals ─────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[var(--tint-c)] to-[var(--tint-d)] section-space">
        <div className="site-container grid items-center gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="Our Principals"
              title="Representing manufacturers"
              accent="upstream and downstream."
              copy="Our dedicated team of experienced engineers in sales and marketing, combined with the technical expertise provided by our principals, empowers our customers to overcome industry challenges."
            />
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 btn bg-brand px-5 py-3 text-sm font-medium text-ink hover:bg-brand-dark"
            >
              Request a Quote <Arrow />
            </Link>
          </div>
          <Ph data-reveal className="aspect-[4/3] w-full rounded-xl" />
        </div>
      </section>

      {/* ── Why Nextech ────────────────────────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container">
          <SectionHead
            center
            eyebrow="Why Nextech"
            title="Innovative ideas,"
            accent="delivered end to end."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(([title, copy]) => (
              <div
                key={title}
                data-reveal
                className="rounded-[18px] border border-line bg-surface-2 p-6 shadow-sm"
              >
                <Symbol
                  name={
                    title === "Technical Expertise"
                      ? "cog"
                      : title === "Trusted Principals"
                        ? "handshake"
                        : title === "Regional Reach"
                          ? "globe"
                          : "shield"
                  }
                  className="size-10 text-brand"
                />
                <h3 className="mt-6 text-sm font-semibold text-text-1">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-2">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
