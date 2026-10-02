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
  { label: "Careers", href: "/careers" },
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
    "Power & Utility",
    "Equipment and spares for power networks, utilities and the operators who run them.",
    "plug",
  ],
  [
    "Marine",
    "Supplying the marine industry with reliable equipment and spares.",
    "ship",
  ],
  [
    "Nuclear Energy",
    "Qualified supply for the safety, control and process systems nuclear demands.",
    "bolt",
  ],
] as const;

export const COMPANY = {
  phone: "+971 2 446 1080",
  phoneHref: "tel:+97124461080",
  email: "info@nextechgt.ae",
  /** Applications go to reception rather than the general inbox. */
  careersEmail: "reception@nextechgt.ae",
  site: "www.nextechgt.ae",
  addressShort: "Global Tower, Electra Street, Abu Dhabi, United Arab Emirates",
  addressLines: [
    "Nextech Energy Development",
    "8th Floor, Office #802",
    "Global Tower, Electra Street",
    "PO Box 30080 Abu Dhabi",
    "United Arab Emirates",
  ],
  hours: ["8:00am – 5:00pm ( Mon – Fri )", "Sat & Sun Closed"],
  blurb:
    "Nextech Energy Development based in the dynamic heart of the United Arab Emirates, is a trusted name in the world of Oil and Gas trading. With a decade of dedicated service, we deliver excellence, safety, and sustainability, contributing to the growth and prosperity of the United Arab Emirates.",
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

/**
 * The clients shown in the home page strip, in order. Each pairs the name the
 * client is known by with the logo file under public/logos/clients.
 */
export const HOME_CLIENTS = [
  ["ADNOC", "adnoc"],
  ["ENEC", "emirates-nuclear-energy-corporation"],
  ["TAQA", "taqa"],
  ["Borouge", "borouge"],
  ["Fertil", "fertil"],
  ["NMDC", "nmdc"],
  ["CPECC", "cpecc"],
  ["EGA", "ega"],
] as const;

/**
 * The client roster, in the order the client supplied it. The second field is
 * the logo file under public/logos/clients; null means the artwork has not
 * arrived yet, and that tile shows the name instead of a blank card.
 */
export const CLIENTS = [
  ["ADNOC", "adnoc"],
  ["ENEC", "emirates-nuclear-energy-corporation"],
  ["ENOQ", "enoc"],
  ["TAQA", "taqa"],
  ["Borouge", "borouge"],
  ["Fertil", "fertil"],
  ["TA'ZIZ", "taziz"],
  ["Emirates Steel", "emirates-steel"],
  ["Dana Steel", "dana-steel"],
  ["Emirates Global Aluminium", "ega"],
  ["ADDC", "abu-dhabi-distribution-company"],
  ["SNOC", "snoc"],
  ["Dragon Oil", "dragon-oil"],
  ["Emirates Cement", "emirates-cement"],
  ["Dubai Petroleum", "dubai-petroleum"],
  ["DEWA", "dewa"],
  ["Fujairah Electricity & Water", "fujairah-electricity-water"],
  ["Shell", "shell"],
  ["Veolia", "veolia-water"],
  ["SEWA", "sewa"],
  ["TotalEnergies", "total"],
  ["BP", "bp"],
  ["NMDC", "nmdc"],
  ["McDermott", "mcdermott"],
  ["Petrofac", "petrofac"],
  ["Saipem", "saipem"],
  ["Wood", "wood"],
  ["KENT", "kent"],
  ["CPECC", "cpecc"],
  ["Wison", "wison"],
  ["Technip Energies", "technip-energies"],
  ["Tecnimont", "tecnimont"],
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
    "End-to-end coordination of engineering, procurement, manufacturing, delivery, installation, and execution to ensure projects are delivered on time, within scope, and to client requirements.",
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
