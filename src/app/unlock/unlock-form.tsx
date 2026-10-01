"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Arrow } from "../ui";

export default function UnlockForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");
  const [error, setError] = useState("");

  /** Only ever send people to a path on this site. */
  const target = (() => {
    const next = params.get("next") ?? "/";
    return next.startsWith("/") && !next.startsWith("//") ? next : "/";
  })();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(
      new FormData(event.currentTarget).get("password") ?? "",
    );
    setStatus("checking");
    setError("");
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "That password is not right.");
      }
      // The cookie is set; a full navigation lets the proxy see it.
      router.replace(target);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8">
      <label className="block">
        <span className="text-xs font-medium text-white/70">Password</span>
        <input
          autoFocus
          required
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter the preview password"
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none"
        />
      </label>

      {status === "error" && error && (
        <p role="alert" className="mt-3 text-sm text-[#ff9b9b]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "checking"}
        className="mt-6 inline-flex w-full items-center justify-center gap-3 btn bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "checking" ? "Checking…" : "View the site"}
        <Arrow />
      </button>
    </form>
  );
}
