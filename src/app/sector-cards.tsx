import Link from "next/link";
import { ICONS, Icon } from "./icons";
import { INDUSTRIES } from "./nav";
import { Arrow, Ph } from "./ui";

export default function SectorCards() {
  return (
    <div className="sector-neu-grid mt-14 grid gap-7 text-left sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {INDUSTRIES.map(([title, copy, icon]) => (
        <Link
          key={title}
          href="/industries-clients"
          data-reveal
          className="sector-neu-card"
        >
          <div className="sector-neu-content">
            <span className="sector-neu-icon">
              <Icon className="size-7">{ICONS[icon]}</Icon>
            </span>
            <h3 className="sector-neu-title">{title}</h3>
            <p className="sector-neu-copy">{copy}</p>
            <span className="sector-neu-arrow"><Arrow /></span>
          </div>
          {/* Replace with a bottom-aligned sector cutout when imagery is ready.
              Keep this fade so the photograph blends into the raised surface. */}
          <Ph className="sector-neu-art" />
        </Link>
      ))}
    </div>
  );
}
