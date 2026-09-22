"use client";

import { XIcon } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Arrow } from "./ui";

const FIELDS = [
  {
    name: "name",
    label: "Name",
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "website",
    label: "Website",
    type: "text",
    autoComplete: "url",
    required: false,
  },
  {
    name: "contact",
    label: "Contact",
    type: "tel",
    autoComplete: "tel",
    required: false,
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    autoComplete: "address-level2",
    required: false,
  },
] as const;

/**
 * Opens a partnership enquiry dialog from the contact-page quote banner.
 * Native <dialog> keeps Escape, focus trap and backdrop dismiss free.
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

  const fieldClass =
    "mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-text-1 placeholder:text-text-2 focus:border-brand focus:outline-none";

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
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[min(90dvh,40rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-[22px] border border-line bg-surface p-0 text-text-1 shadow-2xl backdrop:bg-black/55 open:flex open:flex-col"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-surface px-6 py-4">
          <h2 id={titleId} className="text-lg font-semibold tracking-tight">
            Partner with us
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mr-2 grid size-10 place-items-center rounded text-text-2 hover:text-brand"
          >
            <XIcon size={22} aria-hidden="true" />
          </button>
        </div>

        {sent ? (
          <div className="space-y-4 px-6 py-8">
            <p className="text-base font-semibold text-text-1">
              Thank you — we have your details.
            </p>
            <p className="text-sm leading-relaxed text-text-2">
              Our team will review your partnership enquiry and get back to you
              shortly.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-2 inline-flex items-center gap-3 btn bg-brand px-6 py-3 text-sm font-medium text-ink hover:bg-brand-dark"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 px-6 py-6">
            <p className="text-sm leading-relaxed text-text-2">
              Tell us about your company and how we can work together. Required
              fields are marked *.
            </p>

            {FIELDS.map(({ name, label, type, autoComplete, required }) => (
              <label key={name} className="block">
                <span className="text-xs font-medium text-text-1">
                  {label}
                  {required ? " *" : ""}
                </span>
                <input
                  name={name}
                  type={type}
                  required={required}
                  autoComplete={autoComplete}
                  placeholder={label}
                  className={fieldClass}
                />
              </label>
            ))}

            <label className="block">
              <span className="text-xs font-medium text-text-1">
                Describe your business, product &amp; services (optional)
              </span>
              <textarea
                name="description"
                rows={4}
                placeholder="What you supply, who you serve, and how you would like to partner"
                className={fieldClass}
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-3 btn bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark sm:w-auto"
            >
              Submit enquiry <Arrow />
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
