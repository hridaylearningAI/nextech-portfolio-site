import { NextResponse, type NextRequest } from "next/server";
import {
  COMING_SOON_PATH,
  GATE_COOKIE,
  UNLOCK_PATH,
  gateToken,
} from "@/lib/gate";

/**
 * Holds the site closed until launch (see src/lib/gate.ts).
 *
 *   locked   /            -> the coming-soon page, rewritten so the URL stays "/"
 *            /anything    -> the unlock screen, remembering where they wanted
 *   unlocked /coming-soon -> back to the real home page
 *            everything else passes through
 *
 * The layout needs to know which page it is rendering so it can drop the site
 * header and footer on the two gate pages, and a server component cannot read
 * the path, so it is passed along as a request header.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const withPath = (path: string) => {
    const headers = new Headers(request.headers);
    headers.set("x-pathname", path);
    return { request: { headers } };
  };

  const unlocked =
    request.cookies.get(GATE_COOKIE)?.value === (await gateToken());

  if (unlocked) {
    // No reason to show the holding page to someone who is already in.
    if (pathname === COMING_SOON_PATH) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next(withPath(pathname));
  }

  if (pathname === "/") {
    return NextResponse.rewrite(
      new URL(COMING_SOON_PATH, request.url),
      withPath(COMING_SOON_PATH),
    );
  }

  if (pathname === COMING_SOON_PATH || pathname === UNLOCK_PATH) {
    return NextResponse.next(withPath(pathname));
  }

  const unlock = new URL(UNLOCK_PATH, request.url);
  unlock.searchParams.set("next", pathname + search);
  return NextResponse.redirect(unlock);
}

export const config = {
  /**
   * Everything except Next's own assets, the API (the coming-soon page still
   * posts to the newsletter endpoint) and any path with a file extension,
   * which covers /images, /logos, /videos, /flags and the rest of public/.
   */
  matcher: ["/((?!_next/|api/|.*\\.[\\w]+$).*)"],
};
