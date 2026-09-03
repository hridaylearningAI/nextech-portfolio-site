"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const ORDER: Theme[] = ["system", "light", "dark"];

const LABEL: Record<Theme, string> = {
  system: "Theme: match system",
  light: "Theme: light",
  dark: "Theme: dark",
};

/** Applies the choice; "system" clears the attribute so the media query governs. */
function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") {
    delete root.dataset.theme;
    localStorage.removeItem("theme");
  } else {
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }
}

export default function ThemeToggle() {
  // Server renders the system default; the effect corrects it after mount.
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") setTheme(stored);
    } catch {
      // Private mode or blocked storage — stay on system.
    }
  }, []);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    setTheme(next);
    try {
      apply(next);
    } catch {
      // Storage can throw; the attribute still applied.
    }
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${LABEL[theme]}. Click to change.`}
      title={LABEL[theme]}
      className="grid size-11 shrink-0 place-items-center rounded-full text-text-1 transition-colors hover:text-brand"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
        aria-hidden
      >
        {theme === "light" && (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
          </>
        )}
        {theme === "dark" && (
          <path d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.6 6.6 0 0 0 9.4 9.4Z" />
        )}
        {theme === "system" && (
          <>
            <rect x="2.8" y="4.4" width="18.4" height="12.6" rx="2" />
            <path d="M8.6 20.6h6.8M12 17v3.6" />
          </>
        )}
      </svg>
    </button>
  );
}
