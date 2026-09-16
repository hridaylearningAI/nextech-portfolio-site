"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Symbol } from "../icons";

/**
 * Who we are page banner: the office tour playing behind the page title.
 *
 * The video was re-encoded from the 31.9MB, 1080p/50fps original to 6MB at
 * 720p/30fps with faststart, so it starts before the whole file has arrived.
 *
 * Behaviour:
 * - Starts muted. Browsers only allow autoplay without sound, and the track is
 *   a loud music bed, so sound is opt-in through the toggle.
 * - Pauses when scrolled out of view, so a looping video is not decoding
 *   behind the rest of the page.
 * - Under prefers-reduced-motion it never starts by itself: the poster frame
 *   (the Global Tower exterior) stands in, and the play button is there.
 * - A visitor who pauses stays paused; scrolling back does not override them.
 *
 * Deliberately not tagged data-video-hero: that attribute belongs to the home
 * page opener and triggers the header cloak in globals.css.
 */
export default function VideoBanner({
  eyebrow,
  title,
  accent,
  copy,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser.current) {
          // play() rejects if the browser blocks it; the poster and the play
          // button remain, so there is nothing else to do.
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function togglePlay() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  }

  function toggleSound() {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    // Unmuting a paused video is a clear request to hear it.
    if (!video.muted && video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    }
  }

  return (
    <section className="relative isolate flex h-[72svh] max-h-[760px] min-h-[520px] items-end overflow-hidden bg-ink">
      <video
        ref={ref}
        className="absolute inset-0 -z-20 size-full object-cover"
        src="/videos/office-tour.mp4"
        poster="/videos/office-tour-poster.webp"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="A tour of the Nextech General Trading office in Global Tower, Abu Dhabi"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Scrim: heaviest at the bottom-left where the title sits, so the type
          stays legible over every frame of the tour, bright office or sky. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 to-transparent" />

      <div className="site-container w-full pb-24 sm:pb-20">
        <nav
          data-intro
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs text-white/70"
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <span className="font-medium text-white">{eyebrow}</span>
        </nav>
        {/* Brand teal set explicitly: .text-brand switches to the darker
            accessible teal in light mode, which disappears on footage. */}
        <p
          data-intro
          className="text-xs font-semibold tracking-[0.14em] text-[var(--brand)] uppercase"
        >
          {eyebrow}
        </p>
        <h1
          data-intro
          className="mt-4 max-w-2xl text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl"
        >
          {title} <span className="text-[var(--brand)]">{accent}</span>
        </h1>
        <p
          data-intro
          className="mt-6 max-w-lg text-base leading-relaxed text-white/80"
        >
          {copy}
        </p>
      </div>

      <div className="absolute right-6 bottom-6 flex gap-2 sm:right-10 sm:bottom-8">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="grid size-11 place-items-center rounded-full bg-black/50 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <Symbol name={playing ? "pause" : "play"} className="size-5" />
        </button>
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
          className="grid size-11 place-items-center rounded-full bg-black/50 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <Symbol name={muted ? "soundOff" : "soundOn"} className="size-5" />
        </button>
      </div>
    </section>
  );
}
