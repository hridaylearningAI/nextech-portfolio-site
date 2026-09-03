"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

gsap.defaults({ duration: 0.7, ease: "power2.out" });

/**
 * Every animation on the site, mounted once in the root layout.
 *
 * Markup opts in with data attributes rather than each page importing a
 * wrapper component, so the pages stay server components:
 *   data-intro    — above the fold; staggers in on load and on every route change
 *   data-reveal   — below the fold; reveals once when scrolled into view
 *   data-parallax — drifts against the scroll direction
 *   data-count    — leading number counts up when scrolled into view
 *
 * Selectors are deliberately document-wide (that is the whole point of a
 * single global animator), so no `scope` is passed to useGSAP. Cleanup still
 * runs: revertOnUpdate reverts the context on every route change.
 */
export default function Motion() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useGSAP(
    () => {
      const isRouteChange = !firstRender.current;
      firstRender.current = false;

      // Tells the boot script's watchdog that GSAP took over, so it leaves the
      // pre-hide styles in place. See THEME_SCRIPT in layout.tsx.
      document.documentElement.dataset.motion = "on";

      const mm = gsap.matchMedia();

      // A matchMedia handler only runs while its query matches, so this builds
      // nothing at all for someone who asked for reduced motion — and reverts
      // itself if they turn the preference on later. globals.css lifts the
      // pre-hide under the exact complement of this query, so the two can never
      // both be false and leave content stranded invisible.
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          // A hidden tab gets no requestAnimationFrame ticks, so a tween built
          // there never advances and its target sits at the `from` state. That
          // is what a link-preview bot, screenshot service or prerendered tab
          // would capture: a blank page. When we can't animate, show outright.
          const animatable = document.visibilityState === "visible";

          // ── Page transition: content rises in, and on a route change the
          // whole page slides up behind it. ───────────────────────────────
          if (animatable) {
            const tl = gsap.timeline();

            if (isRouteChange) {
              tl.from("main", { y: 16, autoAlpha: 0, duration: 0.4 }, 0);
            }

            tl.fromTo(
              "[data-intro]",
              { autoAlpha: 0, y: 22 },
              { autoAlpha: 1, y: 0, stagger: 0.07 },
              isRouteChange ? 0.12 : 0,
            );
          } else {
            gsap.set("[data-intro]", { autoAlpha: 1, y: 0 });
          }

          // A ScrollTrigger only fires onEnter when it *crosses* its start
          // line. Anything already past that line when the trigger is built —
          // above-the-fold content, or the whole upper page when the browser
          // restores a scroll position — would sit hidden forever, so those
          // elements are animated directly instead.
          const alreadyPast = (el: Element, line: number) =>
            el.getBoundingClientRect().top < window.innerHeight * line;

          const revealIn = (els: Element[], delay = 0) =>
            document.visibilityState === "visible"
              ? gsap.fromTo(
                  els,
                  { autoAlpha: 0, y: 34 },
                  { autoAlpha: 1, y: 0, stagger: 0.09, delay, overwrite: true },
                )
              : gsap.set(els, { autoAlpha: 1, y: 0 });

          // ── Scroll reveals. batch() groups everything that crosses the line
          // within the same interval so a row of cards staggers together
          // instead of firing as four unrelated tweens. ────────────────────
          ScrollTrigger.batch("[data-reveal]", {
            start: "top 88%",
            once: true,
            onEnter: (els) => revealIn(els),
          });

          const visibleAtLoad = gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .filter((el) => alreadyPast(el, 0.88));
          if (visibleAtLoad.length) revealIn(visibleAtLoad, 0.15);

          // ── Parallax on the hero artwork. ────────────────────────────────
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            gsap.to(el, {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          });

          // ── Stat counters. Only the leading integer animates; whatever
          // trails it ("+", "hr", "%") is preserved. ───────────────────────
          gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
            // Stashed on the node the first time, because the effect can re-run
            // (StrictMode, Fast Refresh) while a count is in flight — reading
            // the live text again would take "0+" as the target and stick.
            const original = el.dataset.countFrom ?? el.textContent ?? "";
            el.dataset.countFrom = original;

            const parsed = original.match(/^(\d+)(.*)$/);
            if (!parsed) return;

            const target = Number(parsed[1]);
            const suffix = parsed[2];
            const counter = { value: 0 };

            // Built paused so it never renders "0+" over the real figure before
            // it is triggered — the stats bar sits above the fold on the home
            // page, where that was plainly visible.
            const count = gsap.to(counter, {
              value: target,
              duration: 1.4,
              ease: "power2.out",
              paused: true,
              onUpdate: () => {
                el.textContent = Math.round(counter.value) + suffix;
              },
              // The tween can be killed mid-count by a route change; make sure
              // the final figure is exact rather than whatever rounding left.
              onComplete: () => {
                el.textContent = original;
              },
            });

            if (alreadyPast(el, 0.92)) {
              count.play();
            } else {
              ScrollTrigger.create({
                trigger: el,
                start: "top 92%",
                once: true,
                onEnter: () => count.play(),
              });
            }
          });

          // ── Reading-progress bar. ────────────────────────────────────────
          gsap.fromTo(
            "#scroll-progress",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
            },
          );

          // ── Header picks up a shadow once you leave the top. ─────────────
          ScrollTrigger.create({
            start: 60,
            end: "max",
            toggleClass: { targets: "header", className: "is-scrolled" },
          });
        },
      );

      return () => {
        mm.revert();
        // A count killed part-way would otherwise be left reading "7+".
        document
          .querySelectorAll<HTMLElement>("[data-count]")
          .forEach((el) => {
            if (el.dataset.countFrom) el.textContent = el.dataset.countFrom;
          });
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div
      id="scroll-progress"
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-brand"
    />
  );
}
