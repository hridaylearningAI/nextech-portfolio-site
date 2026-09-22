import { Symbol } from "./icons";
import AboutIntro from "./about-intro";
import IndustriesSection from "./industries-section";
import VideoHero from "./video-hero";
import SectorSlider from "./sector-slider";
import { STATS } from "./nav";
import ClientMarquee from "./client-marquee";
import { CtaBand, Eyebrow, Photo } from "./ui";

export default function Home() {
  return (
    <>
      <VideoHero />
      {/* ── Stats: directly under the full-screen video hero ── */}
      <section className="bg-gradient-to-b from-[var(--tint-a)] via-[var(--tint-b)] to-[var(--surface)] py-10 sm:py-12">
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
                  <dd className="text-xs leading-snug text-text-2">{label}</dd>
                </div>
              </div>
            ))}
          </dl>
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
          src="/images/sustainability-generated.webp"
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
