import {
  isFormType,
  isValidEmail,
  sendFormEmails,
  type ContactPayload,
  type NewsletterPayload,
  type PartnerPayload,
  type ReviewPayload,
} from "@/lib/mail";

export const runtime = "nodejs";

type Body = {
  type?: unknown;
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
  contact?: unknown;
  location?: unknown;
  description?: unknown;
  company?: unknown;
  heading?: unknown;
  review?: unknown;
};

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function bad(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return bad("Invalid JSON body");
  }

  if (!isFormType(body.type)) {
    return bad("Unknown form type");
  }

  try {
    switch (body.type) {
      case "contact": {
        const payload: ContactPayload = {
          name: str(body.name),
          email: str(body.email),
          message: str(body.message),
        };
        if (!payload.name || !payload.email || !payload.message) {
          return bad("Name, email and message are required");
        }
        if (!isValidEmail(payload.email)) return bad("Invalid email address");
        await sendFormEmails("contact", payload);
        break;
      }
      case "partner": {
        const payload: PartnerPayload = {
          name: str(body.name),
          email: str(body.email),
          website: str(body.website) || undefined,
          contact: str(body.contact) || undefined,
          location: str(body.location) || undefined,
          description: str(body.description) || undefined,
        };
        if (!payload.name || !payload.email) {
          return bad("Name and email are required");
        }
        if (!isValidEmail(payload.email)) return bad("Invalid email address");
        await sendFormEmails("partner", payload);
        break;
      }
      case "review": {
        const payload: ReviewPayload = {
          name: str(body.name),
          email: str(body.email),
          company: str(body.company) || undefined,
          heading: str(body.heading) || undefined,
          review: str(body.review),
        };
        if (!payload.name || !payload.email || !payload.review) {
          return bad("Name, email and review are required");
        }
        if (!isValidEmail(payload.email)) return bad("Invalid email address");
        await sendFormEmails("review", payload);
        break;
      }
      case "newsletter": {
        const payload: NewsletterPayload = { email: str(body.email) };
        if (!payload.email) return bad("Email is required");
        if (!isValidEmail(payload.email)) return bad("Invalid email address");
        await sendFormEmails("newsletter", payload);
        break;
      }
      default: {
        const _exhaustive: never = body.type;
        return bad(`Unhandled form type: ${_exhaustive}`);
      }
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email";
    console.error("[forms]", message);
    return bad(
      process.env.NODE_ENV === "development"
        ? message
        : "Could not send your message. Please try again or email us directly.",
      500,
    );
  }

  return Response.json({ ok: true });
}
