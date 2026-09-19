import { Symbol, SOCIAL_ICONS } from "../icons";
import type { Metadata } from "next";
import { COMPANY, SOCIALS } from "../nav";
import QuoteBanner from "../quote-banner";
import { Arrow, CtaBand, PageHero, Photo, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "Contact Us - Nextech General Trading",
  description:
    "Global Tower, Electra Street, Abu Dhabi. We answer all enquiries within 24 hours on business days.",
};

const DETAILS = [
  ["Phone", COMPANY.phone, COMPANY.phoneHref],
  ["Email", COMPANY.email, `mailto:${COMPANY.email}`],
  ["Website", COMPANY.site, null],
] as const;

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Build the"
        accent="Future Together."
        copy="Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days."
      />

      {/* ── Form + details ─────────────────────────────────── */}
      <section className="bg-surface section-space">
        <div className="site-container grid gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHead
              eyebrow="Drop a Line"
              title="Tell us what"
              accent="you need."
            />
            <p className="mt-4 text-sm leading-relaxed text-text-2">
              Your email address will not be published. Required fields are
              marked *
            </p>
            <form
              id="enquiry"
              data-reveal
              className="mt-8 grid gap-5 sm:grid-cols-2"
            >
              <label className="block">
                <span className="text-xs font-medium text-text-1">
                  Your name *
                </span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm text-text-1 placeholder:text-text-2 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-text-1">Email *</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm text-text-1 placeholder:text-text-2 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-medium text-text-1">
                  Your message *
                </span>
                <textarea
                  required
                  name="message"
                  rows={6}
                  placeholder="How can we help?"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm text-text-1 placeholder:text-text-2 focus:border-brand focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 btn bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark sm:w-fit"
              >
                Send Questions <Arrow />
              </button>
            </form>
          </div>

          <aside className="lg:col-span-2">
            <div
              data-reveal
              className="rounded-[18px] border border-line bg-gradient-to-b from-[var(--tint-d)] to-[var(--surface)] p-7 shadow-sm"
            >
              <h2 className="text-base font-semibold text-text-1">
                Let&apos;s Start a Project
              </h2>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4">
                  <Symbol name="address" className="mt-0.5 size-9 text-brand" />
                  <div>
                    <div className="text-xs font-medium text-text-2">
                      Address
                    </div>
                    <address className="text-sm leading-relaxed font-medium text-text-1 not-italic">
                      {COMPANY.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>
                {DETAILS.map(([label, value, href]) => (
                  <li key={label} className="flex items-start gap-4">
                    <Symbol
                      name={
                        label === "Phone"
                          ? "phone"
                          : label === "Email"
                            ? "email"
                            : "website"
                      }
                      className="mt-0.5 size-9 text-brand"
                    />
                    <div>
                      <div className="text-xs font-medium text-text-2">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium text-text-1 hover:text-brand"
                        >
                          {value}
                        </a>
                      ) : (
                        <div className="text-sm font-medium text-text-1">
                          {value}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-4">
                  <Symbol name="clock" className="mt-0.5 size-9 text-brand" />
                  <div>
                    <div className="text-xs font-medium text-text-2">
                      Working time
                    </div>
                    <div className="text-sm font-medium text-text-1">
                      {COMPANY.hours.map((h) => (
                        <span key={h} className="block">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-7 border-t border-line pt-6">
                <div className="text-xs font-medium text-text-2">Follow us</div>
                <div className="mt-3 flex gap-3">
                  {SOCIALS.map((n) => (
                    <a
                      key={n}
                      href="#"
                      aria-label={n}
                      className="grid size-11 place-items-center rounded-md text-brand"
                    >
                      <Symbol name={SOCIAL_ICONS[n]} className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Quote call to action: between the form and the map,
          so it never sits back to back with the teal closing band ── */}
      <section className="bg-surface pb-16">
        <div className="site-container">
          <QuoteBanner href="#enquiry" />
        </div>
      </section>

      {/* ── Map ────────────────────────────────────────────── */}
      <section className="bg-surface pb-20">
        <div className="site-container">
          <Photo
            src="/images/abu-dhabi-illustration-generated.webp"
            alt="Architectural illustration inspired by Abu Dhabi's waterfront and Etihad Towers"
            data-reveal
            className="h-[200px] w-full rounded-xl sm:h-[280px] lg:h-[360px]"
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
