"use client";

import { useFormSubmit } from "./use-form-submit";

const fieldClass =
  "w-full rounded-xl border border-line px-4 py-3 text-sm text-text-1 placeholder:text-text-2 focus:border-brand focus:outline-none";

export default function ReviewForm() {
  const { status, error, onSubmit } = useFormSubmit("review");

  if (status === "success") {
    return (
      <div role="status" className="rounded-[18px] border border-line bg-surface p-6">
        <p className="text-base font-semibold text-text-1">
          Thank you for your review.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-2">
          We have emailed you a confirmation. Your feedback means a great deal
          to us.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) =>
        onSubmit(e, (fd) => ({
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          company: String(fd.get("company") ?? ""),
          heading: String(fd.get("heading") ?? ""),
          review: String(fd.get("review") ?? ""),
        }))
      }
    >
      {(
        [
          ["Your Name*", "name", true],
          ["Email*", "email", true],
          ["Company Name", "company", false],
          ["Heading", "heading", false],
        ] as const
      ).map(([label, name, required]) => (
        <input
          key={name}
          name={name}
          required={required}
          type={name === "email" ? "email" : "text"}
          placeholder={label}
          aria-label={label}
          className={fieldClass}
        />
      ))}
      <textarea
        required
        name="review"
        rows={5}
        placeholder="Write here*"
        aria-label="Write here"
        className={fieldClass}
      />
      <label className="flex items-start gap-3 text-xs leading-relaxed text-text-2">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 shrink-0 accent-[#02c1b3]"
        />
        I agree that Nextech will collect my name and email information
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full btn bg-brand px-5 py-3 text-sm font-medium text-ink hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Review"}
      </button>
    </form>
  );
}
