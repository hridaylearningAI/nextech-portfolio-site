"use client";

import { Symbol } from "./icons";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { COMPANY, NAV } from "./nav";
import MobileMenu from "./mobile-menu";
import ThemeToggle from "./theme-toggle";
import { Arrow, Logo } from "./ui";

export default function SiteHeader() {
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);

  // A tablet has no hover, so the dropdown opens on a tap and nothing ever
  // takes it back: the panel would still be sitting there on the next page, or
  // after a tap somewhere else. Close it on both.
  useEffect(() => {
    const closeAll = () =>
      nav.current
        ?.querySelectorAll<HTMLDetailsElement>("details[open]")
        .forEach((d) => (d.open = false));

    closeAll();
    const onOutside = (e: PointerEvent) => {
      if (!nav.current?.contains(e.target as Node)) closeAll();
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, [pathname]);

  const behindVideoHero = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line bg-surface/80 backdrop-blur-xl ${behindVideoHero ? "is-cloaked" : ""}`}
    >
      <div className="site-container flex h-20 items-center gap-5">
        <Link href="/" aria-label="Nextech General Trading, home">
          <Logo />
        </Link>

        <nav
          ref={nav}
          className="hidden flex-1 items-center justify-center gap-4 lg:flex"
        >
          {NAV.map((node) => {
            if ("children" in node) {
              const active = node.children.some(
                (child) => pathname === child.href,
              );

              return (
                <details
                  key={node.label}
                  className="group relative"
                  // Hover opens it for a mouse only. On a touch screen these
                  // fire as emulated events on a tap, which would fight the
                  // tap that <details> already handles.
                  onMouseEnter={(event) => {
                    if (matchMedia("(hover: hover)").matches) {
                      event.currentTarget.open = true;
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (matchMedia("(hover: hover)").matches) {
                      event.currentTarget.open = false;
                    }
                  }}
                >
                  <summary
                    className={`relative flex cursor-pointer list-none items-center gap-1.5 py-6 text-xs font-medium [&::-webkit-details-marker]:hidden ${
                      active ? "text-brand" : "text-text-1 hover:text-brand"
                    }`}
                  >
                    {node.label}
                    <Symbol
                      name="arrow"
                      className="size-3 rotate-90 transition-transform group-open:-rotate-90 [@media(hover:hover)]:group-hover:-rotate-90"
                    />
                    {active && (
                      <span className="absolute inset-x-0 bottom-4 h-0.5 rounded bg-brand" />
                    )}
                  </summary>
                  <div className="absolute top-full left-1/2 hidden min-w-44 -translate-x-1/2 rounded-xl border border-line bg-surface-2 p-2 shadow-xl group-focus-within:block group-open:block [@media(hover:hover)]:group-hover:block">
                    {node.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        aria-current={
                          pathname === child.href ? "page" : undefined
                        }
                        className={`block rounded-lg px-4 py-3 text-xs font-medium ${
                          pathname === child.href
                            ? "bg-[var(--tint-b)] text-brand"
                            : "text-text-1 hover:bg-[var(--tint-b)] hover:text-brand"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              );
            }

            const active = pathname === node.href;
            return (
              <Link
                key={node.href}
                href={node.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-6 text-xs font-medium ${
                  active ? "text-brand" : "text-text-1 hover:text-brand"
                }`}
              >
                {node.label}
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
            className="hidden items-center sm:inline-flex gap-2 btn bg-brand px-4 py-2.5 text-sm font-medium text-ink hover:bg-brand-dark"
          >
            Get a Quote <Arrow />
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
