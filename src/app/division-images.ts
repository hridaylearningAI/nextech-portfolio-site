/** Versioned image paths also invalidate the immutable public-asset cache. */
const REPLACEMENTS: Record<string, string> = {
  "mechanical-flow-control": "mechanical-flow-control-generated",
  "chemicals-safety-equipment": "chemicals-safety-equipment-generated",
  instrumentation: "instrumentation-generated",
  "heavy-process-industrial-equipment":
    "heavy-process-industrial-equipment-generated",
};

export function divisionImage(slug: string) {
  return `/images/divisions/${REPLACEMENTS[slug] ?? slug}.webp`;
}
