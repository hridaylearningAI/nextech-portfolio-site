"use client";

import {
  IconAnchor,
  IconBarrel,
  IconBolt,
  IconBuildingFactory2,
  IconCompass,
  IconCrane,
  IconDroplet,
  IconFlame,
  IconFlask,
  IconGasStation,
  IconGauge,
  IconHelmet,
  IconLeaf,
  IconPlug,
  IconRuler2,
  IconSettings,
  IconShip,
  IconTool,
  IconTruckDelivery,
  IconWindmill,
  IconWorld,
} from "@tabler/icons-react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_FLAT } from "./nav";

/**
 * Page transition.
 *
 * Choreography, on a plain in-app link click:
 *   1. A teal wave, then an ink wave, rise over the page. Their top edge bulges
 *      as it climbs and flattens as it lands, so the cover reads as liquid
 *      rather than a sliding rectangle. The page behind sinks back as it goes.
 *   2. A wall of industry doodles (valves, gauges, rigs, ships, droplets) draws
 *      itself stroke by stroke with DrawSVG, rippling out from the centre, the
 *      way the doodles on a WhatsApp chat backdrop look hand sketched.
 *   3. The destination's name rises letter by letter through SplitText masks,
 *      and a teal rule draws under it, so the cover says where you are going.
 *   4. Once the next page has rendered, and the cover has been up long enough
 *      for the doodles to finish, everything reverses: letters lift away, the
 *      strokes un-draw, the ink wave drains upward with its centre lagging,
 *      the teal trails it, and the new page rises into place.
 *
 * Why it intercepts clicks: the App Router has no "about to leave" hook, so
 * the only way to cover the old page before it disappears is to catch the
 * link click first. The listener runs in the capture phase on document and
 * stops propagation, because Next's Link navigates even for a click that was
 * already preventDefault-ed.
 *
 * It stays out of the way for everything that is not a plain in-app page
 * change: modified clicks, target=_blank, downloads, external links, hash
 * jumps on the current page, reduced motion, and hidden tabs. Back/forward
 * never goes through a click, so it keeps the lighter fade in motion.tsx.
 *
 * Correctness never depends on animation frames. Navigation runs on a plain
 * timer, a fallback lifts the cover if the route never changes, and a reveal
 * in a hidden tab jumps straight to the end.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, DrawSVGPlugin, SplitText);
}

/** Created on first use rather than at module load, so SSR never parses them. */
let easesReady = false;
function ensureEases() {
  if (easesReady) return;
  // The curtain: slow off the mark, fast through the middle, a soft landing.
  CustomEase.create("nt-curtain", "0.76, 0, 0.24, 1");
  // Things arriving: most of the travel early, a long settle.
  CustomEase.create("nt-arrive", "0.22, 1, 0.36, 1");
  easesReady = true;
}

// ── Tunables ────────────────────────────────────────────────────────────────

/** Seconds until the ink wave fully covers the page; navigation starts here. */
const COVER_S = 0.64;
/**
 * Minimum seconds the cover stays up, so the doodles and title finish. The
 * title's letters share a fixed stagger budget (below), so the last letter of
 * even a long name like "Industries & Clients" has landed by this point.
 */
const MIN_HOLD_S = 1.1;
/** Longest we will wait for the route to change before lifting the cover. */
const FALLBACK_MS = 3000;
/** Grid pitch in px for the doodle wall. */
const CELL = 104;
/** Empty ellipse behind the title, as half-width / half-height in px. */
const CLEARING = { x: 250, y: 120 };

// Wave shapes, in a 0-100 viewBox stretched to the viewport. Every shape uses
// the same commands in the same order, so GSAP interpolates the numbers in
// the path directly; no MorphSVG needed.
/** Anchored at the bottom: flat, then bulging up, then covering everything. */
const RISE = {
  flat: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
  bulge: "M 0 100 V 55 Q 50 5 100 55 V 100 z",
  full: "M 0 100 V 0 Q 50 0 100 0 V 100 z",
};
/** Anchored at the top: full, then draining with the centre lagging, gone. */
const DRAIN = {
  full: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
  sag: "M 0 0 V 45 Q 50 95 100 45 V 0 z",
  gone: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
};

// ── Doodle wall ─────────────────────────────────────────────────────────────

/** Line icons, stroke based so DrawSVG can draw them (fills cannot be drawn). */
const DOODLES = [
  IconTool,
  IconGauge,
  IconBolt,
  IconDroplet,
  IconShip,
  IconFlask,
  IconBuildingFactory2,
  IconSettings,
  IconWorld,
  IconHelmet,
  IconPlug,
  IconCrane,
  IconRuler2,
  IconCompass,
  IconLeaf,
  IconBarrel,
  IconWindmill,
  IconTruckDelivery,
  IconGasStation,
  IconAnchor,
  IconFlame,
];

