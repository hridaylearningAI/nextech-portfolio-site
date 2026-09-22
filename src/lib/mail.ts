import { Resend } from "resend";
import { COMPANY, SOCIALS, STATS } from "@/app/nav";
import type { FormType } from "@/lib/form-types";

export type { FormType } from "@/lib/form-types";
export { FORM_TYPES, isFormType } from "@/lib/form-types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string) {
  return EMAIL_RE.test(value);
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

export function getMailConfig() {
  return {
    apiKey: requiredEnv("RESEND_API_KEY"),
    from:
      process.env.RESEND_FROM_EMAIL?.trim() ||
      "Nextech General Trading <hello@updates.nextechgt.ae>",
    to: process.env.RESEND_TO_EMAIL?.trim() || COMPANY.email,
  };
}

/**
 * Where the email banners and links point. Emails are read outside the site,
 * so every URL in them must be absolute, and the images must already be live
 * at this address (public/email/*.jpg) for them to load in an inbox.
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://nextechgt.ae"
).replace(/\/+$/, "");

// ── Palette ────────────────────────────────────────────────────────────────
// Hard-coded rather than read from CSS: an email has no stylesheet, and
// clients that support dark mode are told to leave these colours alone.
const C = {
  ink: "#08101a",
  inkSoft: "#0d2a36",
  brand: "#02c1b3",
  /** Teal dark enough to pass contrast as text on white. */
  brandText: "#017d74",
  page: "#e9f2f2",
  tint: "#eefaf9",
  tintLine: "#cfe9e6",
  text: "#1d1d1f",
  muted: "#5f6469",
  faint: "#8a8f94",
  line: "#e6eaeb",
  white: "#ffffff",
};

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Escaped, with line breaks kept. */
function escBlock(value: string) {
  return esc(value).replace(/\n/g, "<br/>");
}

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;

// ── Building blocks ────────────────────────────────────────────────────────
// Everything is tables and inline styles: that is what renders the same in
// Gmail, Apple Mail and Outlook desktop, which ignores most modern CSS.

function para(html: string, { top = 0, size = 16, color = C.muted } = {}) {
  return `<p style="margin:${top}px 0 0;font-family:${FONT};font-size:${size}px;line-height:1.65;color:${color}">${html}</p>`;
}

/** A pill button that survives Outlook: the colour lives on the table cell. */
function button(label: string, href: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px"><tr>
    <td bgcolor="${C.brand}" style="border-radius:999px;mso-padding-alt:15px 30px">
      <a href="${esc(href)}" target="_blank" style="display:inline-block;padding:15px 30px;font-family:${FONT};font-size:15px;font-weight:700;line-height:1;color:${C.ink};text-decoration:none;border-radius:999px">${esc(label)}&nbsp;&nbsp;&rarr;</a>
    </td></tr></table>`;
}

function sectionLabel(text: string, top = 36) {
  return `<p style="margin:${top}px 0 14px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${C.brandText}">${esc(text)}</p>`;
}

/** Numbered "what happens next" timeline. */
function steps(items: [string, string][]) {
  const rows = items
    .map(
      ([title, copy], i) => `<tr>
      <td valign="top" width="44" style="padding:0 0 ${i === items.length - 1 ? 0 : 18}px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="32" height="32" align="center" valign="middle" bgcolor="${C.ink}" style="width:32px;height:32px;border-radius:999px;font-family:${FONT};font-size:13px;font-weight:700;color:${C.brand}">${i + 1}</td>
        </tr></table>
      </td>
      <td valign="top" style="padding:4px 0 ${i === items.length - 1 ? 0 : 18}px">
        <p style="margin:0;font-family:${FONT};font-size:15px;font-weight:700;line-height:1.4;color:${C.text}">${esc(title)}</p>
        <p style="margin:3px 0 0;font-family:${FONT};font-size:14px;line-height:1.55;color:${C.muted}">${esc(copy)}</p>
      </td>
    </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
}

