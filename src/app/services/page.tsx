import { Symbol } from "../icons";
import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, slugify } from "../nav";
import { Arrow, CtaBand, PageHero, Photo, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "Services - Nextech General Trading",
  description:
    "Civil and mechanical works, electrical and power systems, instrumentation and control, engineering, consultancy and project management across the United Arab Emirates.",
};

const PROCESS = [
  [
    "Understand",
    "We start with your specification, your schedule and the constraints of your site.",
    "handshake",
  ],
  [
    "Source",
    "We match the requirement against the principals we represent, not against whatever is in stock.",
    "globe",
  ],
  [
    "Verify",
    "Our engineers review every item against the specification before it leaves the supplier.",
    "certificate",
  ],
  [
    "Deliver",
    "Consolidated logistics through to your site, with one point of contact throughout.",
    "ship",
  ],
] as const;

const WHY = [
  ["Technical Expertise", "Engineers who understand the specification."],
  ["Trusted Principals", "Manufacturers we directly represent."],
  ["Regional Reach", "A decade of delivery across the United Arab Emirates."],
  ["End Objectives", "Solutions measured by your outcome."],
];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Integrated supply."
        accent="Expertise at every stage."
        copy="Specification support, sourcing against the principals we represent, inspection before dispatch and consolidated delivery to site."
      />

      {/* ── The six services, one photograph each ─────────── */}
      <section className="bg-surface section-space">
        <div className="site-container">
          <SectionHead
            center
            eyebrow="What We Do"
            title="Services &"
            accent="Solutions"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(([title, copy, icon]) => (
              <article
                key={title}
                data-reveal
                className="group overflow-hidden rounded-[18px] border border-line bg-surface-2 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  {/* Swap for the service photograph. The scale on hover
                      only reads once there is a real image in the slot. */}
                  <Photo
                    src={`/images/services/${slugify(title)}${title === "Instrumentation & Control" ? "-generated" : ""}.webp`}
                    className="aspect-[4/3] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-4 left-4 grid size-11 place-items-center rounded-lg bg-surface-2 shadow-sm">
                    <Symbol name={icon} className="size-5 text-brand" />
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-lg leading-tight font-semibold text-text-1">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-2">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work: a numbered rail, not another card grid ── */}
      <section className="bg-gradient-to-b from-[var(--tint-c)] to-[var(--tint-d)] section-space">
        <div className="site-container">
          <SectionHead
            eyebrow="How We Work"
            title="A process built for"
            accent="critical schedules."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[18px] bg-line md:grid-cols-2">
            {PROCESS.map(([title, copy, icon], i) => (
              <li
                key={title}
                data-reveal
                className="flex gap-5 bg-surface-2 p-7"
              >
                <div className="flex flex-col items-center gap-3">
                  <Symbol name={icon} className="size-7 shrink-0 text-brand" />
                  <span className="text-xs font-semibold tracking-wider text-text-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-text-1">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-2">
                    {copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Why Nextech ────────────────────────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container grid items-center gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-2">
          <Photo
            src="/images/inspection-generated.webp"
            alt="Illustrative scene of a technician measuring an industrial valve flange before dispatch"
            data-reveal
            className="aspect-[4/3] w-full rounded-xl"
          />
          <div>
            <SectionHead
              eyebrow="Why Nextech"
              title="Innovative ideas,"
              accent="delivered end to end."
            />
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {WHY.map(([title, copy]) => (
                <div key={title} data-reveal className="py-4">
                  <dt className="text-sm font-semibold text-text-1">{title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-text-2">
                    {copy}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/supplies"
              className="mt-8 inline-flex items-center gap-3 btn bg-brand px-5 py-3 text-sm font-medium text-ink hover:bg-brand-dark"
            >
              Browse What We Supply <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
