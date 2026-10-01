import { HOME_CLIENTS } from "./nav";
import { Photo } from "./ui";

/**
 * The client logos on the home page. A still, centred row rather than a
 * scrolling marquee: with eight logos they all fit, and a visitor who reaches
 * this band should see the whole roster — not whichever logos the animation
 * happened to have on screen at that moment.
 *
 * Below lg the row scrolls sideways by hand instead of wrapping, so the band
 * keeps its height on a phone.
 */
export default function ClientMarquee() {
  return (
    <div className="client-strip mt-8">
      <ul className="client-strip-row">
        {HOME_CLIENTS.map(([name, logo]) => (
          <li
            key={name}
            className="flex h-24 w-40 shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-sm ring-1 ring-line"
          >
            <Photo
              src={`/logos/clients/${logo}.webp`}
              alt={name}
              fit="contain"
              loading="eager"
              className="block h-20 min-h-0 w-full min-w-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
