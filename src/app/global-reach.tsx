"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { GlobeMarker } from "@/components/ui/3d-globe";
import { COUNTRIES } from "./nav";

/**
 * three + drei + fiber is roughly half a megabyte. Loading it on the client
 * only, and only for this page, keeps it out of every other route's bundle.
 * ssr:false is also the honest setting: WebGL cannot run on the server, and
 * the country list beside it is the content that matters.
 */
const Globe3D = dynamic(
  () => import("@/components/ui/3d-globe").then((m) => m.Globe3D),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[420px] w-full lg:h-[520px]"
        aria-hidden
        role="presentation"
      />
    ),
  },
);

const flag = (code: string) => `https://flagcdn.com/w80/${code}.png`;

export default function GlobalReach() {
  // The globe spins by default. Someone who asked for reduced motion should
  // get a still Earth they can still drag, not a permanent animation.
  const [spin, setSpin] = useState(0.3);

  // The globe is decoration: the list beside it carries every fact it plots.
  // Gating it at lg means phones never pay the ~600KB three.js download for a
  // decorative canvas. Because the import lives inside a conditional render,
  // not fetching it is automatic.
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      setSpin(motion.matches ? 0 : 0.3);
      setShowGlobe(wide.matches);
    };
    apply();
    motion.addEventListener("change", apply);
    wide.addEventListener("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      wide.removeEventListener("change", apply);
    };
  }, []);

  const markers: GlobeMarker[] = useMemo(
    () =>
      COUNTRIES.map(([label, code, lat, lng]) => ({
        lat,
        lng,
        label,
        src: flag(code),
        // Upstream's 8px default renders a flag as an indistinct dot; much
        // past 16 and neighbouring markers collide around Europe and the Gulf.
        size: 16,
      })),
    [],
  );

  return (
    <section className="bg-gradient-to-b from-[var(--tint-a)] to-[var(--tint-b)] section-space">
      <div className="site-container grid items-center gap-12 lg:grid-cols-12">
        {/* Copy and the readable list. Ordered first in the DOM so the
            substance is what a screen reader and a crawler meet, and what
            renders if WebGL is unavailable. */}
        <div data-reveal className="lg:col-span-5">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-1 sm:text-4xl">
            Trading across <span className="text-brand">eleven countries</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-2">
            From our base in Abu Dhabi we source from and supply to markets
            across Europe, Asia, the Gulf and the Americas. These are the
            countries we actively trade in today.
          </p>

          <ul className="mt-9 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
            {COUNTRIES.map(([label, code]) => (
              <li
                key={code}
                className="flex items-center gap-3 border-b border-line py-2.5 text-sm text-text-1 last:border-b-0 sm:last:border-b"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flag(code)}
                  alt=""
                  width={20}
                  height={15}
                  loading="lazy"
                  className="h-[15px] w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/10"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Decoration. Hidden from assistive tech: every country it plots is
            already in the list above, so announcing a canvas adds nothing. */}
        <div
          data-reveal
          className="hidden lg:col-span-7 lg:block"
          aria-hidden
          role="presentation"
        >
          {showGlobe && (
            <Globe3D
              className="h-[420px] w-full lg:h-[520px]"
              markers={markers}
              config={{
                autoRotateSpeed: spin,
                showAtmosphere: true,
                atmosphereColor: "#02c1b3",
                // Low intensity with a soft falloff. Higher values read as a
                // solid teal rim rather than atmosphere.
                atmosphereIntensity: 0.45,
                atmosphereBlur: 3.6,
                bumpScale: 3,
                // The key light is fixed in world space while the camera orbits,
                // so a low ambient leaves the globe a black disc for half of every
                // revolution. Lift ambient enough that the facing side always reads.
                ambientIntensity: 1.15,
                pointLightIntensity: 1.1,
                // Open on Europe, the Gulf and South Asia, where most of these
                // markets are. Without this the first thing on screen is an
                // empty Pacific.
                initialRotation: { x: 0, y: -2.53 },
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
