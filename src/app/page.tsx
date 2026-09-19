import { Symbol } from "./icons";
import Link from "next/link";
import AboutIntro from "./about-intro";
import IndustriesSection from "./industries-section";
import VideoHero from "./video-hero";
import SectorSlider from "./sector-slider";
import { STATS } from "./nav";
import ClientMarquee from "./client-marquee";
import { Arrow, CtaBand, Eyebrow, Photo } from "./ui";

export default function Home() {
  return (
    <>
      <VideoHero />
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[var(--tint-a)] via-[var(--tint-b)] to-[var(--surface)]">
        {/*
          The clip belongs on this wrapper rather than the section. It has to
          contain the artwork's parallax drift, but the stats bar below sits
          deliberately half outside the section, and a clip on the section cuts
          it in half.
        */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Hero artwork bleeds off the right edge of the viewport. */}
          <Photo
            src="/images/hero-offshore.webp"
            alt="An offshore oil and gas platform surrounded by blue water"
            loading="eager"
            fetchPriority="high"
            data-parallax
            className="absolute inset-y-0 right-0 hidden h-full w-[58%] [mask-image:linear-gradient(to_right,transparent,black_30%)] lg:block"
          />
        </div>
        <div className="site-container relative grid items-center gap-[clamp(1.5rem,3vw,4rem)] pt-16 pb-40 lg:grid-cols-2 lg:pb-48">
          <div>
            <span
              data-intro
              className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-1.5 text-xs font-medium text-text-1 shadow-sm ring-1 ring-line"
            >
              <span className="size-1.5 rounded-full bg-brand" />
              Trusted. Reliable. Global.
            </span>

            <h1
              data-intro
              className="mt-6 text-5xl font-bold leading-[1.08] tracking-tight text-text-1 sm:text-6xl"
            >
              Fueling Industries.
              <br />
              <span className="text-brand">Powering Tomorrow.</span>
            </h1>

            <p
              data-intro
              className="mt-6 max-w-md text-base leading-relaxed text-text-2"
            >
              Delivering top-quality products and services to the Oil and Gas,
              Refinery, and Power generation sectors in the United Arab
              Emirates.
            </p>

            <div data-intro className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 btn bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark"
              >
                Explore Solutions <Arrow />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center btn border border-brand bg-surface-2 px-6 py-3.5 text-sm font-medium text-brand hover:bg-[var(--tint-b)]"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>

          <div className="relative">
            <Photo
              src="/images/hero-offshore.webp"
              alt="An offshore oil and gas platform surrounded by blue water"
              loading="eager"
              className="aspect-[4/3] w-full rounded-xl lg:hidden"
            />
            <div
              data-intro
              className="mt-4 flex items-start gap-2 lg:absolute lg:-top-24 lg:right-0 lg:mt-0"
            >
              <span className="mt-1.5 size-2 rounded-full ring-2 ring-brand" />
              <div>
                <p className="text-xs font-semibold text-text-1">
                  Global Reach
                </p>
                <p className="text-xs leading-snug text-text-2">
                  Delivering value
                  <br />
                  across the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar, overlapping the hero base */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2">
          <div className="site-container">
            <dl
              data-intro
              className="grid grid-cols-2 gap-y-6 rounded-[18px] bg-surface-2/95 p-8 shadow-xl ring-1 ring-line backdrop-blur sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-line"
            >
              {STATS.map(([value, label, icon]) => (
                <div key={label} className="flex items-center gap-4 lg:px-6">
                  <Symbol name={icon} className="size-10 text-brand" />
                  <div>
                    <dt data-count className="text-2xl font-bold text-text-1">
                      {value}
                    </dt>
                    <dd className="text-xs leading-snug text-text-2">
                      {label}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <AboutIntro />
      {/* ── What we supply: the five divisions ─────────────── */}
      <section className="bg-gradient-to-b from-[var(--tint-c)] to-[var(--tint-d)] section-space">
        <div className="site-container text-center">
          <div data-reveal>
            <h2 className="text-4xl font-bold tracking-tight text-text-1">
              Five Product Divisions,{" "}
              <span className="text-brand">One Standard</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-2">
              Mechanical and flow control, electrical, instrumentation, heavy
              process equipment and chemicals, supplied with the technical
              expertise of the principals we represent.
            </p>
          </div>
          <SectorSlider />
        </div>
      </section>

      <IndustriesSection />

      {/* ── Clients ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[var(--tint-c)] via-[var(--tint-d)] to-[var(--tint-a)] py-12">
        <div className="site-container">
          <h2
            data-reveal
            className="text-center text-lg font-semibold text-text-1"
          >
            Trusted by Industry Leaders Worldwide
          </h2>
          <ClientMarquee />
        </div>
      </section>

      {/* ── Sustainability ─────────────────────────────────── */}
      <section className="grid bg-surface-2 lg:grid-cols-2">
        <Photo
          src="/images/sustainability.webp"
          data-reveal
          className="min-h-[320px] w-full"
        />
        <div className="flex items-center bg-gradient-to-br from-[var(--surface)] to-[var(--tint-b)] px-6 py-16 lg:px-16">
          <div data-reveal className="max-w-lg">
            <Eyebrow>Sustainable future</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-text-1">
              Driving a Sustainable
              <br />
              and Responsible Tomorrow
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-2">
              With a decade of dedicated service, we deliver excellence, safety,
              and sustainability, contributing to the growth and prosperity of
              the United Arab Emirates.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 px-4 py-3 shadow-sm">
                <Symbol name="leaf" className="size-8 text-brand" />
                <p className="text-xs leading-snug text-text-2">
                  Building today for
                  <br />a better tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
