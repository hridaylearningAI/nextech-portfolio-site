"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { Symbol, type IconName } from "./icons";
import { DIVISIONS, slugify } from "./nav";
import { Arrow, Photo } from "./ui";
import { divisionImage } from "./division-images";

/**
 * Reads DIVISIONS rather than keeping its own list: the same five divisions
 * are counted in the hero stats and listed in the footer, and three
 * hand-maintained copies is three chances to disagree.
 */
const SECTORS = DIVISIONS as readonly (readonly [string, string, IconName])[];
const wrap = (index: number) =>
  ((index % SECTORS.length) + SECTORS.length) % SECTORS.length;

/** Seconds a card holds the centre before the fan turns on its own. */
const AUTOPLAY_MS = 4000;

export default function SectorSlider() {
  const [{ index, instant }, setSelection] = useState({
    index: 2,
    instant: false,
  });
  const [paused, setPaused] = useState(false);
  const active = wrap(index);

  function select(target: number, keyboard = false) {
    let distance = wrap(target) - active;
    if (distance > 2) distance -= SECTORS.length;
    if (distance < -2) distance += SECTORS.length;
    setSelection({ index: index + distance, instant: keyboard });
  }

  // The fan turns by itself. `index` is a dependency so any manual pick — a
  // card, a dot, an arrow key — restarts the countdown rather than being
  // overtaken a moment later.
  useEffect(() => {
    if (paused) return;
    // Nothing here is essential, so someone who asked for less motion gets a
    // fan that only moves when they move it.
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let timer = 0;
    const advance = () => {
      // A hidden tab runs no transitions, so the cards would teleport several
      // places on return. Hold still until the tab is back in front.
      if (document.visibilityState !== "visible") return;
      setSelection((current) => ({ index: current.index + 1, instant: false }));
    };
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(advance, AUTOPLAY_MS);
    };

    const onMotionChange = () => {
      if (motion.matches) window.clearInterval(timer);
      else start();
    };

    start();
    // Restart on return so the next turn is a full beat away, not a leftover.
    document.addEventListener("visibilitychange", start);
    motion.addEventListener("change", onMotionChange);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", start);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [paused, index]);

  return (
    <section
      className="sector-fan mt-12"
      aria-label="Explore our divisions"
      aria-roledescription="carousel"
      data-instant={instant}
      // Hold still while someone is reading or tabbing through it: a carousel
      // that moves under a pointer or a focused control is a trap.
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
          return;
        event.preventDefault();
        const target =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? SECTORS.length - 1
              : active + (event.key === "ArrowRight" ? 1 : -1);
        select(target, true);
      }}
    >
      <div className="sector-fan-stage">
        {/* Stable virtual keys slide naturally through the fan. Recycled cards
            enter outside the visible five slots, never across the centre. */}
        {Array.from({ length: 9 }, (_, position) => index + position - 4).map(
          (virtualIndex) => {
            const distance = virtualIndex - index;
            const visible = Math.abs(distance) <= 2;
            const selected = distance === 0;
            const [title, copy, icon] = SECTORS[wrap(virtualIndex)];
            const style = {
              "--fan-offset": distance,
              "--fan-scale": selected
                ? 1
                : Math.abs(distance) === 1
                  ? 0.92
                  : 0.87,
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
                <Photo
                  src={divisionImage(slugify(title))}
                  className="absolute inset-0 size-full"
                />
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
                  >
                    <Arrow />
                  </Link>
                </div>
                {!selected && (
                  <button
                    type="button"
                    tabIndex={visible ? 0 : -1}
                    onClick={(event) =>
                      select(virtualIndex, event.detail === 0)
                    }
                    className="sector-fan-select"
                    aria-label={`Show ${title}`}
                  />
                )}
              </article>
            );
          },
        )}
      </div>
      <div className="sector-fan-pagination" aria-label="Choose a sector">
        {SECTORS.map(([title], i) => (
          <button
            key={title}
            type="button"
            aria-label={`Select ${title}`}
            aria-pressed={i === active}
            onClick={(event) => select(i, event.detail === 0)}
          >
            <span />
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {SECTORS[active][0]}, {active + 1} of {SECTORS.length}
      </p>
    </section>
  );
}
