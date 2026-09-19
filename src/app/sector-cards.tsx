import Link from "next/link";
import { ICONS, Icon } from "./icons";
import { INDUSTRIES, slugify } from "./nav";
import { Arrow, Photo } from "./ui";

/**
 * Raised industry cards with a photograph sculpted around the arrow control.
 * The whole card remains a single link, including the decorative arrow.
 */
export default function SectorCards() {
  return (
    <div className="sector-neu-grid mt-14 grid gap-7 text-left sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {INDUSTRIES.map(([title, copy, icon]) => (
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
            <p className="sector-neu-copy">{copy}</p>
          </div>
          <div className="sector-neu-media">
            <div className="sector-neu-image-wrap">
              <Photo
                src={`/images/industries/${slugify(title)}.webp`}
                className="sector-neu-art"
              />
            </div>
            <span className="sector-neu-arrow" aria-hidden="true">
              <Arrow />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
