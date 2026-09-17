import type { Metadata } from "next";
import { CtaBand, PageHero } from "../ui";
import CatalogueBrowser from "./catalogue-browser";

export const metadata: Metadata = {
  title: "Supplies - Nextech General Trading",
  description:
    "Valves, piping, pumps, electrical equipment, instrumentation, heat transfer and process packages, chemicals and safety equipment for the United Arab Emirates energy sector.",
};

export default function Supplies() {
  return (
    <>
      <PageHero
        eyebrow="Supplies"
        title="Five Product Divisions,"
        accent="One Standard."
        copy="Everything we stock and source, grouped the way our engineers and principals work. Search the catalogue or jump straight to a division."
      />

      <CatalogueBrowser />

      <CtaBand />
    </>
  );
}
