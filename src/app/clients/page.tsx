import type { Metadata } from "next";
import { CLIENTS, slugify } from "../nav";
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
            {CLIENTS.map((name) => (
              <li
                key={name}
                data-reveal
                className="group grid aspect-[4/3] place-items-center overflow-hidden rounded-[18px] border border-line bg-white shadow-sm transition-[filter,opacity,border-color,box-shadow] duration-300 ease-out [@media(hover:hover)]:opacity-60 [@media(hover:hover)]:grayscale [@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:opacity-100 [@media(hover:hover)]:hover:shadow-md [@media(hover:hover)]:hover:grayscale-0"
              >
                <Photo
                  src={`/logos/clients/${slugify(name)}.webp`}
                  alt={name}
                  fit="contain"
                  // Fills the tile and letterboxes inside it, so a tall mark
                  // cannot stretch its card past the others.
                  className="size-full"
                />
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
            <form className="space-y-4">
              {[
                ["Your Name*", "name", true],
                ["Email*", "email", true],
                ["Company Name", "company", false],
                ["Heading", "heading", false],
              ].map(([label, name, required]) => (
                <input
                  key={name as string}
                  name={name as string}
                  required={required as boolean}
                  type={name === "email" ? "email" : "text"}
                  placeholder={label as string}
                  aria-label={label as string}
                  className="w-full rounded-xl border border-line px-4 py-3 text-sm text-text-1 placeholder:text-text-2 focus:border-brand focus:outline-none"
                />
              ))}
              <textarea
                required
                name="review"
                rows={5}
                placeholder="Write here*"
                aria-label="Write here"
                className="w-full rounded-xl border border-line px-4 py-3 text-sm text-text-1 placeholder:text-text-2 focus:border-brand focus:outline-none"
              />
              <label className="flex items-start gap-3 text-xs leading-relaxed text-text-2">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 size-4 shrink-0 accent-[#02c1b3]"
                />
                I agree that Nextech will collect my name and email information
              </label>
              <button
                type="submit"
                className="w-full btn bg-brand px-5 py-3 text-sm font-medium text-ink hover:bg-brand-dark"
              >
                Send Review
              </button>
            </form>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
