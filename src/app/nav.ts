/** Nav as laid out in the design. */
export const NAV = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Industries", "/industries"],
  ["Products & Services", "/products-services"],
  ["Clients", "/clients"],
  ["Contact Us", "/contact"],
] as const;

/**
 * Sectors the company supplies. Third field keys into ICONS in icons.tsx.
 * Drives the home cards, the /industries grid and the footer column, so all
 * three stay on one taxonomy.
 */
export const INDUSTRIES = [
  [
    "Oil & Gas",
    "Trusted supply for upstream, midstream and downstream operations.",
    "rig",
  ],
  [
    "Energy",
    "Solutions for a more reliable and sustainable energy future.",
    "bolt",
  ],
  [
    "Petrochemicals",
    "High-quality materials for a stronger, more efficient industry.",
    "flask",
  ],
  [
    "Marine",
    "Supplying the marine industry with reliable equipment and spares.",
    "ship",
  ],
  [
    "Water Treatment",
    "Products and systems for cleaner, safer water worldwide.",
    "drop",
  ],
  [
    "Industrial Solutions",
    "A wide range of industrial products for diverse applications.",
    "cog",
  ],
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

export const SOCIALS = [
  "Facebook",
  "Twitter",
  "Instagram",
  "YouTube",
  "Skype",
] as const;

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

/**
 * Markets the company actively trades in. One source for both the globe
 * markers and the readable list beside it, so the two can never drift.
 * Coordinates are capital cities; the ISO 3166-1 alpha-2 code drives the flag.
 */
export const COUNTRIES = [
  ["Spain", "es", 40.4168, -3.7038],
  ["Italy", "it", 41.9028, 12.4964],
  ["India", "in", 28.6139, 77.209],
  ["United Kingdom", "gb", 51.5074, -0.1278],
  ["China", "cn", 39.9042, 116.4074],
  ["United States", "us", 38.9072, -77.0369],
  ["Singapore", "sg", 1.3521, 103.8198],
  ["Australia", "au", -35.2809, 149.13],
  ["Qatar", "qa", 25.2854, 51.531],
  ["Poland", "pl", 52.2297, 21.0122],
  ["Turkey", "tr", 39.9334, 32.8597],
] as const;
