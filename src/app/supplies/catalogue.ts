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
 * Product names are transcribed as given, except that the en-dash separators
 * are normalised to hyphens and exact duplicates within a single category are
 * dropped. Items that appear in two different categories are kept in both.
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
        "Ball Valves - Flanged, Socket Weld, Butt Weld & Threaded",
        "Butt Weld Globe Valves - ANSI/MSS/API/BS",
        "Check Valves - Flanged, Socket Weld, Butt Weld & Threaded",
        "Check Valve - Butt Weld",
        "ESD & HIPPS Valves",
        "Flanged Ball Valves",
        "Flanged Gate Valves",
        "Gate Valves - Flanged, Socket Weld, Butt Weld & Threaded",
        "Globe Valves - Flanged, Socket Weld, Butt Weld & Threaded",
        "Motor Operated Valves",
        "Needle Valves",
        "Emergency Shutdown (ESD) / Tight Shut-Off Valves",
        "Low Noise Valve Control",
        "Valve Manifolds - For Instruments",
        "Valve Positioners",
        "Valve Automation / Actuator Control Systems",
        "Ball Valves - API 6D",
        "Ball Valves - API 6A",
        'Ball Valves - API 6D - Above 12"',
        'Ball Valves - API 6D - Up to 12"',
        "Ball Valves - BS EN 17292",
        "Special / Non-Standard Ball Valves",
        "Butterfly Valves - API 609 / BS EN 593",
        "Triple Offset Butterfly Valves",
        "Check Valves - API Piston Type",
        "Check Valves - API Swing Type",
        "Check Valves - API Wafer Type",
        "Non-Slam Check Valves - API",
        "Choke Valves - Adjustable & Positive",
        "Double Block & Bleed Valves - API",
        "Gate Valves - API Thru-Conduit",
        'Gate Valves - BS/ANSI/API - 2" & Above',
        'Globe Valves - BS/ANSI/API - 2" & Above',
        "Plug Valves - API",
        "Safety Relief Valves",
        "Inside BOP Valves",
        "API 6A Gate Valves",
        "API 6A Globe Valves",
        'Gate / Globe / Check Valves - Up to 2"',
        "Process Plant Ball Valves",
        "Wafer Type Ball Valves",
        "Socket Weld Ball Valves",
        "Socket Weld Check Valves - ANSI",
        "Socket Weld Globe Valves - ANSI/MSS/API/BS",
      ],
    },
    {
      name: "Flow Control & Piping",
      items: [
        "Pipe ANSI",
        "Pipes - Special Alloys - All Sizes",
        "Pipes - Stainless Steel",
        "Fittings for Pipes - CS/AS/SS - BW, SW & Threaded",
        "Fittings for Pipes - CS/AS/SS - SW & Screw",
        "Fittings for Tubes - Compression Type",
        "Flanges for Pipes - CS/AS/SS",
        "API Flanges / Adapter Type / Studded / Wellhead",
        "Compression Fittings / Adaptors for Instrument Tubing",
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
        "Lamps - Fluorescent / CFL / Incandescent",
        "Lamps / Floodlights - All Types",
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
        "Tube Bundles - For Heat Exchangers & Coolers",
        "Tube Bundles for Heat Exchangers - All Metals",
        "Tubes - For Heat Exchangers, Coolers & Boilers",
        "Tubes - SS / Alloy Steel Seamless & Welded",
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
    {
      name: "Pumps & Process Packages",
      items: [
        "Fuel Gas Packages",
        "Metering Skids - Liquids & Gases",
        "Water Injection Packages",
        "Pump Units for Pressure Testing / Equalising",
        "Piston Pumps",
        "Plunger Pumps",
        "API Centrifugal Pumps",
        "Reciprocating Pumps",
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
        "Welding Electrodes & Related Requisites",
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
        "Grating - Fiberglass",
        "Grating - Steel",
        "Handrail - GRP",
        "Manhole Covers",
        "Wire Mesh & Fencing Materials",
        "General Use Materials & Requisites - Mechanical Workshop",
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
