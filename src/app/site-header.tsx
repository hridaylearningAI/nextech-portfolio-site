"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY, NAV } from "./nav";
import ThemeToggle from "./theme-toggle";
import { Arrow, Logo, Ph } from "./ui";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-8 px-6">
        <Link href="/" aria-label="Nextech General Trading — home">
          <Logo />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {NAV.map(([label, href]) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative py-6 text-sm font-medium ${
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
            className="hidden items-center gap-2 text-sm font-medium text-text-1 md:flex"
          >
            <Ph className="size-4 rounded-full" />
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
