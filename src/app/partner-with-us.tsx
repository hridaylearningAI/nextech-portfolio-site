"use client";

import { XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Symbol, type IconName } from "./icons";
import { Arrow } from "./ui";

const FIELDS = [
  {
    name: "name",
    label: "Name",
    type: "text",
    autoComplete: "name",
    placeholder: "Your full name",
    required: true,
    wide: false,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    placeholder: "you@company.com",
    required: true,
    wide: false,
  },
  {
    name: "website",
    label: "Website",
    type: "text",
    autoComplete: "url",
    placeholder: "www.company.com",
    required: false,
    wide: false,
  },
  {
    name: "contact",
    label: "Contact",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+971 …",
    required: false,
    wide: false,
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    autoComplete: "address-level2",
    placeholder: "City, country",
    required: false,
    wide: true,
  },
] as const;

/** Why principals partner with Nextech — the same points as Who we are. */
const REASONS: [IconName, string][] = [
  ["clipboard", "Fast-track registration and prequalification support"],
  ["trend", "Market intelligence on upcoming projects and plans"],
  ["handshake", "Close, long-standing relationships with site teams"],
];

/**
 * Opens a partnership enquiry dialog from the contact-page quote banner.
 *
 * Native <dialog> keeps Escape, focus trap and backdrop dismiss free. The
 * panel beside the form is ink in both themes, the same moment of emphasis as
 * the banner that opens it, so the dialog reads as a continuation of it.
 */
export default function PartnerWithUs() {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onToggle = () => {
      document.documentElement.style.overflow = el.open ? "hidden" : "";
      if (!el.open) setSent(false);
    };
    el.addEventListener("close", onToggle);
    return () => {
      el.removeEventListener("close", onToggle);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const open = () => {
    setSent(false);
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => dialog.current?.close();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  // Same field treatment as the contact form, so the two read as one system.
  const fieldClass =
    "mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-text-1 transition-colors placeholder:text-text-2/70 hover:border-text-2/40 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="inline-flex shrink-0 items-center gap-3 btn bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-lg hover:bg-white/90"
      >
        Partner with us <Arrow />
      </button>

      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        // Clicking the backdrop lands on the dialog element itself.
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[min(92dvh,44rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-[28px] md:overflow-hidden bg-surface p-0 text-text-1 opacity-0 shadow-2xl ring-1 ring-line transition-[opacity,scale,overlay,display] transition-discrete duration-300 ease-out backdrop:bg-ink/60 backdrop:backdrop-blur-sm open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0 scale-97"
      >
        {/* Pinned to the dialog, not the form, so on a phone it sits at the
            very top over the brand panel rather than below it. */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white md:top-4 md:right-4 md:text-text-2 md:hover:bg-[var(--tint-b)] md:hover:text-brand"
        >
          <XIcon size={20} aria-hidden="true" />
        </button>

        <div className="grid md:max-h-[inherit] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* ── Brand panel ─────────────────────────────────── */}
          <aside className="relative isolate overflow-hidden bg-gradient-to-br from-[#0d2a36] via-[#0a1d2a] to-ink px-6 py-7 text-white sm:px-8 md:py-10">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgba(2,193,179,0.32),transparent_68%)]"
            />
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--brand)] uppercase">
              Partnerships
            </p>
            <h2
              id={titleId}
              className="mt-3 text-2xl leading-tight font-bold tracking-tight sm:text-3xl"
            >
              Partner with <span className="text-[var(--brand)]">Nextech.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Manufacturers and principals: bring your products to operators
              across the United Arab Emirates, with a team that knows the
              approval path.
            </p>

            {/* The reasons make the case on a wide screen; on a phone they
                would push the form below the fold, so they step aside. */}
            <ul className="mt-8 hidden space-y-4 md:block">
              {REASONS.map(([icon, text]) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                    <Symbol
                      name={icon}
                      className="size-4 text-[var(--brand)]"
                    />
                  </span>
                  <span className="pt-1.5 text-sm leading-snug text-white/85">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          {/* ── Form ─────────────────────────────────────────── */}
          {/* On a phone the whole dialog scrolls; side by side, only the form
              column does, so the brand panel stays put. */}
          <div className="relative px-6 py-7 sm:px-8 md:min-h-0 md:overflow-y-auto md:py-10">
            {sent ? (
              <div className="flex min-h-72 flex-col items-start justify-center">
                <span className="grid size-14 place-items-center rounded-full bg-[var(--tint-b)] ring-1 ring-brand/30">
                  <Symbol name="seal" className="size-7 text-brand" />
                </span>
                <p className="mt-6 text-xl font-semibold tracking-tight text-text-1">
                  Thank you. We have your details.
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-2">
                  Our team will review your partnership enquiry and get back to
                  you shortly.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-8 inline-flex items-center gap-3 btn bg-brand px-6 py-3 text-sm font-medium text-ink hover:bg-brand-dark"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <p className="pr-10 text-sm leading-relaxed text-text-2">
                  Tell us about your company and how we can work together.
                  Fields marked <span className="text-brand">*</span> are
                  required.
                </p>

                <div className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">
                  {FIELDS.map(
                    ({
                      name,
                      label,
                      type,
                      autoComplete,
                      placeholder,
                      required,
                      wide,
                    }) => (
                      <label
                        key={name}
                        className={`block ${wide ? "sm:col-span-2" : ""}`}
                      >
                        <span className="text-xs font-medium text-text-1">
                          {label}
                          {required && (
                            <span aria-hidden className="text-brand">
                              {" "}
                              *
                            </span>
                          )}
                        </span>
                        <input
                          name={name}
                          type={type}
                          required={required}
                          autoComplete={autoComplete}
                          placeholder={placeholder}
                          className={fieldClass}
                        />
                      </label>
                    ),
                  )}

                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-text-1">
                      Your business, products &amp; services
                      <span className="text-text-2"> (optional)</span>
                    </span>
                    <textarea
                      name="description"
                      rows={4}
                      placeholder="What you supply, who you serve, and how you would like to partner"
                      className={`${fieldClass} resize-y`}
                    />
                  </label>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-relaxed text-text-2">
                    We use these details only to reply. See our{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-text-1 underline decoration-line underline-offset-2 hover:text-brand"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-3 btn bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark"
                  >
                    Submit enquiry <Arrow />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
