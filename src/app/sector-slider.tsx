"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { Symbol, type IconName } from "./icons";
import { DIVISIONS, slugify } from "./nav";
import { Arrow, Ph } from "./ui";

/**
 * Reads DIVISIONS rather than keeping its own list: the same five divisions
 * are counted in the hero stats and listed in the footer, and three
 * hand-maintained copies is three chances to disagree.
 */
const SECTORS = DIVISIONS as readonly (readonly [string, string, IconName])[];
const wrap = (index: number) => ((index % SECTORS.length) + SECTORS.length) % SECTORS.length;

export default function SectorSlider() {
  const [{ index, instant }, setSelection] = useState({ index: 2, instant: false });
  const active = wrap(index);

  function select(target: number, keyboard = false) {
    let distance = wrap(target) - active;
    if (distance > 2) distance -= SECTORS.length;
    if (distance < -2) distance += SECTORS.length;
    setSelection({ index: index + distance, instant: keyboard });
  }

  return (
    <section
      className="sector-fan mt-12"
      aria-label="Explore our divisions"
      aria-roledescription="carousel"
      data-instant={instant}
      onKeyDown={(event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const target = event.key === "Home" ? 0 : event.key === "End" ? SECTORS.length - 1 : active + (event.key === "ArrowRight" ? 1 : -1);
        select(target, true);
      }}
    >
      <div className="sector-fan-stage">
        {/* Stable virtual keys slide naturally through the fan. Recycled cards
            enter outside the visible five slots, never across the centre. */}
        {Array.from({ length: 9 }, (_, position) => index + position - 4).map((virtualIndex) => {
          const distance = virtualIndex - index;
          const visible = Math.abs(distance) <= 2;
          const selected = distance === 0;
          const [title, copy, icon] = SECTORS[wrap(virtualIndex)];
          const style = {
            "--fan-offset": distance,
            "--fan-scale": selected ? 1 : Math.abs(distance) === 1 ? .92 : .87,
            "--fan-tilt": `${distance === 0 ? 0 : -Math.sign(distance) * 13}deg`,
            "--fan-drop": selected ? "0px" : "12px",
            zIndex: 5 - Math.abs(distance),
          } as CSSProperties;
          return (
            <article
              key={virtualIndex}
              className="sector-fan-card"
              style={style}
              data-visible={visible}
              data-selected={selected}
              aria-hidden={!visible}
              inert={!visible}
              aria-label={title}
            >
              <Ph className="absolute inset-0" />
              <div className="sector-fan-scrim" />
              <div className="sector-fan-copy">
                <Symbol name={icon} className="size-7 text-white/90" />
                <h3>{title}</h3>
                <p>{copy}</p>
                <Link
                  href={`/supplies#${slugify(title)}`}
                  tabIndex={selected ? 0 : -1}
                  aria-hidden={!selected}
                  aria-label={`Explore ${title}`}
                  className="sector-fan-arrow"
                ><Arrow /></Link>
              </div>
              {!selected && (
                <button
                  type="button"
                  tabIndex={visible ? 0 : -1}
                  onClick={(event) => select(virtualIndex, event.detail === 0)}
                  className="sector-fan-select"
                  aria-label={`Show ${title}`}
                />
              )}
            </article>
          );
        })}
      </div>
      <div className="sector-fan-pagination" aria-label="Choose a sector">
        {SECTORS.map(([title], i) => (
          <button
            key={title}
            type="button"
            aria-label={`Select ${title}`}
            aria-pressed={i === active}
            onClick={(event) => select(i, event.detail === 0)}
          ><span /></button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{SECTORS[active][0]}, {active + 1} of {SECTORS.length}</p>
    </section>
  );
}
