/** Nav as laid out in the design. */
export const NAV = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Industries", "/industries"],
  ["Products & Services", "/products-services"],
  ["Clients", "/clients"],
  ["Contact Us", "/contact"],
] as const;

/** Sectors the company supplies, per its own description. */
export const INDUSTRIES = [
  ["Oil & Gas", "Top-quality products and services for the region's operators."],
  ["Refinery", "Equipment and spares that keep refining operations running."],
  ["Power Generation", "Supply for power producers and utility-scale facilities."],
  ["Upstream", "Supporting exploration and production across the Emirates."],
  ["Downstream", "Representing manufacturers serving downstream industry."],
  ["Petrochemicals", "Materials and equipment for complex industrial processes."],
] as const;

export const COMPANY = {
  phone: "+971 2 446 1080",
  phoneHref: "tel:+97124461080",
  email: "info@nextechgt.ae",
  site: "www.nextechgt.ae",
  addressShort: "Global Tower, Electra Street, Abu Dhabi, UAE",
  addressLines: [
    "Nextech General Trading L.L.C – O.P.C",
    "8th Floor, Office #802",
    "Global Tower, Electra Street",
    "PO Box 30080 Abu Dhabi",
    "United Arab Emirates",
  ],
  hours: ["8:00am – 5:00pm ( Mon – Fri )", "Sat & Sun Closed"],
  blurb:
    "Nextech General Trading based in the dynamic heart of the UAE, is a trusted name in the world of Oil and Gas trading. With a decade of dedicated service, we deliver excellence, safety, and sustainability, contributing to the growth and prosperity of the UAE.",
} as const;

/** The three divisions — these are the site's Quick Links too. */
export const DIVISIONS = [
  [
    "Mechanical",
    "Valves, pumps, piping and rotating equipment supplied to specification for upstream and downstream plant.",
  ],
  [
    "Electrical",
    "Power distribution, cabling and electrical packages for refinery and power generation facilities.",
  ],
  [
    "Instrumentation",
    "Measurement, control and analyser systems from principals we represent across the region.",
  ],
] as const;

export const SOCIALS = ["Facebook", "Twitter", "Instagram", "YouTube", "Skype"] as const;

/** Client roster as listed on the live Clients page. */
export const CLIENTS = [
  "ADNOC",
  "Fertil",
  "NPCC",
  "TTE O&M",
  "Borouge",
  "Al Dhafra Petroleum",
  "Abu Dhabi Oil Co. Ltd",
  "Gulf Total Tractebel Power Company",
  "BUNDUQ",
  "Total",
  "ENOC",
  "Veolia Water",
  "Dubai Petroleum",
  "Shell",
  "Dragon Oil",
  "VeBes",
  "Emirates Nuclear Energy Corporation",
  "ADNPM",
  "Dolphin Energy",
  "Abu Dhabi Sewerage Services Company",
  "Emirates Steel",
  "EGA",
  "Dubai Aluminium",
  "TRANSCO",
  "The Petroleum Institute",
  "Khalifa University",
  "SEHA",
  "Abu Dhabi Distribution Company",
  "Al Ain Distribution Company",
] as const;
