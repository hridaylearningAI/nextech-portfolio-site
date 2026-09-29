import Link from "next/link";
import { ICONS, Icon } from "./icons";
import { INDUSTRIES, slugify } from "./nav";
import { Photo } from "./ui";

/**
 * Raised industry cards: icon, sector name and the photograph. No caption or
 * arrow — the name carries the card and the whole panel is the link.
 */
export default function SectorCards() {
  return (
    <div className="sector-neu-grid mt-14 grid gap-7 text-left sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {INDUSTRIES.map(([title, , icon]) => (
        <Link
          key={title}
          href="/clients"
          data-reveal
          className="sector-neu-card"
        >
          <div className="sector-neu-content">
            <span className="sector-neu-icon">
              <Icon className="size-7">{ICONS[icon]}</Icon>
            </span>
            <h3 className="sector-neu-title">{title}</h3>
          </div>
          <div className="sector-neu-media">
            <div className="sector-neu-image-wrap">
              <Photo
                src={`/images/industries/${slugify(title)}.webp`}
                className="sector-neu-art"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
