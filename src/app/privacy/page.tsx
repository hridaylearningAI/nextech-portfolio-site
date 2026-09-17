import type { Metadata } from "next";
import { COMPANY } from "../nav";
import { CtaBand, LegalBody, PageHero, type LegalSection } from "../ui";

export const metadata: Metadata = {
  title: "Privacy Policy - Nextech General Trading",
  description:
    "How Nextech General Trading collects, uses and protects personal information submitted through this website.",
};

const UPDATED = "3 September 2026";

const SECTIONS: LegalSection[] = [
  {
    heading: "About this policy",
    body: [
      `This policy explains how ${COMPANY.addressLines[0]} ("Nextech General Trading", "we", "us" or "our") collects, uses, shares and protects personal information when you visit this website or get in touch with us through it.`,
      "It applies to this website only. It does not apply to any third-party site you may reach through a link from here, each of which has its own privacy practices.",
    ],
  },
  {
    heading: "Information you give us",
    body: [
      "We collect the information you choose to provide when you use the forms on this website or contact us directly. Depending on the form, that may include:",
    ],
    bullets: [
      "Your name and the company or organisation you represent.",
      "Your email address and telephone number.",
      "The content of your enquiry, message, review or quotation request.",
      "Any other details you decide to include in your correspondence with us.",
    ],
  },
  {
    heading: "Information we collect automatically",
    body: [
      "When you visit this website, some information is collected automatically by our hosting and analytics infrastructure. This may include your IP address, browser type and version, device type, operating system, referring page, the pages you view and the time and date of your visit.",
      "This information is technical in nature and is used to operate the site securely, understand how it is used, and improve it. We do not use it to try to identify you personally.",
    ],
  },
  {
    heading: "How we use your information",
    body: ["We use the information described above in order to:"],
    bullets: [
      "Respond to your enquiry and provide the quotation, product or service information you requested.",
      "Manage our commercial relationship with you or the organisation you represent.",
      "Send you newsletters or updates where you have asked to receive them.",
      "Maintain the security, availability and performance of this website.",
      "Understand how the website is used so we can improve its content and structure.",
      "Comply with our legal, regulatory and record-keeping obligations.",
    ],
  },
  {
    heading: "Our basis for processing",
    body: [
      "We process personal information where it is necessary to respond to your request or to perform a contract with you; where we have a legitimate business interest in operating and improving our website and managing our client relationships; where you have given consent, such as for marketing emails; and where we are required to do so by law.",
      "Where processing is based on your consent, you may withdraw that consent at any time. Withdrawing consent does not affect the lawfulness of processing carried out beforehand.",
    ],
  },
  {
    heading: "Marketing communications",
    body: [
      "If you subscribe to our newsletter, we will use your email address to send you company and industry updates. Every message includes a way to unsubscribe, and you can also ask us to stop at any time by contacting us directly.",
      "We do not sell your contact details, and we do not share them with third parties for their own marketing purposes.",
    ],
  },
  {
    heading: "Sharing your information",
    body: ["We may share personal information with:"],
    bullets: [
      "Service providers who host this website, deliver email on our behalf, or provide analytics and security services, and who act on our instructions.",
      "Manufacturers and principals we represent, where this is necessary to prepare a quotation or fulfil your enquiry.",
      "Professional advisers such as auditors, lawyers and insurers, where required.",
      "Regulators, law enforcement or other authorities where we are legally obliged to disclose information.",
    ],
  },
  {
    heading: "Cookies and similar technologies",
    body: [
      "This website may use cookies and similar technologies to remember your preferences, keep the site secure, and gather aggregate information about how it is used.",
      "Most browsers let you refuse or delete cookies through their settings. Disabling cookies may affect how parts of this website function.",
    ],
  },
  {
    heading: "International transfers",
    body: [
      "We operate from the United Arab Emirates, and some of our service providers may process information in other countries. Where information is transferred outside the United Arab Emirates, we take reasonable steps to ensure it remains protected to a standard consistent with this policy.",
    ],
  },
  {
    heading: "How long we keep information",
    body: [
      "We keep personal information only for as long as necessary for the purposes described in this policy, including to meet legal, accounting, tax or reporting requirements.",
      "Enquiry correspondence is generally retained for the duration of our commercial relationship and for a reasonable period afterwards. Marketing contact details are retained until you unsubscribe.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We maintain appropriate technical and organisational measures designed to protect personal information against unauthorised access, loss, misuse or alteration, and we limit access to those who need it to do their job.",
      "No method of transmission over the internet is completely secure. While we work to protect your information, we cannot guarantee its absolute security, and any transmission is at your own risk.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Subject to applicable law, you may have the right to request access to the personal information we hold about you, ask us to correct it if it is inaccurate, ask us to delete it, object to or restrict how we use it, or request a copy in a portable format.",
      `To exercise any of these rights, please contact us at ${COMPANY.email}. We may need to verify your identity before we can act on your request.`,
    ],
  },
  {
    heading: "Children's privacy",
    body: [
      "This website is intended for business use and is not directed at children. We do not knowingly collect personal information from anyone under the age of 18. If you believe a child has provided us with information, please contact us and we will delete it.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time to reflect changes in our practices or in the law. The date at the top of this page shows when it was last revised. Please review it periodically.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `If you have questions about this policy or about how we handle personal information, contact us at ${COMPANY.email}, by telephone on ${COMPANY.phone}, or by post at ${COMPANY.addressShort}.`,
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="Your privacy,"
        accent="handled with care."
        copy="What we collect when you use this website, why we collect it, and the choices you have over how it is used."
      />
      <LegalBody
        updated={UPDATED}
        intro="We take the privacy of everyone who contacts us seriously. This policy explains, in plain terms, what happens to the information you share with us through this website."
        sections={SECTIONS}
      />
      <CtaBand />
    </>
  );
}
