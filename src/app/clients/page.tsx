import type { Metadata } from "next";
import { CLIENTS } from "../nav";
import ReviewForm from "../review-form";
import { CtaBand, Photo, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "Clients - Nextech General Trading",
  description:
    "The operators, utilities and industrial groups who buy from Nextech General Trading.",
};

export default function IndustriesClients() {
  return (
    <>
      {/* ── Clients ────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[var(--tint-c)] to-[var(--tint-d)] section-space">
        <div className="site-container">
          <SectionHead
            center
            title="The companies who"
            accent="count on us."
            eyebrow="Our Clients"
          />
          {/*
            Monochrome until hovered. Gated behind (hover: hover) on purpose:
            a phone has no hover, so there the logos stay in full colour rather
            than being stuck grey forever.

            The tiles stay white in both themes: several of these marks are
            dark type with no light variant, and they would disappear against
            the dark surface.
          */}
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {CLIENTS.map(([name, logo]) => (
              <li
                key={name}
                data-reveal
                className="group grid aspect-[4/3] place-items-center overflow-hidden rounded-[18px] border border-line bg-white p-4 shadow-sm transition-[filter,opacity,border-color,box-shadow] duration-300 ease-out [@media(hover:hover)]:opacity-60 [@media(hover:hover)]:grayscale [@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:opacity-100 [@media(hover:hover)]:hover:shadow-md [@media(hover:hover)]:hover:grayscale-0"
              >
                {logo ? (
                  <Photo
                    src={`/logos/clients/${logo}.webp`}
                    alt={name}
                    fit="contain"
                    // Fills the tile and letterboxes inside it, so a tall mark
                    // cannot stretch its card past the others.
                    className="-m-4 size-[calc(100%+2rem)]"
                  />
                ) : (
                  // Awaiting artwork: the name holds the client's place rather
                  // than leaving an empty card in the wall.
                  <span className="text-center text-sm font-semibold text-ink">
                    {name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Testimonials form, below the logos ─────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container grid items-start gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-12">
          <div data-reveal className="lg:col-span-5">
            <SectionHead
              eyebrow="Testimonials"
              title="Worked with us?"
              accent="Tell us how it went."
              copy="Please rate us below. Nextech General Trading thanks you for accompanying us over the past years; let's grow together."
            />
          </div>
          <div
            data-reveal
            className="rounded-[18px] border border-line bg-surface-2 p-6 shadow-sm sm:p-8 lg:col-span-7"
          >
            <ReviewForm />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
