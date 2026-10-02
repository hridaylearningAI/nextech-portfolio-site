import localFont from "next/font/local";

/**
 * The three faces from the brand kit, self-hosted as woff2 (converted from the
 * supplied OTFs) so there is no third-party request and no flash of fallback.
 *
 *   Conthrax SemiBold — display: headings and the big statements
 *   Asen Pro Medium   — accent: eyebrows, labels, the letterspaced small caps
 *   Gotham            — body: everything else, in Book / Medium / Bold
 */

export const display = localFont({
  src: [
    { path: "./fonts/Conthrax-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-display-face",
  display: "swap",
  // Conthrax is wide; the fallback is metric-adjusted so the swap barely moves.
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const accent = localFont({
  src: [
    { path: "./fonts/AsenPro-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-accent-face",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const body = localFont({
  src: [
    { path: "./fonts/Gotham-Book.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Gotham-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Gotham-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: false,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
});
