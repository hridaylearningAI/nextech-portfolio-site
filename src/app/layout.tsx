import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "./nav";
import { accent, body, display } from "./fonts";
import Motion from "./motion";
import PageTransition from "./page-transition";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

const DESCRIPTION =
  "Delivering top-quality products and services to the Oil and Gas, Refinery, and Power generation sectors in the United Arab Emirates.";

export const metadata: Metadata = {
  // Gives every page a self-referential canonical URL and turns the relative
  // OG image path below into an absolute one, which crawlers require.
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  // Page titles read "<Page> | Nextech Energy" in search results and tabs;
  // the home page gets the bare brand name from `default`.
  title: { default: "Nextech Energy", template: "%s | Nextech Energy" },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Nextech Energy",
    title: "Nextech Energy",
    description: DESCRIPTION,
    url: "./",
  },
};

/**
 * Runs before first paint. Two jobs:
 *
 * 1. Theme — a stored choice is applied up front so it never flashes the wrong
 *    one. No stored value leaves the attribute unset, which hands control to
 *    the prefers-color-scheme media query in globals.css.
 * 2. Motion — `js-motion` lets globals.css pre-hide the elements GSAP is about
 *    to animate in, which is what stops them flashing before hydration. The
 *    watchdog removes it again if GSAP never checked in (chunk failed to load,
 *    JS disabled after the class landed), so a bad bundle degrades to plain
 *    visible content rather than a blank page.
 */
const BOOT_SCRIPT = `
var d=document.documentElement;
try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}
try{d.classList.add('js-motion');setTimeout(function(){if(d.dataset.motion!=='on')d.classList.remove('js-motion')},2500)}catch(e){}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${body.variable} ${display.variable} ${accent.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Motion />
        <PageTransition />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
