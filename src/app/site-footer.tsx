import { Symbol, SOCIAL_ICONS } from "./icons";
import Link from "next/link";
import { COMPANY, DIVISIONS, INDUSTRIES, NAV, SOCIALS } from "./nav";
import { Arrow, Logo } from "./ui";

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
              {SOCIALS.map((n) => (
                <a
                  key={n}
                  href="#"
                  aria-label={n}
                  className="grid size-11 place-items-center"
                >
                  <Symbol name={SOCIAL_ICONS[n]} className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-1">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {NAV.filter(([, href]) => href !== "/").map(([label, href]) => (
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
                    href="/industries"
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
            <form className="mt-5 flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 w-full rounded-full border border-line px-4 py-2.5 text-xs text-text-1 placeholder:text-text-2"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid size-10 shrink-0 place-items-center btn bg-brand text-ink hover:bg-brand-dark"
              >
                <Arrow className="-rotate-45" />
              </button>
            </form>
            <h3 className="mt-8 text-sm font-semibold text-text-1">
              Divisions
            </h3>
            <ul className="mt-5 space-y-3">
              {DIVISIONS.map(([label]) => (
                <li key={label}>
                  <Link
                    href="/products-services"
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
