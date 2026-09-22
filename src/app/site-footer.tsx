import { Symbol, SOCIAL_ICONS } from "./icons";
import Link from "next/link";
import NewsletterForm from "./newsletter-form";
import { COMPANY, DIVISIONS, INDUSTRIES, NAV_FLAT, SOCIALS } from "./nav";
import { Logo } from "./ui";

export default function SiteFooter() {
  return (
    <footer className="bg-surface pt-16">
      <div className="site-container">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Logo />
            <p className="mt-5 max-w-[15rem] text-xs leading-relaxed text-text-2">
              {COMPANY.blurb}
            </p>
            <div className="mt-5 flex gap-1">
              {SOCIALS.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="grid size-11 place-items-center"
                >
                  <Symbol name={SOCIAL_ICONS[name]} className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-1">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {NAV_FLAT.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-text-2 hover:text-brand"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-1">Industries</h3>
            <ul className="mt-5 space-y-3">
              {INDUSTRIES.map(([label]) => (
                <li key={label}>
                  <Link
                    href="/clients"
                    className="text-xs text-text-2 hover:text-brand"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-1">Contact Us</h3>
            <ul className="mt-5 space-y-4 text-xs text-text-2">
              <li className="flex items-start gap-3">
                <Symbol name="phone" className="mt-0.5 size-4" />
                <a href={COMPANY.phoneHref} className="hover:text-brand">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Symbol name="email" className="mt-0.5 size-4" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-brand"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Symbol name="address" className="mt-0.5 size-4" />
                <address className="leading-relaxed not-italic">
                  {COMPANY.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-1">Newsletter</h3>
            <p className="mt-5 text-xs leading-relaxed text-text-2">
              Subscribe to our Newsletter &amp; Event right now to be updated.
            </p>
            <NewsletterForm />
            <h3 className="mt-8 text-sm font-semibold text-text-1">
              Product Divisions
            </h3>
            <ul className="mt-5 space-y-3">
              {DIVISIONS.map(([label]) => (
                <li key={label}>
                  <Link
                    href="/supplies"
                    className="text-xs text-text-2 hover:text-brand"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-xs text-text-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Nextech General Trading LLC. All Rights Reserved.</p>
          <p className="flex items-center gap-3">
            <Link href="/terms" className="hover:text-brand">
              Terms of Service
            </Link>
            <span className="text-text-2/50">|</span>
            <Link href="/privacy" className="hover:text-brand">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
