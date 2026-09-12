import type { Metadata } from "next";
import { CLIENTS } from "../nav";
import { CtaBand, PageHero, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "Clients — Nextech General Trading",
  description:
    "ADNOC, Borouge, Shell, Total, ENOC, Emirates Steel and more across the UAE energy sector.",
};

export default function Clients() {
  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Trusted by Industry"
        accent="Leaders Worldwide."
        copy="Over the past decade we have maintained consistent growth and successfully expanded our client base within the region."
      />

      {/* ── Logo wall + testimonials form ──────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container grid gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHead eyebrow="Our Clients" title="The companies who" accent="count on us." />
            <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {CLIENTS.map((name) => (
                <li
                  key={name}
                  data-reveal
                  className="grid aspect-[4/3] place-items-center rounded-[18px] border border-line p-3 shadow-sm transition-colors hover:border-brand"
                >
                  <span className="text-center text-xs font-semibold text-text-2">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <div
              data-reveal
              className="overflow-hidden rounded-[18px] border border-line shadow-sm"
            >
              <div className="bg-brand px-6 py-4">
                <h2 className="text-base font-semibold text-ink">
                  Testimonials Form
                </h2>
              </div>
              <div className="bg-surface-2 p-6">
                <p className="text-sm leading-relaxed text-text-2">
                  Please rate us on the table below, Nextech General Trading
                  thank you for accompanying us over the past time, let&apos;s
                  grow together.
                </p>
                <form className="mt-6 space-y-4">
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
                    I agree that Nextech will collect my name and email
                    information
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
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