type Doodle = {
  icon: number;
  left: number;
  top: number;
  size: number;
  rotate: number;
  /** Distance from the centre, 0 to 1. Drives the outward ripple. */
  dist: number;
};

/**
 * Seeded PRNG so the wall is identical on every transition: a stable pattern
 * reads as a designed backdrop, a reshuffle every click reads as noise.
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildWall(width: number, height: number): Doodle[] {
  const rand = mulberry32(20260914);
  const cols = Math.ceil(width / CELL) + 1;
  const rows = Math.ceil(height / CELL) + 1;
  const cx = width / 2;
  const cy = height / 2;
  const maxDist = Math.hypot(cx, cy);
  const doodles: Doodle[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Draw every random number whether or not the cell is kept, so the
      // pattern outside the clearing is the same at any viewport size.
      const icon = Math.floor(rand() * DOODLES.length);
      // Every other row shifts half a cell, brick style: no column grid, so
      // the wall reads as scattered by hand rather than tiled.
      const shift = row % 2 ? CELL / 2 : 0;
      const left = col * CELL - shift + rand() * 30 - 15;
      const top = row * CELL + rand() * 30 - 15;
      const size = 26 + Math.round(rand() * 16);
      const rotate = Math.round(rand() * 50 - 25);

      const dx = left + size / 2 - cx;
      const dy = top + size / 2 - cy;
      if ((dx / CLEARING.x) ** 2 + (dy / CLEARING.y) ** 2 < 1) continue;

      doodles.push({
        icon,
        left,
        top,
        size,
        rotate,
        dist: Math.min(1, Math.hypot(dx, dy) / maxDist),
      });
    }
  }
  return doodles;
}

// ── Destination labels ──────────────────────────────────────────────────────

const LABELS: Record<string, string> = {
  "/": "Home",
  "/terms": "Terms of Service",
  "/privacy": "Privacy Policy",
  ...Object.fromEntries(NAV_FLAT.map((item) => [item.href, item.label])),
};

function labelFor(pathname: string) {
  if (LABELS[pathname]) return LABELS[pathname];
  const last = pathname.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Reads a doodle's ripple distance from the element or its wrapper. */
const distOf = (el: Element) =>
  Number(
    (el.closest("[data-doodle]") as HTMLElement | null)?.dataset.dist ?? 0,
  );

