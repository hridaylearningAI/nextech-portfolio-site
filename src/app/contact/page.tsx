import { Symbol, SOCIAL_ICONS } from "../icons";
import type { Metadata } from "next";
import ContactForm from "../contact-form";
import { COMPANY, SOCIALS } from "../nav";
import QuoteBanner from "../quote-banner";
import { CtaBand, SectionHead } from "../ui";

export const metadata: Metadata = {
  title: "Contact Us - Nextech Energy Development",
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
      {/* ── Form + details: opens the page now the banner is gone ── */}
      <section className="bg-surface pt-12 pb-[var(--section-space)] sm:pt-16">
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
            <ContactForm />
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
                  <Symbol
                    name="address"
                    className="mt-0.5 size-9 text-text-1"
                  />
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
                      className="mt-0.5 size-9 text-text-1"
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
                  <Symbol name="clock" className="mt-0.5 size-9 text-text-1" />
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
                  {SOCIALS.map(({ name, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="grid size-11 place-items-center rounded-md text-text-1 hover:text-brand"
                    >
                      <Symbol name={SOCIAL_ICONS[name]} className="size-5" />
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
          <QuoteBanner />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
