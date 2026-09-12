"use client";
import { useSyncExternalStore } from "react";
import { SunIcon, MoonIcon, DesktopIcon } from "@phosphor-icons/react";
type Theme = "system" | "light" | "dark";
const ORDER: Theme[] = ["system", "light", "dark"];
function snapshot(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "dark" ? value : "system";
}
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    snapshot,
    () => "system",
  );
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
  return (
    <button
      type="button"
      onClick={() => {
        if (next === "system") delete document.documentElement.dataset.theme;
        else document.documentElement.dataset.theme = next;
        try {
          if (next === "system") localStorage.removeItem("theme");
          else localStorage.setItem("theme", next);
        } catch {}
      }}
      aria-label={`Theme: ${theme}. Switch to ${next}.`}
      title={`Theme: ${theme}. Switch to ${next}.`}
      className="grid size-11 shrink-0 place-items-center rounded text-text-1 hover:text-brand"
    >
      {theme === "light" ? (
        <SunIcon size={20} aria-hidden="true" />
      ) : theme === "dark" ? (
        <MoonIcon size={20} aria-hidden="true" />
      ) : (
        <DesktopIcon size={20} aria-hidden="true" />
      )}
    </button>
  );
}
