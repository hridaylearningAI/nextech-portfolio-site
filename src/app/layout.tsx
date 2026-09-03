import type { Metadata } from "next";
import "./globals.css";
import Motion from "./motion";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

export const metadata: Metadata = {
  title: "Nextech General Trading — Fueling Industries. Powering Tomorrow.",
  description:
    "Delivering top-quality products and services to the Oil and Gas, Refinery, and Power generation sectors in the UAE.",
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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Motion />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