// ── Component ───────────────────────────────────────────────────────────────

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const overlay = useRef<HTMLDivElement>(null);
  const accentWave = useRef<SVGPathElement>(null);
  const inkWave = useRef<SVGPathElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const wall = useRef<HTMLDivElement>(null);
  const eyebrow = useRef<HTMLParagraphElement>(null);
  const title = useRef<HTMLSpanElement>(null);
  const rule = useRef<HTMLSpanElement>(null);

  const busy = useRef(false);
  const fromPath = useRef("");
  const startedAt = useRef(0);
  const split = useRef<SplitText | null>(null);
  const coverTimeline = useRef<gsap.core.Timeline | null>(null);
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Client-only and sized to the viewport: nothing in the server HTML, and no
  // more doodles than the screen can show.
  const [doodles, setDoodles] = useState<Doodle[]>([]);
  useEffect(() => {
    const size = () =>
      setDoodles(buildWall(window.innerWidth, window.innerHeight));
    size();
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(size);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const clearTimers = useCallback(() => {
    for (const t of [navTimer, holdTimer, fallback]) {
      if (t.current) clearTimeout(t.current);
      t.current = null;
    }
  }, []);

  const reveal = useCallback(() => {
    clearTimers();
    // The cover's hold drift (and any doodles still drawing) would fight the
    // exit tweens; stop that timeline outright.
    coverTimeline.current?.kill();
    coverTimeline.current = null;

    const root = document.documentElement;
    root.dataset.pageTransition = "revealing";
    const main = document.querySelector("main");
    // The same <main> survives the route change with the new page inside it,
    // still carrying the old page's sink. Clear it before the rise-in.
    gsap.set(main, { clearProps: "transform,transformOrigin" });

    const finish = () => {
      gsap.set(overlay.current, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(wall.current, { clearProps: "opacity,visibility,transform" });
      // The entrance normally runs below; this guarantees the new page's
      // intro is visible if we got here by skipping it (hidden tab).
      gsap.set("[data-intro]", { autoAlpha: 1, y: 0 });
      gsap.set(main, { clearProps: "transform,transformOrigin" });
      split.current?.revert();
      split.current = null;
      delete root.dataset.pageTransition;
      busy.current = false;
    };

    // No animation frames in a hidden tab: a timeline would never finish and
    // the overlay would stay over the page. Jump straight to the end.
    if (document.visibilityState !== "visible") {
      finish();
      return;
    }

    const paths = wall.current?.querySelectorAll("path") ?? [];
    gsap.set([accentWave.current, inkWave.current], {
      attr: { d: DRAIN.full },
    });

    gsap
      .timeline({ onComplete: finish })
      // Title lifts away, letters leaving in the order they arrived.
      .to(
        split.current?.chars ?? [],
        { yPercent: -110, duration: 0.34, ease: "power3.in", stagger: 0.014 },
        0,
      )
      .to(
        [eyebrow.current, rule.current, glow.current],
        { autoAlpha: 0, duration: 0.24, ease: "power1.in" },
        0,
      )
      // Strokes un-draw towards their ends, outer doodles first, so the wall
      // collapses inward as the ripple reverses.
      .to(
        paths,
        {
          drawSVG: "100% 100%",
          duration: 0.34,
          ease: "power2.in",
          stagger: (_i: number, el: Element) => (1 - distOf(el)) * 0.12,
        },
        0,
      )
      .to(
        wall.current,
        { autoAlpha: 0, duration: 0.3, ease: "power1.in" },
        0.12,
      )
      // Ink drains first; its centre lags behind the sides like liquid.
      .to(
        inkWave.current,
        { attr: { d: DRAIN.sag }, duration: 0.28, ease: "power2.in" },
        0.16,
      )
      .to(
        inkWave.current,
        { attr: { d: DRAIN.gone }, duration: 0.32, ease: "power2.out" },
        0.44,
      )
      // Teal trails it, showing as a sliver at the retreating edge.
      .to(
        accentWave.current,
        { attr: { d: DRAIN.sag }, duration: 0.28, ease: "power2.in" },
        0.24,
      )
      .to(
        accentWave.current,
        { attr: { d: DRAIN.gone }, duration: 0.32, ease: "power2.out" },
        0.52,
      )
      // The new page rises into the space the wave leaves behind.
      .fromTo(
        main,
        { y: 90 },
        { y: 0, duration: 0.9, ease: "nt-arrive", clearProps: "transform" },
        0.18,
      )
      .fromTo(
        "[data-intro]",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "nt-arrive",
          stagger: 0.06,
        },
        0.36,
      );
  }, [clearTimers]);

  const cover = useCallback(
    (href: string) => {
      ensureEases();
      busy.current = true;
      fromPath.current = window.location.pathname;
      startedAt.current = performance.now();
      document.documentElement.dataset.pageTransition = "covering";

      // Title for where we are going, split fresh each time.
      const destination = new URL(href, window.location.href).pathname;
      split.current?.revert();
      split.current = null;
      if (title.current) {
        title.current.textContent = labelFor(destination);
        split.current = SplitText.create(title.current, {
          type: "words,chars",
          mask: "chars",
        });
      }

      const paths = wall.current?.querySelectorAll("path") ?? [];
      const items = wall.current?.querySelectorAll("[data-doodle]") ?? [];
      const main = document.querySelector("main");
      // Sink towards the middle of what is on screen, not the top of <main>.
      const origin = main
        ? `50% ${window.innerHeight / 2 - main.getBoundingClientRect().top}px`
        : "50% 50%";

      gsap.set(overlay.current, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set([accentWave.current, inkWave.current], {
        attr: { d: RISE.flat },
      });
      gsap.set(wall.current, { autoAlpha: 1, y: 0 });

      coverTimeline.current = gsap
        .timeline()
        // The page behind sinks back as the waves come up over it.
        .to(
          main,
          {
            y: -50,
            scale: 0.95,
            transformOrigin: origin,
            duration: COVER_S,
            ease: "nt-curtain",
          },
          0,
        )
        // Teal leads, ink follows a beat behind: two waves, one motion.
        .to(
          accentWave.current,
          { attr: { d: RISE.bulge }, duration: 0.28, ease: "power2.in" },
          0,
        )
        .to(
          accentWave.current,
          { attr: { d: RISE.full }, duration: 0.3, ease: "power2.out" },
          0.28,
        )
        .to(
          inkWave.current,
          { attr: { d: RISE.bulge }, duration: 0.28, ease: "power2.in" },
          0.06,
        )
        .to(
          inkWave.current,
          { attr: { d: RISE.full }, duration: 0.3, ease: "power2.out" },
          0.34,
        )
        .fromTo(
          glow.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 },
          0.34,
        )
        // Doodles sketch themselves, rippling outward from the title.
        .fromTo(
          items,
          { autoAlpha: 0, scale: 0.72 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: "nt-arrive",
            stagger: (_i: number, el: Element) => distOf(el) * 0.34,
          },
          0.28,
        )
        .fromTo(
          paths,
          { drawSVG: "0% 0%" },
          {
            drawSVG: "0% 100%",
            duration: 0.5,
            ease: "power2.inOut",
            stagger: (_i: number, el: Element) => distOf(el) * 0.34,
          },
          0.28,
        )
        // Destination name: eyebrow, letters rising through their masks, rule.
        .fromTo(
          eyebrow.current,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "nt-arrive" },
          0.4,
        )
        .fromTo(
          split.current?.chars ?? [],
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.6,
            ease: "nt-arrive",
            // A total, not per letter: a per-letter delay made long names
            // finish after the reveal had already started.
            stagger: { amount: 0.25 },
          },
          0.36,
        )
        .fromTo(
          rule.current,
          { scaleX: 0, autoAlpha: 1 },
          { scaleX: 1, duration: 0.7, ease: "nt-curtain" },
          0.58,
        )
        // Slow drift while the next page loads, so a longer wait still moves.
        .to(wall.current, { y: -16, duration: 2.6, ease: "sine.inOut" }, 0.3);

      // Navigate once the page is covered. On a plain timer, not on the
      // timeline: if frames stall (tab hidden mid-click, busy main thread) the
      // page must still change underneath.
      navTimer.current = setTimeout(() => {
        try {
          router.push(href);
        } catch {
          reveal();
        }
      }, COVER_S * 1000);

      // Safety net from the moment of the click: never leave the cover up.
      fallback.current = setTimeout(reveal, COVER_S * 1000 + FALLBACK_MS);
    },
    [router, reveal],
  );

  // Lift the cover once the route has changed underneath it, but not before
  // the minimum hold: a prefetched page lands in milliseconds, and lifting
  // then would erase the doodles before they finished drawing. Any route
  // change counts, not only the target: a redirect lands somewhere else.
  useEffect(() => {
    if (!busy.current || pathname === fromPath.current) return;
    const elapsed = performance.now() - startedAt.current;
    const wait = Math.max(0, MIN_HOLD_S * 1000 - elapsed);
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(reveal, wait);
  }, [pathname, reveal]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      // Already mid-transition: swallow further clicks rather than queueing.
      if (busy.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.dataset.noTransition !== undefined) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page, including #hash jumps like the contact form's anchor.
      if (url.pathname === window.location.pathname) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // A hidden tab gets no animation frames; the cover would never play.
      if (document.visibilityState !== "visible") return;

      e.preventDefault();
      e.stopPropagation();
      cover(url.pathname + url.search + url.hash);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [cover]);

  useEffect(
    () => () => {
      clearTimers();
      split.current?.revert();
    },
    [clearTimers],
  );

  return (
    <div
      ref={overlay}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      style={{ visibility: "hidden", opacity: 0 }}
    >
      {/* The waves. Teal first in source order so the ink paints over it. */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path ref={accentWave} d={RISE.flat} style={{ fill: "var(--brand)" }} />
        <path ref={inkWave} d={RISE.flat} style={{ fill: "var(--ink)" }} />
      </svg>

      <div
        ref={glow}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(2,193,179,0.2),transparent_60%)]"
        style={{ visibility: "hidden", opacity: 0 }}
      />

      {/* Doodle wall: tone on tone, like a chat backdrop. */}
      <div
        ref={wall}
        className="absolute inset-0 text-[var(--brand)] opacity-[0.3]"
      >
        {doodles.map((d, i) => {
          const Glyph = DOODLES[d.icon];
          return (
            <span
              key={i}
              className="absolute"
              style={{
                left: d.left,
                top: d.top,
                transform: `rotate(${d.rotate}deg)`,
              }}
            >
              {/* Rotation lives on the wrapper, so GSAP can scale this inner
                  node without overwriting the angle. */}
              <span
                data-doodle
                data-dist={d.dist.toFixed(3)}
                className="block"
                style={{ visibility: "hidden", opacity: 0 }}
              >
                <Glyph size={d.size} stroke={1.25} />
              </span>
            </span>
          );
        })}
      </div>

      {/* Where you are going. */}
      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="flex flex-col items-center text-center">
          <p
            ref={eyebrow}
            className="text-[11px] font-semibold tracking-[0.28em] text-white/55 uppercase"
            style={{ visibility: "hidden", opacity: 0 }}
          >
            Nextech General Trading
          </p>
          {/* No React children: SplitText rewrites this node, and React must
              not own content that GSAP replaces. Text is set imperatively. */}
          <span
            ref={title}
            className="mt-4 block text-5xl leading-[1.05] font-bold tracking-tight text-white [font-kerning:none] sm:text-7xl"
          />
          <span
            ref={rule}
            className="mt-6 block h-px w-24 origin-center bg-[var(--brand)]"
            style={{ visibility: "hidden", opacity: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
