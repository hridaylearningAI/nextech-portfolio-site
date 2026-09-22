"use client";

import { useCallback, useState, type FormEvent } from "react";
import type { FormType } from "@/lib/form-types";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Shared POST to /api/forms. Keeps every site form on the same Resend path
 * without each component reinventing fetch + error handling.
 */
export function useFormSubmit(type: FormType) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (fields: Record<string, string>) => {
      setStatus("submitting");
      setError(null);
      try {
        const res = await fetch("/api/forms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, ...fields }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        setStatus("success");
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
        setStatus("error");
        return false;
      }
    },
    [type],
  );

  function onSubmit(
    event: FormEvent<HTMLFormElement>,
    map: (form: FormData) => Record<string, string>,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    void (async () => {
      const ok = await submit(map(new FormData(form)));
      if (ok) form.reset();
    })();
  }

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  return { status, error, submit, onSubmit, reset };
}
