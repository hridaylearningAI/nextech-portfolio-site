import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, CtaBand, PageHero, Ph, SectionHead } from "../ui";
import CatalogueBrowser from "./catalogue-browser";

export const metadata: Metadata = {
  title: "Supplies - Nextech General Trading",
  description:
    "Valves, piping, pumps, electrical equipment, instrumentation, heat transfer and process packages, chemicals and safety equipment for the UAE energy sector.",
};

export default function Supplies() {
  return (
    <>
      <PageHero
        eyebrow="Supplies"
        title="Five Divisions,"
        accent="One Standard."
        copy="Everything we stock and source, grouped the way our engineers and principals work. Search the catalogue or jump straight to a division."
      />

      <CatalogueBrowser />

      {/* ── Principals ─────────────────────────────────────── */}
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
              href="/services"
              className="mt-8 inline-flex items-center gap-3 btn bg-brand px-5 py-3 text-sm font-medium text-ink hover:bg-brand-dark"
            >
              See Our Services <Arrow />
            </Link>
          </div>
          <Ph data-reveal className="aspect-[4/3] w-full rounded-xl" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
