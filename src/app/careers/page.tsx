import type { Metadata } from "next";
import CareersForm from "../careers-form";
import { Symbol, type IconName } from "../icons";
import { CtaBand, PageHero, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "Careers - Nextech General Trading",
  description:
    "Join Nextech General Trading in Abu Dhabi. Sales, technical, procurement and project roles supplying the United Arab Emirates energy sector.",
};

/** What the work is actually like here, in plain terms. */
const WHY: [string, string, IconName][] = [
  [
    "Work that reaches the field",
    "What we supply ends up in operating plant across the Emirates, not in a catalogue.",
    "rig",
  ],
  [
    "Technical depth",
    "You will learn specifications, approvals and the principals behind them from engineers who know them well.",
    "gauge",
  ],
  [
    "A small, senior team",
    "Few layers, direct responsibility, and your work visible to the whole company.",
    "team",
  ],
  [
    "Based in Abu Dhabi",
    "Close to the operators we serve, with travel across the region as projects require.",
    "address",
  ],
];

export default function Careers() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career"
        accent="where it counts."
        copy="We are always interested in people who know the energy supply chain, or who want to learn it properly. Tell us where you fit."
      />

      {/* ── Why join ───────────────────────────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container">
          <SectionHead
            eyebrow="Life at Nextech"
            title="A decade of supply,"
            accent="built by a small team."
            copy="Nextech General Trading supplies the Oil and Gas, Refinery and Power generation sectors across the United Arab Emirates. The team behind it stays deliberately lean, which means real responsibility early."
          />
          <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
            {WHY.map(([title, copy, icon]) => (
              <li
                key={title}
                data-reveal
                className="flex gap-5 border-b border-line py-7"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full ring-1 ring-brand/40">
                  <Symbol name={icon} className="size-7 text-brand" />
                </span>
                <div>
                  <h3 className="text-sm font-bold tracking-[0.06em] text-text-1 uppercase">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-2">
                    {copy}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Application form ───────────────────────────────── */}
      <section
        id="apply"
        className="bg-gradient-to-b from-[var(--tint-d)] to-[var(--surface)] section-space"
      >
        <div className="site-container grid items-start gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-12">
          <div data-reveal className="lg:col-span-5">
            <SectionHead
              eyebrow="Apply"
              title="Send us your"
              accent="details."
              copy="We keep applications on file and come back to them when a role opens in your area. There is no closing date."
            />
            <p className="mt-6 text-sm leading-relaxed text-text-2">
              Share a link to your CV if you have one to hand. If not, submit
              the form and reply to the confirmation email with your CV attached
              — it reaches the same team.
            </p>
          </div>
          <div
            data-reveal
            className="rounded-[18px] border border-line bg-surface-2 p-6 shadow-sm sm:p-8 lg:col-span-7"
          >
            <CareersForm />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
