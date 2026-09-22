"use client";

import { Symbol } from "./icons";
import { useFormSubmit } from "./use-form-submit";

type Props = {
  /** Footer uses a compact round submit; the CTA band uses a labelled button. */
  variant?: "footer" | "cta";
};

export default function NewsletterForm({ variant = "footer" }: Props) {
  const { status, error, onSubmit } = useFormSubmit("newsletter");

  if (status === "success") {
    return (
      <p
        role="status"
        className={
          variant === "cta"
            ? "text-sm font-medium text-ink"
            : "mt-5 text-xs leading-relaxed text-text-2"
        }
      >
        Thanks — check your inbox for a confirmation.
      </p>
    );
  }

  if (variant === "cta") {
    return (
      <form
        className="flex w-full flex-wrap gap-3 md:w-auto md:flex-nowrap"
        onSubmit={(e) =>
          onSubmit(e, (fd) => ({
            email: String(fd.get("email") ?? ""),
          }))
        }
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-full bg-surface-2 px-5 py-3 text-sm text-text-1 placeholder:text-text-2 md:w-64"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center gap-2 btn bg-ink px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Get Updates"}{" "}
          <Symbol name="arrow" className="size-4" />
        </button>
        {error && (
          <p role="alert" className="w-full text-sm text-ink/80">
            {error}
          </p>
        )}
      </form>
    );
  }

  return (
    <form
      className="mt-5 flex flex-col gap-2"
      onSubmit={(e) =>
        onSubmit(e, (fd) => ({
          email: String(fd.get("email") ?? ""),
        }))
      }
    >
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          aria-label="Email address"
          className="min-w-0 w-full rounded-full border border-line px-4 py-2.5 text-xs text-text-1 placeholder:text-text-2"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "submitting"}
          className="grid size-10 shrink-0 place-items-center btn bg-brand text-ink hover:bg-brand-dark disabled:opacity-60"
        >
          <Symbol name="arrow" className="size-4 -rotate-45" />
        </button>
      </div>
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
