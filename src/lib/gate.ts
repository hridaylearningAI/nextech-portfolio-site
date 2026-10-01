/**
 * Pre-launch gate.
 *
 * The public sees a coming-soon page at `/`. Every other page is held behind
 * one shared password, which the client and their team use to review the site
 * before launch. This is a courtesy screen, not real authentication: it keeps
 * the work private and out of search results, and nothing behind it is
 * sensitive.
 *
 * Remove `src/proxy.ts` (and these files) to open the site.
 */

export const GATE_COOKIE = "nxt_preview";

/** Thirty days: long enough that the client logs in once per device. */
export const GATE_MAX_AGE = 60 * 60 * 24 * 30;

export const COMING_SOON_PATH = "/coming-soon";
export const UNLOCK_PATH = "/unlock";

/** The password, overridable without a code change. */
export function sitePassword() {
  return process.env.SITE_PASSWORD?.trim() || "dhruv_nextech@123";
}

/**
 * What the cookie holds: a digest of the password rather than the password
 * itself, so a stolen cookie does not hand over the word people type. Web
 * Crypto is available in both the proxy and route handlers, so one function
 * serves both sides of the check.
 */
export async function gateToken() {
  const data = new TextEncoder().encode(`${sitePassword()}::nextech-preview`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
