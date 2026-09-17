import Link from "next/link";
import SectorCards from "./sector-cards";
import { Arrow } from "./ui";

/**
 * "Solutions for Every Industrial Sector": the six industry cards. Shared by the
 * home page and Who we are, so the two can never list different industries.
 *
 * `tinted` swaps the plain surface for the tinted band, for pages where a
 * plain section would otherwise run straight into another plain one.
 */
export default function IndustriesSection({
  tinted = false,
}: {
  tinted?: boolean;
}) {
  return (
    <section
      className={`${tinted ? "bg-gradient-to-b from-[var(--tint-c)] to-[var(--tint-d)]" : "bg-surface"} section-space`}
    >
      <div className="site-container">
        {/* Left header with the action on the same row, rather than another
            centred heading over a grid. */}
        <div
          data-reveal
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="max-w-xl text-4xl font-bold tracking-tight text-text-1">
              Solutions for{" "}
              <span className="text-brand">Every Industrial Sector</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-2">
              We proudly represent manufacturers from both upstream and
              downstream sectors, serving as a trusted partner in the dynamic
              world of energy and industry.
            </p>
          </div>
          <Link
            href="/industries-clients"
            className="inline-flex shrink-0 items-center gap-3 btn border border-line px-5 py-3 text-sm font-medium text-brand hover:border-brand"
          >
            All Industries <Arrow />
          </Link>
        </div>
        <SectorCards />
      </div>
    </section>
  );
}
