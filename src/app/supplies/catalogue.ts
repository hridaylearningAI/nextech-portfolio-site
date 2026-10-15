import { DIVISIONS } from "../nav";

/**
 * Supplies catalogue, generated from the client's "Product Sectors.xlsx".
 *
 * The spreadsheet groups products into five sheets that do not line up one to
 * one with the five divisions used across the site (it merges Electrical with
 * Instrumentation, and splits Chemicals from Safety). They are mapped onto the
 * site's divisions here so the home slider, the stats and this page agree:
 *
 *   Mechanical & Flow Control            <- Mechanical & Flow Control
 *   Electrical                           <- Electrical & Instrumentation / Electrical Equipment
 *   Instrumentation                      <- Electrical & Instrumentation / Instrumentation
 *   Heavy Process & Industrial Equipment <- Heavy Process & Industrial Equipment
 *   Chemicals & Safety Equipment         <- Chemicals & Process Materials
 *                                           + Safety, Infrastructure & General Industrial
 *
 * Repeated products are listed in one primary category. Overlapping variants
 * are consolidated while retaining their connection types, materials and
 * standards so the catalogue stays concise without losing product coverage.
 */
export type Category = { name: string; items: readonly string[] };

const CATEGORIES: readonly (readonly Category[])[] = [
  [
    {
      name: "Valves & Valve Automation",
      items: [
        "Actuators - Gas Over Oil",
        "Actuators - Hydraulic",
        "Actuators - Hydro-Electric",
        "Actuators - Pneumatic",
        "Angle Pattern Globe Valves",
        "Ball Valves - Flanged, Socket Weld, Butt Weld & Threaded - API 6D / API 6A / BS EN 17292",
        "Globe Valves - Flanged, Socket Weld, Butt Weld & Threaded - ANSI / MSS / API / BS / API 6A",
        "Check Valves - Flanged, Socket Weld, Butt Weld & Threaded - API",
        "Emergency Shutdown (ESD), Tight Shut-Off & HIPPS Valves",
        "Gate Valves - Flanged, Socket Weld, Butt Weld & Threaded - API 6A",
        "Motor Operated Valves",
        "Needle Valves",
        "Low Noise Valve Control",
        "Valve Manifolds - For Instruments",
        "Valve Positioners",
        "Valve Automation / Actuator Control Systems",
        "Special / Non-Standard Ball Valves",
        "Butterfly Valves - API 609 / BS EN 593",
        "Triple Offset Butterfly Valves",
        "Choke Valves - Adjustable & Positive",
        "Double Block & Bleed Valves - API",
        "Plug Valves - API",
        "Safety Relief Valves",
        "Inside BOP Valves",
        "Wafer Type Ball Valves",
      ],
    },
    {
      name: "Flow Control & Piping",
      items: [
        "Pipe ANSI",
        "Pipes - Special Alloys - All Sizes",
        "Pipes - Stainless Steel",
        "Fittings for Pipes - CS/AS/SS - BW, SW & Threaded",
        "Compression Fittings & Adaptors for Instrument Tubing",
        "Flanges for Pipes - CS/AS/SS",
        "API Flanges / Adapter Type / Studded / Wellhead",
        "Instrument Tubing",
        "Tube - All Metals for General Use",
        "Union, Wing & Accessories",
        "Industrial Strainers",
        "Sight Flow Indicators",
      ],
    },
    {
      name: "Pumps & Rotating Equipment",
      items: [
        "Accessories for Pumps",
        "Bearing Isolators",
        "Piston Pumps",
        "Plunger Pumps",
        "Centrifugal Jet Pumps",
        "Manually Operated Pumps",
        "Reciprocating Pumps",
        "Sump Pumps",
        "Horizontal Centrifugal Pumps - API",
        "Vertical Centrifugal Pumps - API",
        "Pump Units for Pressure Testing / Equalising - Skid Mounted",
        "Air Operated Motors",
        "Gear Boxes",
        "Hydraulic Power Units",
      ],
    },
    {
      name: "Mechanical Utilities & Workshop",
      items: [
        "General Use Materials & Requisites for Mechanical Workshops",
        "Ropes, Steel Wires & Hoist Drums",
        "Manhole Covers",
        "Grating - Steel",
        "Grating - Fiberglass",
        "Handrails - GRP",
        "Wire Mesh & Fencing Materials",
        "Welding Electrodes & Related Requisites",
        "Belt Conveyor Systems & Accessories",
        "Vibrating Screens & Accessories",
      ],
    },
  ],
  [
    {
      name: "Electrical Equipment",
      items: [
        "Lightning Arrestors",
        "LV Busbars & Busbar Ducts",
        "Earthing Materials",
        "Emergency Lights - Self Contained",
        "Lamps - For Indication",
        "Lamps & Floodlights - Including Fluorescent, CFL & Incandescent",
        "Light Fittings - Safe Area",
        "Light Fittings - Explosion Proof",
        "Motors - Electric LV - Up to 415V",
        "Poles - Street Lighting",
        "Jointing & Termination Kits - Cable Fittings",
        "Towers - For Floodlights",
        "Warning / Aviation Lights - Safe Areas",
        "Cable Trays, Ladders & Trunking - GRP",
        "Cable Trays, Ladders & Trunking - Metallic",
      ],
    },
  ],
  [
    {
      name: "Instrumentation",
      items: [
        "Density Transmitters",
        "Flowmeters - Pitot Tube Type",
        "Flowmeters - Magnetic Type",
        "Level Controllers",
        "Level Indicators - Radar Type",
        "Level Indicators - Displacer Type",
        "Level Profiler - Oil/Water Interface",
        "Level Switches",
        "Level Transmitters - Differential Pressure Type",
        "Pressure & Differential Pressure Transmitters",
        "Orifice Plates / Flow Meter Assemblies",
        "Variable Area Flowmeters / Rotameters",
        "Tank Gauging Systems",
        "Sampler Systems - Crude Oil & Gas",
        "Instrument Shelters & Analyzer Shelters",
        "Online Analyzers - All Types",
        "Analyzers - Chromatographs",
        "Environmental / Emission Analyzers",
      ],
    },
  ],
  [
    {
      name: "Heat Transfer Equipment",
      items: [
        "Air Coolers - Finned Tube",
        "Heat Exchangers - Shell & Tube",
        "Tube Bundles - For Heat Exchangers & Coolers - All Metals",
        "Tubes - For Heat Exchangers, Coolers & Boilers - Stainless / Alloy Steel, Seamless & Welded",
        "Waste Heat Recovery Systems",
      ],
    },
    {
      name: "Boilers & Process Equipment",
      items: [
        "Boilers - Cogeneration Packages",
        "Boilers - Steam Packages",
        "Pressure Vessels Above 100mm - CS/SS/AS/Clad",
        "Pressure Vessels Up to 35mm - CS/SS/AS/Clad - U Stamp",
        "Reactors",
        "Demisters",
        "Trays, Internals, Supports & Packings for Vessels / Towers / Columns",
      ],
    },
    {
      name: "Process Packages & Systems",
      items: [
        "Fuel Gas Packages",
        "Metering Skids - Liquids & Gases",
        "Water Injection Packages",
        "Self-Contained Surface Safety Valve Systems",
        "Emergency Shelters",
        "Sunshades & Enclosures",
      ],
    },
  ],
  [
    {
      name: "Chemicals & Process Materials",
      items: [
        "Catalysts - Activated Carbon",
        "Alumina Balls",
        "Ceramic Balls",
        "Drilling Chemicals - Cementing",
        "Drilling Chemicals - Mud & Brine",
        "Compost",
        "Peat Moss",
        "Fertilizers",
        "Agricultural Chemicals",
        "Oils",
        "Lubricants",
        "Greases - General Use",
        "Materials for Coating Protection",
        "Wrapping Tape",
        "Welding & Coating Materials - Cold Type",
      ],
    },
    {
      name: "Safety, Infrastructure & General Industrial",
      items: [
        "Eye Wash / Eyewash Stations",
        "Safety Showers",
        "Fire Blankets",
        "Safety Consumables - First Aid, Flashlights, Masks, etc.",
        "Building Materials - Hardware",
        "Building Materials - Sanitary Ware & Fittings",
      ],
    },
  ],
];

export const CATALOGUE = DIVISIONS.map(([title, intro, icon], i) => ({
  title,
  intro,
  icon,
  categories: CATEGORIES[i],
}));
