"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Symbol } from "./icons";
import { COMPANY, NAV } from "./nav";
import { Arrow, Logo } from "./ui";

/**
 * Hamburger menu for screens below lg, where the header has no room for links.
 *
 * A native <dialog> opened with showModal(): it renders in the top layer, so
 * the header's backdrop-filter (which traps position:fixed children) does not
 * clip it, and Escape, focus containment and an inert page come for free.
 */
export default function MobileMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;

    // Close on a link tap. Listens on window in the capture phase because
    // page-transition.tsx stops link clicks at document before React sees
    // them, and the menu must be gone before the transition cover rises.
    const onClick = (e: MouseEvent) => {
      if (
        el.open &&
        (e.target as Element).closest?.("a") &&
        el.contains(e.target as Node)
      ) {
        el.close();
      }
    };
    // Lock page scroll while open.
    const onToggle = () => {
      document.documentElement.style.overflow = el.open ? "hidden" : "";
    };
    // Rotating a tablet past lg would leave a menu for links now in the header.
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && el.close();

    window.addEventListener("click", onClick, true);
    el.addEventListener("close", onToggle);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("click", onClick, true);
      el.removeEventListener("close", onToggle);
      wide.removeEventListener("change", onWide);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const open = () => {
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };

  const linkClass = (href: string) =>
    `flex items-center justify-between border-b border-line py-4 text-lg font-semibold ${
      pathname === href ? "text-brand" : "text-text-1"
    }`;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="grid size-11 shrink-0 place-items-center rounded text-text-1 hover:text-brand lg:hidden"
      >
        <ListIcon size={24} aria-hidden="true" />
      </button>

      <dialog
        ref={dialog}
        aria-label="Site menu"
        // Clicking the backdrop lands on the dialog element itself.
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm translate-x-full bg-surface text-text-1 transition-[translate,overlay,display] transition-discrete duration-300 ease-out backdrop:bg-black/50 open:translate-x-0 starting:open:translate-x-full"
      >
        <div className="flex h-full flex-col px-6 pb-8">
          <div className="flex h-20 shrink-0 items-center justify-between">
            <Link href="/" aria-label="Nextech General Trading, home">
              <Logo />
            </Link>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close menu"
              className="-mr-2 grid size-11 place-items-center rounded text-text-1 hover:text-brand"
            >
              <XIcon size={24} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Main" className="mt-4 flex-1 overflow-y-auto">
            {NAV.map((node) =>
              "children" in node ? (
                <details key={node.label} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-semibold text-text-1 [&::-webkit-details-marker]:hidden">
                    {node.label}
                    <Arrow className="rotate-90 transition-transform group-open:-rotate-90" />
                  </summary>
                  <div className="pb-2 pl-4">
                    {node.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        aria-current={
                          pathname === child.href ? "page" : undefined
                        }
                        className={`${linkClass(child.href)} last:border-b-0`}
                      >
                        {child.label}
                        <Arrow />
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={node.href}
                  href={node.href}
                  aria-current={pathname === node.href ? "page" : undefined}
                  className={linkClass(node.href)}
                >
                  {node.label}
                  <Arrow />
                </Link>
              ),
            )}
          </nav>

          <div className="mt-6 shrink-0 space-y-4">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-2 text-sm font-medium text-text-1"
            >
              <Symbol name="phone" className="size-4 text-brand" />
              {COMPANY.phone}
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 btn bg-brand px-4 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark"
            >
              Get a Quote <Arrow />
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
