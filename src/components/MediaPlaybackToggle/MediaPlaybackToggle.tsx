import React from 'react';

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l10.26-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
  </svg>
);

export type MediaPlaybackToggleProps = {
  isPaused: boolean;
  onToggle: () => void;
  pauseLabel: string;
  playLabel: string;
  className?: string;
};

export const MediaPlaybackToggle = ({
  isPaused,
  onToggle,
  pauseLabel,
  playLabel,
  className = 'absolute bottom-2 right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:bottom-6 md:right-6',
}: MediaPlaybackToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    className={className}
    aria-pressed={isPaused}
    aria-label={isPaused ? playLabel : pauseLabel}
  >
    {isPaused ? <PlayIcon /> : <PauseIcon />}
  </button>
);
