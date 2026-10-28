import { Symbol } from "../icons";
import type { Metadata } from "next";
import { SERVICES, slugify } from "../nav";
import { CtaBand, Photo, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Civil and mechanical works, electrical and power systems, instrumentation and control, engineering, consultancy and project management across the United Arab Emirates.",
};

export default function Services() {
  return (
    <>
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
                    <Symbol name={icon} className="size-5 text-text-1" />
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

      <CtaBand />
    </>
  );
}