/** Tinted card echoing back what the person sent, so they have a record. */
function summary(rows: [string, string][]) {
  const filled = rows.filter(([, v]) => v.trim().length > 0);
  if (!filled.length) return "";
  const body = filled
    .map(
      ([label, value], i) => `<tr>
      <td style="padding:${i ? 14 : 0}px 0 0">
        <p style="margin:0;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${C.faint}">${esc(label)}</p>
        <p style="margin:4px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text}">${escBlock(value)}</p>
      </td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.tint}" style="border:1px solid ${C.tintLine};border-left:4px solid ${C.brand};border-radius:14px">
    <tr><td style="padding:20px 22px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${body}</table>
    </td></tr></table>`;
}

/** Their review, set as a pull quote. */
function quote(text: string, heading?: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.ink}" style="border-radius:16px">
    <tr><td style="padding:26px 28px">
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:44px;line-height:0.6;color:${C.brand}">&ldquo;</p>
      ${heading ? `<p style="margin:10px 0 0;font-family:${FONT};font-size:17px;font-weight:700;line-height:1.4;color:${C.white}">${esc(heading)}</p>` : ""}
      <p style="margin:${heading ? 8 : 10}px 0 0;font-family:${FONT};font-size:15px;line-height:1.7;color:#c9d6d9;font-style:italic">${escBlock(text)}</p>
    </td></tr></table>`;
}

/** Three headline figures from the site, in a band. */
function statsBand() {
  const picks = STATS.filter(([, label]) =>
    /partners|products|response/i.test(label),
  ).slice(0, 3);
  const cells = picks
    .map(
      (
        [value, label],
        i,
      ) => `<td width="33%" align="center" valign="top" style="padding:18px 8px;${i ? `border-left:1px solid ${C.tintLine};` : ""}">
        <p style="margin:0;font-family:${FONT};font-size:24px;font-weight:800;line-height:1.1;color:${C.ink}">${esc(value)}</p>
        <p style="margin:6px 0 0;font-family:${FONT};font-size:12px;line-height:1.4;color:${C.muted}">${esc(label)}</p>
      </td>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.tint}" style="margin-top:36px;border:1px solid ${C.tintLine};border-radius:14px"><tr>${cells}</tr></table>`;
}

