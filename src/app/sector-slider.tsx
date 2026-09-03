"use client";

import { useState } from "react";
import { Arrow, Ph } from "./ui";

/** Sectors drawn from the company's own description of who it supplies. */
const SECTORS = [
  ["Upstream", "Supporting exploration and production operations across the Emirates."],
  ["Oil & Gas", "Top-quality products and services for the region's operators."],
  ["Refinery", "Equipment and spares that keep refining operations running."],
  ["Power Generation", "Supply for power producers and utility-scale facilities."],
  ["Downstream", "Representing manufacturers serving downstream industry."],
];

/**
 * Slot geometry, keyed by a card's signed distance from the active one.
 * The first neighbour clears the wider active card; the rest step evenly.
 * Tilt comes from the container's 900px perspective, so rotateY reads as real
 * foreshortening rather than a flat spin.
 */
function slot(d: number) {
  const x = d === 0 ? 0 : Math.sign(d) * (267 + (Math.abs(d) - 1) * 234);
  return {
    transform: `translate(-50%, -50%) translateX(${x}px) rotateY(${-d * 10}deg) rotateZ(${d * 0.75}deg) translateZ(${d === 0 ? 40 : 0}px)`,
    zIndex: 10 - Math.abs(d),
  };
}

export default function SectorSlider() {
  const [active, setActive] = useState(2);
  const half = Math.floor(SECTORS.length / 2);

  return (
    <>
      <div className="relative mt-14 h-[480px] overflow-hidden [perspective:900px] [transform-style:preserve-3d]">
        {SECTORS.map(([title, copy], i) => {
          // Shortest signed distance to the active card, so the fan wraps around.
          let d = i - active;
          if (d > half) d -= SECTORS.length;
          if (d < -half) d += SECTORS.length;
          const isActive = d === 0;

          return (
            <article
              key={title}
              style={slot(d)}
              className={`absolute top-1/2 left-1/2 overflow-hidden rounded-2xl text-left transition-[transform,width,height] duration-500 ease-out ${
                isActive
                  ? "h-[460px] w-[280px] shadow-2xl"
                  : "h-[430px] w-[215px] shadow-xl"
              }`}
            >
              <Ph className="absolute inset-0" />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  isActive
                    ? "from-slate-950/90 via-slate-900/45 to-slate-900/10"
                    : "from-slate-950/85 via-slate-900/40 to-transparent"
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <Ph className="size-6 rounded opacity-40" />
                <h3
                  className={`mt-3 font-semibold leading-tight text-white ${
                    isActive ? "text-lg" : "text-base"
                  }`}
                >
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  {copy}
                </p>
                <span
                  className={`mt-4 inline-flex size-9 items-center justify-center rounded-full ${
                    isActive
                      ? "bg-surface-2 text-brand"
                      : "bg-surface-2/20 text-white ring-1 ring-white/40"
                  }`}
                >
                  <Arrow />
                </span>
              </div>

              {/* Off-centre cards are the slider's own controls. */}
              {!isActive && (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="absolute inset-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  <span className="sr-only">Show {title}</span>
                </button>
              )}
            </article>
          );
        })}
      </div>

      {/* Dots read as 8px but carry a 44px hit area. */}
      <div className="mt-6 flex justify-center">
        {SECTORS.map(([title], i) => (
          <button
            key={title}
            type="button"
            aria-label={`Show ${title}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className="grid h-11 w-7 cursor-pointer place-items-center"
          >
            <span
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-brand" : "w-2 bg-text-2/45"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
