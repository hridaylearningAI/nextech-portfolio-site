import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES } from "../nav";
import { Arrow, CtaBand, PageHero, Ph, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "Industries - Nextech General Trading",
  description:
    "Serving the Oil and Gas, Refinery and Power generation sectors across the UAE.",
};

const APPROACH = [
  ["Understand", "We start with your specification, schedule and site constraints."],
  ["Source", "We match the requirement against the principals we represent."],
  ["Verify", "Our engineers review every item before it leaves the supplier."],
  ["Deliver", "Consolidated logistics through to your site."],
];

export default function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Solutions for"
        accent="Every Critical Sector."
        copy="We proudly represent manufacturers from both upstream and downstream sectors, serving as a trusted partner in the dynamic world of energy and industry."
      />

      {/* ── Sector grid ────────────────────────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container">
          <SectionHead
            center
            eyebrow="Where We Work"
            title="Six sectors," accent="one standard."
            copy="We proudly represent manufacturers from both upstream and downstream sectors, serving as a trusted partner in the dynamic world of energy and industry."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map(([title, copy]) => (
              <article
                key={title}
                data-reveal
                className="overflow-hidden rounded-[18px] border border-line bg-surface-2 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative">
                  <Ph className="aspect-[16/10] w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 text-lg font-semibold text-white">
                    {title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-text-2">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we serve ───────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[var(--tint-c)] to-[var(--tint-d)] section-space">
        <div className="site-container">
          <SectionHead
            center
            eyebrow="How We Serve"
            title="A process built for" accent="critical schedules."
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map(([title, copy], i) => (
              <li
                key={title}
                data-reveal
                className="rounded-[18px] bg-surface-2 p-6 shadow-sm"
              >
                <span className="grid size-9 place-items-center rounded-full bg-brand text-sm font-semibold text-ink">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-sm font-semibold text-text-1">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-2">
                  {copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Divisions cross-link ───────────────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container grid items-center gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-2">
          <Ph data-reveal className="aspect-[4/3] w-full rounded-xl" />
          <div>
            <SectionHead
              eyebrow="Our Capabilities"
              title="Depth across the" accent="entire value chain."
              copy="Mechanical, Electrical and Instrumentation, supplied with the technical expertise of our principals."
            />
            <Link
              href="/products-services"
              className="mt-9 inline-flex items-center gap-3 btn bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark"
            >
              View Products &amp; Services <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
