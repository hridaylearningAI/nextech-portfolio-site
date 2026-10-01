import { GATE_COOKIE, GATE_MAX_AGE, gateToken, sitePassword } from "@/lib/gate";

export const runtime = "nodejs";

/**
 * Checks the preview password and, if it matches, sets the cookie the proxy
 * looks for. The password never reaches the browser: it is compared here and
 * only a digest is stored.
 */
export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (password !== sitePassword()) {
    // Deliberately vague, and slow enough to make guessing tedious.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return Response.json(
      { error: "That password is not right." },
      { status: 401 },
    );
  }

  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    [
      `${GATE_COOKIE}=${await gateToken()}`,
      "Path=/",
      `Max-Age=${GATE_MAX_AGE}`,
      "HttpOnly",
      "SameSite=Lax",
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; "),
  );
  return response;
}
