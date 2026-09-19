import { CLIENTS, slugify } from "./nav";
import { Photo } from "./ui";

export default function ClientMarquee() {
  return (
    <div className="client-marquee mt-8">
      <div
        className="client-marquee-viewport"
        role="region"
        aria-label="Client logos"
        tabIndex={0}
      >
        <div className="client-marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="client-marquee-group"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {CLIENTS.map((name) => (
                <li
                  key={name}
                  className="flex h-24 w-40 shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-sm ring-1 ring-line"
                >
                  <Photo
                    src={`/logos/clients/${slugify(name)}.webp`}
                    alt={copy === 0 ? name : ""}
                    fit="contain"
                    loading="eager"
                    className="block h-20 min-h-0 w-full min-w-0"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
