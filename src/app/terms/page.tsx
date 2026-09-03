import type { Metadata } from "next";
import { COMPANY } from "../nav";
import { CtaBand, LegalBody, PageHero, type LegalSection } from "../ui";

export const metadata: Metadata = {
  title: "Terms of Service — Nextech General Trading",
  description:
    "The terms governing your use of the Nextech General Trading website.",
};

const UPDATED = "3 September 2026";

const SECTIONS: LegalSection[] = [
  {
    heading: "Agreement to these terms",
    body: [
      `These Terms of Service govern your access to and use of the website operated by ${COMPANY.addressLines[0]} ("Nextech General Trading", "we", "us" or "our"), together with any content, functionality and services offered on or through it.`,
      "By accessing or using this website you confirm that you accept these terms and agree to be bound by them. If you do not agree, please do not use this website.",
    ],
  },
  {
    heading: "Who we are and how to contact us",
    body: [
      `Nextech General Trading is registered in the United Arab Emirates and operates from ${COMPANY.addressShort}.`,
      `You can reach us by telephone on ${COMPANY.phone} or by email at ${COMPANY.email}. Our working hours are ${COMPANY.hours[0]}.`,
    ],
  },
  {
    heading: "Changes to these terms and to the site",
    body: [
      "We may revise these terms at any time by amending this page. Please check this page from time to time, as the version in force when you use the website is the version that applies.",
      "We may also update, suspend or withdraw the website, or any part of it, without notice. We are not liable to you if the website is unavailable at any time or for any period.",
    ],
  },
  {
    heading: "Permitted use",
    body: [
      "You may use this website only for lawful purposes and in accordance with these terms. You agree not to:",
    ],
    bullets: [
      "Use the website in any way that breaches applicable local, national or international law or regulation.",
      "Attempt to gain unauthorised access to the website, the server on which it is stored, or any server, computer or database connected to it.",
      "Introduce viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful.",
      "Reproduce, duplicate, copy, resell or otherwise exploit any part of the website for a commercial purpose without our written consent.",
      "Use automated systems to extract data from the website except as permitted by our robots file or with our prior written permission.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "We are the owner or licensee of all intellectual property rights in this website and in the material published on it. Those works are protected by copyright, trade mark and other laws. All such rights are reserved.",
      "You may print off one copy and download extracts of any page for your own reference, provided you do not modify the material or use any illustrations, photographs, or graphics separately from any accompanying text. Our status as the author of the content must always be acknowledged.",
      "Product names, brands and trade marks of third parties that appear on this website remain the property of their respective owners and are referenced for identification only.",
    ],
  },
  {
    heading: "Enquiries, quotations and orders",
    body: [
      "Information on this website about products, services, specifications and capabilities is provided for general information. It does not constitute an offer to sell, a quotation, or a commitment to supply on any particular terms.",
      "Any enquiry submitted through this website is an invitation for us to respond and does not create a contract. A binding agreement arises only once we issue a written quotation or order acknowledgement and the applicable terms of sale are agreed between the parties.",
      "Availability, lead times, specifications and pricing are subject to confirmation at the time of quotation and may change without notice.",
    ],
  },
  {
    heading: "Accuracy of information",
    body: [
      "We take reasonable care to ensure the information on this website is accurate at the time of publication, but we make no representations or warranties, express or implied, that it is accurate, complete or up to date.",
      "Technical specifications, drawings and descriptions are indicative. They should not be relied upon for design, procurement or installation decisions without written confirmation from us or from the relevant manufacturer.",
    ],
  },
  {
    heading: "Links to other sites",
    body: [
      "Where this website contains links to other sites and resources provided by third parties, those links are provided for your information only and do not signify that we endorse them or their content.",
      "We have no control over the contents of those sites or resources and accept no responsibility for them or for any loss or damage that may arise from your use of them.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "To the extent permitted by law, we exclude all conditions, warranties, representations or other terms that may apply to this website or any content on it, whether express or implied.",
      "We do not guarantee that this website will be secure or free from bugs or viruses. You are responsible for configuring your information technology and platform to access this website, and for using your own virus protection software.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "Nothing in these terms excludes or limits our liability where it would be unlawful to do so.",
      "To the extent permitted by law, we will not be liable to any user for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty or otherwise, arising under or in connection with use of, or inability to use, this website or reliance on any content displayed on it.",
      "In particular, we will not be liable for loss of profits, sales, business or revenue; business interruption; loss of anticipated savings; loss of business opportunity, goodwill or reputation; or any indirect or consequential loss or damage.",
    ],
  },
  {
    heading: "Indemnity",
    body: [
      "You agree to indemnify and hold us harmless against any claims, liabilities, damages, losses and expenses arising out of your breach of these terms or your misuse of this website.",
    ],
  },
  {
    heading: "Privacy and data protection",
    body: [
      "Our Privacy Policy explains how we collect, use and protect personal information submitted through this website, including through our enquiry and newsletter forms. Please read it alongside these terms.",
    ],
  },
  {
    heading: "Governing law and jurisdiction",
    body: [
      "These terms, their subject matter and their formation are governed by the laws of the United Arab Emirates and, where applicable, the laws of the Emirate of Abu Dhabi.",
      "The courts of Abu Dhabi have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these terms or their subject matter.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `If you have any questions about these terms, please contact us at ${COMPANY.email} or by post at ${COMPANY.addressShort}.`,
    ],
  },
];

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Terms of Service"
        title="The terms of"
        accent="doing business with us."
        copy="These terms set out the basis on which you may use this website and the information published on it."
      />
      <LegalBody
        updated={UPDATED}
        intro="Please read these terms carefully before using this website. They apply to every visitor, and using the site means you accept them."
        sections={SECTIONS}
      />
      <CtaBand />
    </>
  );
}
