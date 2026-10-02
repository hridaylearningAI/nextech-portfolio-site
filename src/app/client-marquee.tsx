"use client";

import { useEffect, useRef } from "react";
import { HOME_CLIENTS } from "./nav";
import { Photo } from "./ui";

/**
 * The client logos on the home page, as a marquee that only runs while the
 * band is on screen: a visitor who scrolls down to it starts at the first
 * logo rather than wherever an always-running animation had drifted to.
 *
 * The row holds two copies of the roster and slides exactly one copy's width,
 * so the loop point is invisible; the second copy is hidden from assistive
 * tech since it repeats what the first already said.
 */
export default function ClientMarquee() {
  const strip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      el.classList.toggle("is-running", entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={strip} className="client-strip mt-8">
      <ul className="client-strip-row">
        {[0, 1].flatMap((copy) =>
          HOME_CLIENTS.map(([name, logo]) => (
            <li
              key={`${copy}-${name}`}
              aria-hidden={copy === 1 || undefined}
              className="flex h-24 w-40 shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-sm ring-1 ring-line"
            >
              <Photo
                src={`/logos/clients/${logo}.webp`}
                alt={copy === 0 ? name : ""}
                fit="contain"
                loading="eager"
                className="block h-20 min-h-0 w-full min-w-0"
              />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
