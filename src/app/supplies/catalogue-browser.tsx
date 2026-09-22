"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Symbol } from "../icons";
import { slugify } from "../nav";
import { Photo } from "../ui";
import { divisionImage } from "../division-images";
import { CATALOGUE, type Category } from "./catalogue";

/** Categories longer than this start collapsed. Valves alone runs to 49. */
const PREVIEW = 12;

/**
 * The supplies catalogue: search across every product, jump between
 * divisions, and long lists that open on demand.
 *
 * Every product is in the server-rendered HTML whether a list is collapsed or
 * not, so search engines index the full catalogue. Collapsed items use the
 * hidden attribute rather than a visually-hidden class: a screen reader should
 * hear the same trimmed list a sighted visitor sees, not all 49 valves behind
 * a button that says "Show all". The search box covers finding anything.
 */
export default function CatalogueBrowser() {
  const [query, setQuery] = useState("");
  const searchId = useId();
  const q = query.trim().toLowerCase();

  const divisions = CATALOGUE.map((d) => ({
    ...d,
    categories: d.categories
      .map((c) => ({
        ...c,
        items: q ? c.items.filter((i) => i.toLowerCase().includes(q)) : c.items,
      }))
      .filter((c) => c.items.length > 0),
  })).filter((d) => d.categories.length > 0);

  const matches = divisions.reduce(
    (n, d) => n + d.categories.reduce((m, c) => m + c.items.length, 0),
    0,
  );

  return (
    <section className="bg-surface pb-[var(--section-space)]">
      {/* ── Toolbar: stays under the site header while browsing ─── */}
      <div className="sticky top-20 z-30 border-b border-line bg-surface/90 backdrop-blur-xl">
        <div className="site-container flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <label htmlFor={searchId} className="relative block md:w-80">
            <span className="sr-only">Search products</span>
            <Symbol
              name="search"
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-text-2"
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-full rounded-full border border-line bg-surface-2 py-2.5 pr-4 pl-10 text-sm text-text-1 placeholder:text-text-2 focus:border-brand"
            />
          </label>

          <nav
            aria-label="Divisions"
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:px-0 md:pb-0"
          >
            {CATALOGUE.map((d) => (
              <a
                key={d.title}
                href={`#${slugify(d.title)}`}
                className="shrink-0 rounded-full border border-line px-3.5 py-2 text-xs font-medium whitespace-nowrap text-text-1 transition-colors hover:border-brand hover:text-brand"
              >
                {d.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="site-container">
        {q ? (
          <p aria-live="polite" className="pt-8 text-xs text-text-2">
            {`${matches} ${matches === 1 ? "product matches" : "products match"} "${query.trim()}"`}
          </p>
        ) : null}

        {divisions.length === 0 && (
          <div className="mt-10 rounded-[18px] border border-line bg-surface-2 p-10 text-center">
            <p className="text-base font-semibold text-text-1">
              Nothing in the catalogue matches that.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-2">
              This list is not exhaustive. We source against the principals we
              represent, so tell us what you need and we will come back to you.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 btn bg-brand px-5 py-3 text-sm font-medium text-ink hover:bg-brand-dark"
            >
              Send an Enquiry
            </Link>
          </div>
        )}

        {divisions.map((d) => (
          <article
            key={d.title}
            id={slugify(d.title)}
            className="grid scroll-mt-44 gap-8 border-b border-line py-14 last:border-b-0 lg:grid-cols-12 lg:gap-12"
          >
            {/* Division header. Sticks alongside its own long lists. */}
            <header className="lg:col-span-4">
              <div className="lg:sticky lg:top-48">
                <Symbol name={d.icon} className="size-8 text-brand" />
                <h2 className="mt-4 text-2xl leading-tight font-bold tracking-tight text-text-1">
                  {d.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-2">
                  {d.intro}
                </p>
                <Photo
                  src={divisionImage(slugify(d.title))}
                  className="mt-6 hidden aspect-[4/3] w-full rounded-xl lg:block"
                />
              </div>
            </header>

            <div className="space-y-10 lg:col-span-8">
              {d.categories.map((c) => (
                <CategoryList
                  key={c.name}
                  category={c}
                  // A search result is the list the person asked for; never
                  // make them click again to see all of it.
                  forceOpen={Boolean(q)}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CategoryList({
  category,
  forceOpen,
}: {
  category: Category;
  forceOpen: boolean;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const long = category.items.length > PREVIEW;
  const expanded = forceOpen || open || !long;

  return (
    <div>
      <h3 className="border-b border-line pb-3 text-base font-semibold text-text-1">
        {category.name}
      </h3>

      <ul id={listId} className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {category.items.map((item, i) => (
          <li
            key={item}
            hidden={!expanded && i >= PREVIEW}
            className="flex gap-2.5 text-sm leading-snug text-text-2"
          >
            <span
              aria-hidden
              className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-brand"
            />
            {item}
          </li>
        ))}
      </ul>

      {long && !forceOpen && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className="mt-4 text-sm font-medium text-brand hover:text-brand-dark"
        >
          {open ? "Show fewer" : "Show all"}
        </button>
      )}
    </div>
  );
}