/** Bulleted list with teal markers. */
function bullets(items: [string, string][]) {
  const rows = items
    .map(
      ([title, copy]) => `<tr>
      <td valign="top" width="22" style="padding:7px 0 0"><span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:${C.brand}"></span></td>
      <td valign="top" style="padding:0 0 14px">
        <p style="margin:0;font-family:${FONT};font-size:15px;font-weight:700;line-height:1.5;color:${C.text}">${esc(title)}</p>
        <p style="margin:2px 0 0;font-family:${FONT};font-size:14px;line-height:1.55;color:${C.muted}">${esc(copy)}</p>
      </td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
}

function contactBlock() {
  const item = (label: string, value: string, href: string) =>
    `<td valign="top" class="stack" style="padding:0 40px 12px 0">
      <p style="margin:0;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${C.faint}">${label}</p>
      <a href="${esc(href)}" style="display:inline-block;margin-top:4px;font-family:${FONT};font-size:14px;font-weight:600;color:${C.text};text-decoration:none">${esc(value)}</a>
    </td>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:36px;border-top:1px solid ${C.line}">
    <tr><td style="padding-top:24px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        ${item("Call us", COMPANY.phone, COMPANY.phoneHref)}
        ${item("Email", COMPANY.email, `mailto:${COMPANY.email}`)}
      </tr></table>
      <p style="margin:14px 0 0;font-family:${FONT};font-size:13px;line-height:1.55;color:${C.faint}">${esc(COMPANY.hours[0])} &middot; ${esc(COMPANY.hours[1])}</p>
    </td></tr></table>`;
}

type LayoutOptions = {
  /** Inbox preview line, shown after the subject. */
  preheader: string;
  /** Banner photograph under the header; omitted for the team emails. */
  banner?: { src: string; alt: string };
  eyebrow: string;
  title: string;
  body: string;
  /** Line under the card explaining why this arrived. */
  reason: string;
};

function layout({
  preheader,
  banner,
  eyebrow,
  title,
  body,
  reason,
}: LayoutOptions) {
  const linkedin = SOCIALS.find((s) => s.name === "LinkedIn");
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${esc(title)}</title>
<style>
  @media (max-width:620px){
    .container{width:100%!important}
    .px{padding-left:24px!important;padding-right:24px!important}
    .title{font-size:26px!important}
    .banner{height:auto!important}
    .stack{display:block!important;width:100%!important}
  }
  a{color:${C.brandText}}
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%">
  <div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all">${esc(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}">
    <tr><td align="center" style="padding:32px 12px 40px">
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.white}" style="width:600px;max-width:600px;border-radius:22px;overflow:hidden;box-shadow:0 12px 40px rgba(8,16,26,0.10)">

        <!-- Header -->
        <tr><td bgcolor="${C.ink}" class="px" style="padding:26px 40px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td valign="middle">
              <p style="margin:0;font-family:${FONT};font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1;color:${C.white}">Nex<span style="color:${C.brand}">tech</span></p>
              <p style="margin:5px 0 0;font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.08em;color:${C.brand}">General Trading</p>
            </td>
            <td align="right" valign="middle" style="font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#7f9398">Oil &middot; Gas &middot; Power</td>
          </tr></table>
        </td></tr>

        ${
          banner
            ? `<!-- Banner -->
        <tr><td bgcolor="${C.inkSoft}" style="line-height:0;font-size:0">
          <img src="${esc(banner.src)}" width="600" height="220" alt="${esc(banner.alt)}" class="banner" style="display:block;width:100%;max-width:600px;height:220px;border:0;outline:none;text-decoration:none;object-fit:cover">
        </td></tr>
        <tr><td height="4" bgcolor="${C.brand}" style="height:4px;line-height:4px;font-size:0">&nbsp;</td></tr>`
            : `<tr><td height="4" bgcolor="${C.brand}" style="height:4px;line-height:4px;font-size:0">&nbsp;</td></tr>`
        }

        <!-- Body -->
        <tr><td class="px" style="padding:40px 40px 44px">
          <p style="margin:0;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${C.brandText}">${esc(eyebrow)}</p>
          <h1 class="title" style="margin:12px 0 0;font-family:${FONT};font-size:30px;font-weight:800;line-height:1.2;letter-spacing:-0.02em;color:${C.ink}">${esc(title)}</h1>
          ${body}
        </td></tr>

        <!-- Footer -->
        <tr><td bgcolor="${C.ink}" class="px" style="padding:30px 40px 32px">
          <p style="margin:0;font-family:${FONT};font-size:18px;font-weight:800;letter-spacing:-0.01em;line-height:1.3;color:${C.white}">Fueling Industries. <span style="color:${C.brand}">Powering Tomorrow.</span></p>
          <p style="margin:12px 0 0;font-family:${FONT};font-size:13px;line-height:1.6;color:#9fb0b4">${esc(COMPANY.addressShort)}</p>
          <p style="margin:14px 0 0;font-family:${FONT};font-size:13px;line-height:1.6">
            <a href="${SITE_URL}" style="color:${C.brand};text-decoration:none;font-weight:600">${esc(COMPANY.site)}</a>
            ${linkedin ? `<span style="color:#4d6166">&nbsp;&nbsp;|&nbsp;&nbsp;</span><a href="${esc(linkedin.href)}" style="color:${C.brand};text-decoration:none;font-weight:600">LinkedIn</a>` : ""}
          </p>
        </td></tr>
      </table>

      <p style="margin:20px 0 0;max-width:520px;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.faint};text-align:center">${reason}</p>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Payloads ───────────────────────────────────────────────────────────────

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type PartnerPayload = {
  name: string;
  email: string;
  website?: string;
  contact?: string;
  location?: string;
  description?: string;
};

export type ReviewPayload = {
  name: string;
  email: string;
  company?: string;
  heading?: string;
  review: string;
};

export type NewsletterPayload = {
  email: string;
};

type Pair = {
  internalSubject: string;
  internalHtml: string;
  confirmSubject: string;
  confirmHtml: string;
  replyTo: string;
};

const banner = (type: FormType, alt: string) => ({
  src: `${SITE_URL}/email/${type}.jpg`,
  alt,
});

const clientReason = `You're receiving this because you submitted a form on <a href="${SITE_URL}" style="color:${C.faint}">${esc(COMPANY.site)}</a>. If that wasn't you, you can ignore this email.`;

/** Notification to the Nextech team: plain facts and a one-click reply. */
function teamEmail(opts: {
  kind: string;
  title: string;
  name: string;
  email: string;
  rows: [string, string][];
  replySubject: string;
}) {
  const received = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Dubai",
    dateStyle: "medium",
    timeStyle: "short",
  });
  return layout({
    preheader: `${opts.kind} from ${opts.name} (${opts.email})`,
    eyebrow: opts.kind,
    title: opts.title,
    body: `${para(`Received ${esc(received)} (UAE time) from the website.`, { top: 10, size: 14, color: C.faint })}
      ${sectionLabel("Details", 28)}
      ${summary(opts.rows)}
      ${button(`Reply to ${firstName(opts.name)}`, `mailto:${opts.email}?subject=${encodeURIComponent(opts.replySubject)}`)}`,
    reason: "Sent automatically by the nextechgt.ae website forms.",
  });
}

function contactPair(data: ContactPayload): Pair {
  const first = firstName(data.name);
  return {
    replyTo: data.email,
    internalSubject: `Website enquiry from ${data.name}`,
    internalHtml: teamEmail({
      kind: "New website enquiry",
      title: `${data.name} sent an enquiry`,
      name: data.name,
      email: data.email,
      rows: [
        ["Name", data.name],
        ["Email", data.email],
        ["Message", data.message],
      ],
      replySubject: "Re: Your enquiry to Nextech General Trading",
    }),
    confirmSubject: `Thanks ${first} — we've received your enquiry`,
    confirmHtml: layout({
      preheader: `A specialist will reply within one business day.`,
      banner: banner("contact", "Offshore oil and gas platforms at sea"),
      eyebrow: "Enquiry received",
      title: `Thank you for reaching out, ${first}.`,
      body: `${para(
        'Your message is now with our team in Abu Dhabi. A specialist who knows your sector will review it and come back to you <strong style="color:' +
          C.text +
          '">within one business day</strong>.',
        { top: 16 },
      )}
        ${sectionLabel("What happens next")}
        ${steps([
          [
            "We review your enquiry",
            "It goes straight to the division that handles your request.",
          ],
          [
            "A specialist replies",
            "Within one business day, with questions or a first answer.",
          ],
          [
            "We source and quote",
            "Options matched to your specification, from the principals we represent.",
          ],
        ])}
        ${sectionLabel("Your message")}
        ${summary([["Message", data.message]])}
        ${button("Explore our supplies", `${SITE_URL}/supplies`)}
        ${contactBlock()}`,
      reason: clientReason,
    }),
  };
}

