import type { Metadata } from "next";
import CareersForm from "../careers-form";
import { CtaBand, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "Careers - Nextech Energy",
  description:
    "Join Nextech Energy in Abu Dhabi. Sales, technical, procurement and project roles supplying the United Arab Emirates energy sector.",
};

export default function Careers() {
  return (
    <>
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
            />
            <p className="mt-6 text-sm leading-relaxed text-text-2">
              Interested in joining Nextech? Submit your CV to be considered for
              current and future career opportunities. Alternatively, you may
              simply complete our application form to share your details and
              qualifications with us.
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
