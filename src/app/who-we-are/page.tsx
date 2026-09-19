import { Symbol, type IconName } from "../icons";
import { STATS } from "../nav";
import GlobalReach from "../global-reach";
import type { Metadata } from "next";
import Link from "next/link";
import IndustriesSection from "../industries-section";
import { Arrow, CtaBand, Eyebrow, Photo, SectionHead } from "../ui";
import VideoBanner from "./video-banner";

export const metadata: Metadata = {
  title: "Who We Are - Nextech General Trading",
  description:
    "Nextech General Trading delivers top-quality products and services to the Oil and Gas, Refinery, and Power generation sectors in the United Arab Emirates.",
};

const WHO_WE_ARE = [
  "Nextech General Trading is a reputable organization that delivers top-quality products and services to the Oil and Gas, Refinery, and Power generation sectors in the United Arab Emirates. Over the past decade, we have maintained consistent growth and successfully expanded our client base within the region.",
  "Our dedicated team of experienced engineers in sales and marketing, combined with the technical expertise provided by our principals, empowers our customers to overcome industry challenges. We offer innovative ideas and solutions that ensure the successful achievement of end objectives.",
  "We proudly represent manufacturers from both upstream and downstream sectors, serving as a trusted partner in the dynamic world of energy and industry. At Nextech General Trading, our commitment is to excellence, innovation, and sustainable solutions for a brighter energy future.",
];

const VALUES: [string, IconName][] = [
  ["Customer Centric", "user"],
  ["Social Commitment", "leaf"],
  ["Entrepreneurial Spirit", "trend"],
  ["Creative Teamwork", "team"],
];

/** The three headline credentials. `icon: null` marks the ICV pillar, which
 *  shows the certification mark itself instead of a glyph. */
const CREDENTIALS: [string, string, string, IconName | null][] = [
  [
    "Headquartered in",
    "Abu Dhabi, United Arab Emirates",
    "Strategically located to serve key markets efficiently.",
    "address",
  ],
  [
    "ICV Certified",
    "Supplier",
    "Committed to increasing local value and supporting United Arab Emirates objectives.",
    null,
  ],
  [
    "Turnkey",
    "Solutions",
    "End-to-end support from sourcing to delivery and beyond.",
    "handshake",
  ],
];

const WHY: [string, string, IconName][] = [
  [
    "Industry Leadership",
    "Over a decade of experience in the United Arab Emirates Oil, Gas, Petrochemical and Utilities sectors.",
    "chart",
  ],
  [
    "Strong Local Presence",
    "Strong local presence across the region for several years in various sectors, with excellent relationships with key contacts.",
    "team",
  ],
  [
    "Experienced & Dedicated Team",
    "Extensive experience in supplying products and services to various ADNOC fields, allowing our team to stay in constant contact with relevant site maintenance teams.",
    "user",
  ],
  [
    "Trusted Relationships",
    "Regular customer visits enable us to maintain close relationships with key persons. We also invite our business partners to the United Arab Emirates for joint business meetings, seminars, and technical presentations.",
    "handshake",
  ],
  [
    "Market Insight & Growth Focus",
    "West market and market intelligence keep us well informed about ADNOC market trends of potential projects and plans, helping our business partners plan and strategize effectively in the region.",
    "trend",
  ],
  [
    "Regulatory & Documentation Support",
    "Fast-track registration & prequalification support for manufacturers. We help and guide our principals in compiling documentation for ADNOC approvals in the quickest possible time frame.",
    "clipboard",
  ],
];

export default function WhoWeAre() {
  return (
    <>
      {/* The office tour is the page banner, behind the title. */}
      <VideoBanner
        eyebrow="Who we are"
        title="Built on Trust."
        accent="Driven by Excellence."
        copy="A trusted name in the world of Oil and Gas trading, based in the dynamic heart of the United Arab Emirates."
      />

      {/* ── Who we are ─────────────────────────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container grid items-center gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-2">
          <Photo
            src="/images/sourcing-story-generated.webp"
            alt="Illustrative technical sourcing desk with valve samples, a pressure gauge and engineering drawings"
            data-reveal
            className="aspect-[4/3] w-full rounded-xl"
          />
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
          {STATS.map(([value, label, icon]) => (
            <div
              key={label}
              data-reveal
              className="flex items-center gap-4 lg:px-6"
            >
              <Symbol name={icon} className="size-10 text-brand" />
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

      {/* ── Mission, Vision, Values ─────────────────────────────
          Mission and Vision are sentences, Values is a list of four, so they
          get different shapes rather than three identical cards: two
          statements on the left, the values as a panel on the right. */}
      <section className="bg-surface section-space">
        <div className="site-container grid gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-12">
          <div className="divide-y divide-line lg:col-span-7">
            {(
              [
                [
                  "Our Mission",
                  "target",
                  "To provide cost-effective, sustainable, and innovative solutions while maintaining the highest customer satisfaction.",
                ],
                [
                  "Our Vision",
                  "eye",
                  "To be a global leader in Oil and Gas trading, driving innovation and sustainable energy solutions.",
                ],
              ] as [string, IconName, string][]
            ).map(([label, icon, statement]) => (
              <div
                key={label}
                data-reveal
                className="flex gap-6 py-8 first:pt-0 last:pb-0"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full ring-1 ring-brand/40">
                  <Symbol name={icon} className="size-7 text-brand" />
                </span>
                <div>
                  <Eyebrow>{label}</Eyebrow>
                  <p className="mt-3 text-xl leading-snug font-semibold tracking-tight text-text-1 sm:text-2xl">
                    {statement}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="rounded-[18px] bg-gradient-to-br from-[var(--tint-a)] to-[var(--tint-c)] p-8 lg:col-span-5"
          >
            <div className="flex items-center gap-3">
              <Symbol name="diamond" className="size-7 text-brand" />
              <Eyebrow>Our Values</Eyebrow>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {VALUES.map(([value, icon]) => (
                <li
                  key={value}
                  className="flex items-center gap-4 rounded-xl bg-surface-2 px-5 py-4 shadow-sm"
                >
                  <Symbol name={icon} className="size-6 shrink-0 text-brand" />
                  <span className="text-base font-semibold text-text-1">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <GlobalReach />

      {/* ── Why Nextech: credentials, then the six reasons ───── */}
      <section className="bg-surface section-space">
        <div className="site-container">
          <ul className="grid overflow-hidden rounded-[18px] border border-line bg-surface-2 shadow-sm md:grid-cols-3 md:divide-x md:divide-line">
            {CREDENTIALS.map(([lead, headline, copy, icon]) => (
              <li
                key={headline}
                data-reveal
                className="flex flex-col items-center border-b border-line px-8 py-10 text-center last:border-b-0 md:border-b-0"
              >
                {icon ? (
                  <span className="grid h-20 place-items-center">
                    <Symbol name={icon} className="size-14 text-brand" />
                  </span>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/logos/icv.webp"
                    alt="In-Country Value (ICV) certified"
                    width={91}
                    height={80}
                    className="h-20 w-auto"
                  />
                )}
                <p className="mt-6 text-xs font-bold tracking-[0.12em] text-text-1 uppercase">
                  {lead}
                </p>
                <p className="mt-1 text-xl font-bold tracking-wide text-brand uppercase">
                  {headline}
                </p>
                <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-text-2">
                  {copy}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-20">
            <SectionHead
              center
              eyebrow="Why Nextech"
              title="Why"
              accent="Nextech"
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
        </div>
      </section>

      {/* ── Industries: the same section as the home page ──── */}
      <IndustriesSection tinted />

      <CtaBand />
    </>
  );
}
