"use client";

import { Symbol } from "./icons";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY, NAV } from "./nav";
import ThemeToggle from "./theme-toggle";
import { Arrow, Logo } from "./ui";

export default function SiteHeader() {
  const pathname = usePathname();

  const behindVideoHero = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line bg-surface/80 backdrop-blur-xl ${behindVideoHero ? "is-cloaked" : ""}`}
    >
      <div className="site-container flex h-20 items-center gap-5">
        <Link href="/" aria-label="Nextech General Trading — home">
          <Logo />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-4 lg:flex">
          {NAV.map(([label, href]) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative py-6 text-xs font-medium ${
                  active ? "text-brand" : "text-text-1 hover:text-brand"
                }`}
              >
                {label}
                {active && (
                  <span className="absolute inset-x-0 bottom-4 h-0.5 rounded bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <a
            href={COMPANY.phoneHref}
            className="hidden items-center gap-2 text-sm font-medium text-text-1 2xl:flex"
          >
            <Symbol name="phone" className="size-4" />
            {COMPANY.phone}
          </a>
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 btn bg-brand px-4 py-2.5 text-sm font-medium text-ink hover:bg-brand-dark"
          >
            Get a Quote <Arrow />
          </Link>
        </div>
      </div>
    </header>
  );
}