function partnerPair(data: PartnerPayload): Pair {
  const first = firstName(data.name);
  return {
    replyTo: data.email,
    internalSubject: `Partnership enquiry from ${data.name}`,
    internalHtml: teamEmail({
      kind: "New partnership enquiry",
      title: `${data.name} wants to partner`,
      name: data.name,
      email: data.email,
      rows: [
        ["Name", data.name],
        ["Email", data.email],
        ["Website", data.website ?? ""],
        ["Contact", data.contact ?? ""],
        ["Location", data.location ?? ""],
        ["Business, products & services", data.description ?? ""],
      ],
      replySubject: "Re: Partnering with Nextech General Trading",
    }),
    confirmSubject: `${first}, thank you for your interest in partnering with Nextech`,
    confirmHtml: layout({
      preheader:
        "Our partnerships team is reviewing your profile. Here's what happens next.",
      banner: banner(
        "partner",
        "Engineers reviewing plans on an industrial site",
      ),
      eyebrow: "Partnership enquiry received",
      title: `Let's build what's next, together.`,
      body: `${para(
        `Thank you, ${esc(first)}. Your company profile is with our partnerships team. For over a decade we have represented manufacturers across the UAE's oil, gas and power sectors, and we're glad you're considering us.`,
        { top: 16 },
      )}
        ${statsBand()}
        ${sectionLabel("What happens next")}
        ${steps([
          [
            "Profile review",
            "We look at your products, markets and certifications.",
          ],
          [
            "Fit with our divisions",
            "We match your range against operator demand across the UAE.",
          ],
          [
            "Introductory call",
            "If there's a fit, we'll arrange a call to explore next steps.",
          ],
        ])}
        ${sectionLabel("What you shared")}
        ${summary([
          ["Website", data.website ?? ""],
          ["Contact", data.contact ?? ""],
          ["Location", data.location ?? ""],
          ["Business, products & services", data.description ?? ""],
        ])}
        ${button("Discover Nextech", `${SITE_URL}/who-we-are`)}
        ${contactBlock()}`,
      reason: clientReason,
    }),
  };
}

function reviewPair(data: ReviewPayload): Pair {
  const first = firstName(data.name);
  return {
    replyTo: data.email,
    internalSubject: `Client review from ${data.name}`,
    internalHtml: teamEmail({
      kind: "New client review",
      title: `${data.name} left a review`,
      name: data.name,
      email: data.email,
      rows: [
        ["Name", data.name],
        ["Email", data.email],
        ["Company", data.company ?? ""],
        ["Heading", data.heading ?? ""],
        ["Review", data.review],
      ],
      replySubject: "Re: Thank you for your review",
    }),
    confirmSubject: `Thank you for your review, ${first}`,
    confirmHtml: layout({
      preheader: "We appreciate you sharing your experience with us.",
      banner: banner("review", "The Nextech team in a meeting in Abu Dhabi"),
      eyebrow: "Feedback received",
      title: `Thank you for your kind words, ${first}.`,
      body: `${para(
        `Feedback from the people we work with shapes how we serve every client${data.company ? `, and we're grateful to hear it from ${esc(data.company)}` : ""}. Here's what you shared with us:`,
        { top: 16 },
      )}
        <div style="margin-top:28px">${quote(data.review, data.heading)}</div>
        ${para(
          "Thank you for trusting Nextech General Trading. We look forward to continuing to support your operations.",
          { top: 28 },
        )}
        ${button("See who we work with", `${SITE_URL}/clients`)}
        ${contactBlock()}`,
      reason: clientReason,
    }),
  };
}

