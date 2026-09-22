import type { Metadata } from "next";
import { CtaBand } from "../ui";
import CatalogueBrowser from "./catalogue-browser";

export const metadata: Metadata = {
  title: "Supplies - Nextech General Trading",
  description:
    "Valves, piping, pumps, electrical equipment, instrumentation, heat transfer and process packages, chemicals and safety equipment for the United Arab Emirates energy sector.",
};

export default function Supplies() {
  return (
    <>
      <CatalogueBrowser />

      <CtaBand />
    </>
  );
}
