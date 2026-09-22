import Link from "next/link";
import { ICONS, Icon } from "./icons";
import { Arrow, Eyebrow, Photo } from "./ui";

const FEATURES: [React.ReactNode, string, string][] = [
  [ICONS.globe, "Global Reach", "Local Expertise"],
  [ICONS.users, "Trusted by", "Leading Clients"],
  [ICONS.shield, "Sustainable", "Growth Focus"],
  [ICONS.cog, "Reliable Supply", "Chain Solutions"],
];

export default function AboutIntro() {
  return (
    <section className="bg-surface-2 pt-16 pb-[var(--section-space)] sm:pt-20">
      <div className="site-container grid gap-12 lg:grid-cols-12 lg:gap-0">
        <div data-reveal className="relative lg:col-span-5">
          <Photo
            src="/images/supply-partnership-generated.webp"
            alt="Illustrative scene of two professionals reviewing industrial equipment for supply"
            className="aspect-[3/2] w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
          <div className="absolute top-1/3 left-0 flex items-stretch gap-4 pl-6 sm:pl-8">
            <span className="w-px shrink-0 bg-white/35" />
            <p className="text-[10px] font-semibold uppercase leading-[2] tracking-[0.22em] text-white sm:text-[11px]">
              Global
              <br />
              Partnerships
              <br />
              Local Impact
            </p>
          </div>
          <figure className="absolute right-0 bottom-0 w-[min(19rem,86%)] translate-y-6 bg-ink p-6 shadow-xl ring-1 ring-white/10 sm:right-6">
            <blockquote className="text-base leading-relaxed text-white italic">
              <span className="text-brand not-italic">&ldquo;</span> We
              don&apos;t just supply products. We build possibilities.{" "}
              <span className="text-brand not-italic">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-5 text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase">
              Nextech General Trading
            </figcaption>
          </figure>
        </div>
        <div data-reveal className="lg:col-span-4 lg:px-8">
          <Eyebrow>About Nextech</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-text-1 sm:text-3xl">
            A Trusted Partner
            <br />
            for a Stronger Tomorrow
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-text-2">
            Nextech General Trading is at the heart of the United Arab Emirates,
            connecting global industries with reliable solutions. We are driven
            by a commitment to quality, sustainability and long-term
            partnerships that support progress across energy, infrastructure and
            industrial development.
          </p>
          <Link
            href="/who-we-are"
            className="mt-8 inline-flex items-center gap-3 btn bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark"
          >
            Our Story <Arrow />
          </Link>
        </div>
        <ul className="lg:col-span-3 lg:border-l lg:border-line lg:pl-10">
          {FEATURES.map(([icon, line1, line2], i) => (
            <li
              key={line1}
              data-reveal
              className={`flex items-center gap-4 py-5 ${i > 0 ? "border-t border-line" : "lg:pt-0"}`}
            >
              <Icon className="size-7 text-brand">{icon}</Icon>
              <p className="text-sm leading-snug text-text-1">
                {line1}
                <br />
                {line2}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
