import React from 'react';
import { useNavigationVisibility } from '@hooks';
import { Navigation } from '@modules';
import { HeroIntro, Timeline, Welcome, WeddingCountdown } from '@sections';

export const HomePage = () => {
  const showNavigation = useNavigationVisibility();

  return (
    <main>
      <Navigation isVisible={showNavigation} />
      <HeroIntro />
      <Welcome />
      <WeddingCountdown />
      <Timeline />
      <div className="min-h-[40vh] bg-background-off-white" aria-hidden />
    </main>
  );
}
