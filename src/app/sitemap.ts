import type { MetadataRoute } from "next";
import { SITE_URL } from "./nav";

/**
 * Every public route. Next.js serves this at /sitemap.xml; submit that URL in
 * Google Search Console so a recrawl is requested for the whole site at once
 * rather than page by page.
 */
const ROUTES = [
  "",
  "/who-we-are",
  "/services",
  "/supplies",
  "/clients",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    // The home page is the entry point; the legal pages matter least.
    priority: path === "" ? 1 : path === "/privacy" || path === "/terms" ? 0.3 : 0.8,
  }));
}