function newsletterPair(data: NewsletterPayload): Pair {
  return {
    replyTo: data.email,
    internalSubject: `Newsletter signup: ${data.email}`,
    internalHtml: teamEmail({
      kind: "New newsletter signup",
      title: "Someone subscribed for updates",
      name: data.email,
      email: data.email,
      rows: [["Email", data.email]],
      replySubject: "Welcome to Nextech General Trading updates",
    }),
    confirmSubject: "Welcome aboard — you're subscribed to Nextech updates",
    confirmHtml: layout({
      preheader:
        "News, insight and events from the UAE's energy supply chain, straight to your inbox.",
      banner: banner("newsletter", "Wind turbines on desert hills at sunrise"),
      eyebrow: "Subscription confirmed",
      title: "You're on the list.",
      body: `${para(
        "Welcome! You'll now hear from us when there's something worth sharing from across the UAE's oil, gas and power supply chain.",
        { top: 16 },
      )}
        ${sectionLabel("What to expect")}
        ${bullets([
          [
            "Product & division news",
            "New principals, approved products and supply capabilities.",
          ],
          [
            "Industry insight",
            "What's moving across the UAE energy sector, and what it means for suppliers.",
          ],
          [
            "Events & exhibitions",
            "Where to meet our team, from ADIPEC to technical sessions.",
          ],
        ])}
        ${statsBand()}
        ${button("Visit nextechgt.ae", SITE_URL)}
        ${contactBlock()}`,
      reason: `You're receiving this because ${esc(data.email)} was subscribed on <a href="${SITE_URL}" style="color:${C.faint}">${esc(COMPANY.site)}</a>. To unsubscribe, simply reply to this email.`,
    }),
  };
}

/** Both emails for a form, without sending: used by the preview script. */
export function buildFormEmails(
  type: FormType,
  payload: ContactPayload | PartnerPayload | ReviewPayload | NewsletterPayload,
): Pair {
  return type === "contact"
    ? contactPair(payload as ContactPayload)
    : type === "partner"
      ? partnerPair(payload as PartnerPayload)
      : type === "review"
        ? reviewPair(payload as ReviewPayload)
        : newsletterPair(payload as NewsletterPayload);
}

export async function sendFormEmails(
  type: FormType,
  payload: ContactPayload | PartnerPayload | ReviewPayload | NewsletterPayload,
) {
  const { apiKey, from, to } = getMailConfig();
  const resend = new Resend(apiKey);

  const pair = buildFormEmails(type, payload);

  const confirmTo =
    type === "newsletter"
      ? (payload as NewsletterPayload).email
      : (payload as { email: string }).email;

  const { data, error } = await resend.batch.send([
    {
      from,
      to: [to],
      replyTo: pair.replyTo,
      subject: pair.internalSubject,
      html: pair.internalHtml,
    },
    {
      from,
      to: [confirmTo],
      replyTo: to,
      subject: pair.confirmSubject,
      html: pair.confirmHtml,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
