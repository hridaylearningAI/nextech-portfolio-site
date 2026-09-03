import Link from "next/link";

/**
 * Lined stand-in for artwork that gets swapped for a real image later.
 * Passes the rest through so callers can tag it with data-parallax etc.
 */
export function Ph({ className = "", ...rest }: React.ComponentProps<"div">) {
  return <div {...rest} className={`ph ${className}`} aria-hidden />;
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 shrink-0 ${className}`}
      aria-hidden
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="text-2xl font-bold tracking-tight text-text-1">
        Nex<span className="text-brand">tech</span>
      </div>
      <div className="text-[11px] font-medium tracking-wide text-brand">
        General Trading
      </div>
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
      {children}
    </p>
  );
}

/** Section heading: eyebrow, then a title whose tail is set in the brand colour. */
export function SectionHead({
  eyebrow,
  title,
  accent,
  copy,
  center = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  copy?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div data-reveal className={`${center ? "text-center" : ""} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-text-1 sm:text-4xl">
        {title} {accent && <span className="text-brand">{accent}</span>}
      </h2>
      {copy && (
        <p
          className={`mt-4 text-sm leading-relaxed text-text-2 ${
            center ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

/** Banner every internal page opens with. */
export function PageHero({
  eyebrow,
  title,
  accent,
  copy,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--tint-a)] to-[var(--tint-b)]">
      <Ph
        data-parallax
        className="absolute inset-y-0 right-0 hidden w-2/5 opacity-70 [mask-image:linear-gradient(to_right,transparent,black_40%)] lg:block"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <nav data-intro className="mb-6 flex items-center gap-2 text-xs text-text-2">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <span className="text-text-2/50">/</span>
          <span className="font-medium text-text-1">{eyebrow}</span>
        </nav>
        <div data-intro>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1
          data-intro
          className="mt-4 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-text-1 sm:text-5xl"
        >
          {title} <span className="text-brand">{accent}</span>
        </h1>
        <p
          data-intro
          className="mt-6 max-w-lg text-base leading-relaxed text-text-2"
        >
          {copy}
        </p>
      </div>
    </section>
  );
}

/** Accent band that closes every page. */
export function CtaBand() {
  return (
    <section className="bg-surface pt-16">
      <div className="mx-auto max-w-7xl px-6">
        <div
          data-reveal
          className="flex flex-col gap-6 rounded-[18px] bg-brand px-8 py-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold text-ink">
              Let&apos;s build the future together
            </h2>
            <p className="mt-2 text-sm text-ink/75">
              Partner with Nextech General Trading for reliable solutions
              tailored to your business needs.
            </p>
          </div>
          <form className="flex w-full gap-3 md:w-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="w-full rounded-full bg-surface-2 px-5 py-3 text-sm text-text-1 placeholder:text-text-2 md:w-64"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-2 btn bg-ink px-5 py-3 text-sm font-medium text-white"
            >
              Get Updates <Arrow />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export type LegalSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

/**
 * Shared body for the Terms and Privacy pages — same markup either side, only
 * the copy differs. Sections are numbered from the array so inserting a clause
 * never leaves the numbering stale.
 */
export function LegalBody({
  updated,
  intro,
  sections,
}: {
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p data-reveal className="text-xs font-medium text-text-2">
          Last updated: {updated}
        </p>
        <p data-reveal className="mt-4 text-base leading-relaxed text-text-1">
          {intro}
        </p>

        <div className="mt-12 space-y-12">
          {sections.map(({ heading, body, bullets }, i) => (
            <section key={heading} data-reveal>
              <h2 className="text-lg font-semibold text-text-1">
                <span className="text-brand">{i + 1}.</span> {heading}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-text-2">
                {body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              {bullets && (
                <ul className="mt-4 space-y-2.5">
                  {bullets.map((b) => (
                    <li
                      key={b.slice(0, 40)}
                      className="flex gap-3 text-sm leading-relaxed text-text-2"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
