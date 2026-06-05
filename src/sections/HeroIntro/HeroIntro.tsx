import { useReducedMotion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '@i18n';

const FOREST_VIDEO = `${process.env.PUBLIC_URL}/assets/videos/forest.mp4`;

const FADE_LEAD = 3.5;
const HOLD_AT_BLACK_MS = 350;
const FADE_OUT_MS = 2800;

type LoopPhase = 'playing' | 'hold-black' | 'fading-out';

function easeInOutQuint(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5
    ? 16 * x * x * x * x * x
    : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

/** Gradient softens early; solid layer reaches full black at amount = 1. */
const SOLID_BLACK_START = 0.72;

function setOverlayFade(el: HTMLDivElement | null, amount: number) {
  if (!el) return;
  const fade = Math.min(1, Math.max(0, amount));
  const solid =
    fade <= SOLID_BLACK_START
      ? 0
      : easeInOutQuint((fade - SOLID_BLACK_START) / (1 - SOLID_BLACK_START));

  el.style.setProperty('--fade', fade.toFixed(4));
  el.style.setProperty('--solid', solid.toFixed(4));
}

const PauseIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

const PlayIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l10.26-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}

export const HeroIntro = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const loopPhaseRef = useRef<LoopPhase>('playing');
  const fadeOutStartRef = useRef(0);
  const holdTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof window.matchMedia !== 'function') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      setIsPaused(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion === true) return;

    const tick = () => {
      const overlay = overlayRef.current;
      const v = videoRef.current;
      const phase = loopPhaseRef.current;

      if (phase === 'fading-out') {
        const elapsed = performance.now() - fadeOutStartRef.current;
        const progress = easeInOutQuint(elapsed / FADE_OUT_MS);
        setOverlayFade(overlay, 1 - progress);
        if (progress >= 1) {
          loopPhaseRef.current = 'playing';
          setOverlayFade(overlay, 0);
        }
      } else if (phase === 'hold-black') {
        setOverlayFade(overlay, 1);
      } else if (v && !v.paused && Number.isFinite(v.duration)) {
        const remaining = v.duration - v.currentTime;
        if (remaining <= FADE_LEAD) {
          const progress = 1 - remaining / FADE_LEAD;
          setOverlayFade(overlay, easeInOutQuint(progress));
        } else {
          setOverlayFade(overlay, 0);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      loopPhaseRef.current = 'hold-black';
      setOverlayFade(overlayRef.current, 1);
      video.currentTime = 0;
      void video.play();

      if (holdTimerRef.current) {
        window.clearTimeout(holdTimerRef.current);
      }

      holdTimerRef.current = window.setTimeout(() => {
        loopPhaseRef.current = 'fading-out';
        fadeOutStartRef.current = performance.now();
      }, HOLD_AT_BLACK_MS);
    };

    rafRef.current = requestAnimationFrame(tick);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (holdTimerRef.current) {
        window.clearTimeout(holdTimerRef.current);
      }
    };
  }, [prefersReducedMotion, isPaused]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPaused(false);
      if (prefersReducedMotion !== true) {
        loopPhaseRef.current = 'playing';
        setOverlayFade(overlayRef.current, 0);
      }
    } else {
      video.pause();
      setIsPaused(true);
    }
  }, [prefersReducedMotion]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Introduction"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={FOREST_VIDEO}
        autoPlay
        muted
        loop={prefersReducedMotion === true}
        playsInline
        aria-hidden
      />

      <div
        ref={overlayRef}
        className="hero-intro-overlay pointer-events-none absolute inset-0 z-[5]"
        style={{ '--fade': 0, '--solid': 0 } as React.CSSProperties}
        aria-hidden
      />

      <button
        type="button"
        onClick={togglePlayback}
        className="absolute bottom-2 right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:bottom-6 md:right-6"
        aria-pressed={isPaused}
        aria-label={isPaused ? t('hero.playVideo') : t('hero.pauseVideo')}
      >
        {isPaused ? <PlayIcon /> : <PauseIcon />}
      </button>
    </section>
  );
}
