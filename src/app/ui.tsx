import { Symbol } from "./icons";
import Link from "next/link";
import NewsletterForm from "./newsletter-form";

/**
 * Lined stand-in for artwork that gets swapped for a real image later.
 * Passes the rest through so callers can tag it with data-parallax etc.
 */
export function Ph({ className = "", ...rest }: React.ComponentProps<"div">) {
  return <div {...rest} className={`ph ${className}`} aria-hidden />;
}

/**
 * A photograph in a slot that used to hold a Ph: same className API, so the
 * positioning, masks and aspect ratios around it are unchanged. It always
 * crops to fill, because every slot on the site is a fixed shape.
 *
 * Plain <img> rather than next/image: these are pre-sized WebP files served
 * from public/ with a year-long immutable cache (see next.config.ts), so the
 * optimiser has nothing left to do. `alt=""` is right for the decorative
 * slots; pass real alt text when the picture carries meaning.
 */
export function Photo({
  className = "",
  alt = "",
  fit = "cover",
  ...rest
}: React.ComponentProps<"img"> & {
  /** "contain" for artwork that must not be cropped, such as a client logo. */
  fit?: "cover" | "contain";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      loading="lazy"
      decoding="async"
      {...rest}
      alt={alt}
      className={`${
        fit === "contain"
          ? "object-contain"
          : // Photographs are dimmed a touch so white type and the teal brand
            // sit on them comfortably; logos keep their own values.
            "object-cover brightness-[0.92]"
      } ${className}`}
    />
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return <Symbol name="arrow" className={`size-4 ${className}`} />;
}

/**
 * The brand kit's Secondary Logo: the mark and wordmark as one horizontal
 * lockup, in the two supplied colourways. `onDark` pins the reverse version
 * for surfaces that are always dark (the video hero, the holding page);
 * everywhere else both are rendered and globals.css shows the one that
 * matches the theme.
 */
export function Logo({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const mark = (dark: boolean) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={dark ? "/logos/nextech-logo-white.svg" : "/logos/nextech-logo.svg"}
      alt="Nextech Energy Development"
      className="h-9 w-auto"
    />
  );

  return (
    <div className={`flex items-center ${className}`} data-brand-mark>
      {onDark ? (
        mark(true)
      ) : (
        <>
          <span className="contents" data-mark-light>
            {mark(false)}
          </span>
          <span className="contents" data-mark-dark>
            {mark(true)}
          </span>
        </>
      )}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-accent text-xs uppercase tracking-[0.14em] text-text-2">
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
        {title} {accent}
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
      <Photo
        src="/images/page-hero.webp"
        data-parallax
        className="absolute inset-y-0 right-0 hidden h-full w-2/5 opacity-70 [mask-image:linear-gradient(to_right,transparent,black_40%)] lg:block"
      />
      <div className="site-container relative section-space">
        <nav
          data-intro
          className="mb-6 flex items-center gap-2 text-xs text-text-2"
        >
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
          {title} {accent}
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
      <div className="site-container">
        <div
          data-reveal
          // Deep teal-to-ink in both themes, like the quote banner: a moment of
          // emphasis that closes the page rather than a bright block.
          className="flex flex-col gap-6 rounded-[18px] bg-gradient-to-r from-[#0d2235] via-[#194756] to-ink px-8 py-8 ring-1 ring-white/10 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold text-white">
              Let&apos;s build the future together
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Partner with Nextech Energy Development for reliable solutions
              tailored to your business needs.
            </p>
          </div>
          <NewsletterForm variant="cta" />
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
    <section className="bg-surface section-space">
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
                {i + 1}. {heading}
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
