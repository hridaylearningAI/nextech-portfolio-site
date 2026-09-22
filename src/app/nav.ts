/**
 * Site navigation. "What we do" is a grouping label rather than a page: the
 * navigation surfaces render its children as a dropdown or disclosure.
 * NAV_FLAT remains available for flat link lists such as the footer.
 */
export type NavItem = { label: string; href: string };
export type NavNode = NavItem | { label: string; children: NavItem[] };

export const NAV: NavNode[] = [
  { label: "Who we are", href: "/who-we-are" },
  {
    label: "What we do",
    children: [
      { label: "Supplies", href: "/supplies" },
      { label: "Services", href: "/services" },
    ],
  },
  { label: "Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },
];

export const NAV_FLAT: NavItem[] = NAV.flatMap((node) =>
  "children" in node ? node.children : [node],
);

/**
 * The figures in the bar at the foot of the video hero.
 * NOTE: the fifth label is still the old copy. The brief gave "100% __" with
 * the label left blank, so this is a placeholder awaiting the real one.
 */
export const STATS = [
  ["30+", "Global Partners", "handshake"],
  ["300+", "Approved Products", "certificate"],
  ["5", "Core Divisions", "cog"],
  ["24hr", "Response", "clock"],
  ["100%", "Commitment to Quality", "shield"],
] as const;

/**
 * Industries served. Third field keys into ICONS in icons.tsx. Drives the home
 * cards, the /clients grid and the footer column, so all three stay
 * on one taxonomy.
 */
export const INDUSTRIES = [
  [
    "Oil and Gas",
    "Trusted supply for upstream, midstream and downstream operations.",
    "rig",
  ],
  ["Water", "Products and systems for cleaner, safer water worldwide.", "drop"],
  [
    "Petrochemical",
    "High-quality materials for a stronger, more efficient industry.",
    "flask",
  ],
  [
    "Utility",
    "Equipment and spares for utility networks and the operators who run them.",
    "plug",
  ],
  [
    "Marine",
    "Supplying the marine industry with reliable equipment and spares.",
    "ship",
  ],
  [
    "Energy",
    "Solutions for a more reliable and sustainable energy future.",
    "bolt",
  ],
] as const;

export const COMPANY = {
  phone: "+971 2 446 1080",
  phoneHref: "tel:+97124461080",
  email: "info@nextechgt.ae",
  site: "www.nextechgt.ae",
  addressShort: "Global Tower, Electra Street, Abu Dhabi, United Arab Emirates",
  addressLines: [
    "Nextech General Trading L.L.C – O.P.C",
    "8th Floor, Office #802",
    "Global Tower, Electra Street",
    "PO Box 30080 Abu Dhabi",
    "United Arab Emirates",
  ],
  hours: ["8:00am – 5:00pm ( Mon – Fri )", "Sat & Sun Closed"],
  blurb:
    "Nextech General Trading based in the dynamic heart of the United Arab Emirates, is a trusted name in the world of Oil and Gas trading. With a decade of dedicated service, we deliver excellence, safety, and sustainability, contributing to the growth and prosperity of the United Arab Emirates.",
} as const;

/** The three divisions — these are the site's Quick Links too. */
/** The five divisions. Third field keys into ICONS in icons.tsx. */
export const DIVISIONS = [
  [
    "Mechanical & Flow Control",
    "Valves, pumps, piping and rotating equipment supplied to specification.",
    "wrench",
  ],
  [
    "Electrical",
    "Power distribution, cabling and electrical packages for plant and utilities.",
    "bolt",
  ],
  [
    "Instrumentation",
    "Measurement, control and analyser systems from the principals we represent.",
    "gauge",
  ],
  [
    "Heavy Process & Industrial Equipment",
    "Large process packages and industrial equipment built for demanding duty.",
    "rig",
  ],
  [
    "Chemicals & Safety Equipment",
    "Process chemicals alongside protective and safety equipment for site.",
    "hardhat",
  ],
] as const;

export const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/nextech-general-trading/",
  },
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
  ["India", "in", 28.6139, 77.209],
  ["USA", "us", 38.9072, -77.0369],
  ["Spain", "es", 40.4168, -3.7038],
  ["Italy", "it", 41.9028, 12.4964],
  ["United Kingdom", "gb", 51.5074, -0.1278],
  ["China", "cn", 39.9042, 116.4074],
  ["Singapore", "sg", 1.3521, 103.8198],
  ["Australia", "au", -35.2809, 149.13],
  ["Poland", "pl", 52.2297, 21.0122],
  ["Turkey", "tr", 39.9334, 32.8597],
] as const;

/**
 * The six services under What we do. Third field keys into ICONS in icons.tsx.
 */
export const SERVICES = [
  [
    "Civil Works & Mechanical Services",
    "Site civil works, mechanical installation, fabrication and maintenance support for operating plant.",
    "crane",
  ],
  [
    "Electrical & Power Systems",
    "Installation, testing and maintenance of power distribution, lighting and electrical systems.",
    "bolt",
  ],
  [
    "Instrumentation & Control",
    "Installation, calibration and commissioning of field instruments and control systems.",
    "gauge",
  ],
  [
    "Engineering Services",
    "Specification review, technical evaluation and engineering support from enquiry through to handover.",
    "blueprint",
  ],
  [
    "Consultancy & Advisory",
    "Market, supplier and regulatory guidance for principals and operators working in the United Arab Emirates.",
    "compass",
  ],
  [
    "Project Management",
    "Planning, coordination and delivery management that keeps packages on schedule.",
    "kanban",
  ],
] as const;

/**
 * URL-safe id from a label, e.g. "Mechanical & Flow Control" ->
 * "mechanical-flow-control". One implementation, so the home slider's deep
 * links and the supplies page's anchors can never be spelled differently.
 */
export const slugify = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
