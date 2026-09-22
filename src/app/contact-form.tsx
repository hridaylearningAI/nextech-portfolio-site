"use client";

import { useFormSubmit } from "./use-form-submit";
import { Arrow } from "./ui";

const fieldClass =
  "mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm text-text-1 placeholder:text-text-2 focus:border-brand focus:outline-none";

export default function ContactForm() {
  const { status, error, onSubmit } = useFormSubmit("contact");

  if (status === "success") {
    return (
      <div
        role="status"
        className="mt-8 rounded-[18px] border border-line bg-surface-2 p-6"
      >
        <p className="text-base font-semibold text-text-1">
          Thank you — your message is on its way.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-2">
          We have emailed you a confirmation and will reply within one business
          day.
        </p>
      </div>
    );
  }

  return (
    <form
      id="enquiry"
      data-reveal
      className="mt-8 grid gap-5 sm:grid-cols-2"
      onSubmit={(e) =>
        onSubmit(e, (fd) => ({
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          message: String(fd.get("message") ?? ""),
        }))
      }
    >
      <label className="block">
        <span className="text-xs font-medium text-text-1">Your name *</span>
        <input
          required
          name="name"
          autoComplete="name"
          placeholder="Your name"
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="text-xs font-medium text-text-1">Email *</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          className={fieldClass}
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="text-xs font-medium text-text-1">Your message *</span>
        <textarea
          required
          name="message"
          rows={6}
          placeholder="How can we help?"
          className={fieldClass}
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-600 sm:col-span-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-3 btn bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark disabled:opacity-60 sm:w-fit"
      >
        {status === "submitting" ? "Sending…" : "Send Questions"} <Arrow />
      </button>
    </form>
  );
}
