import React from 'react';
import { useNavigationVisibility } from '@hooks';
import { Navigation } from '@modules';
import { RsvpForm } from './RsvpForm';

export const RsvpPage = () => {
  const showNavigation = useNavigationVisibility({ visibleAtTop: true });

  return (
    <main>
      <Navigation isVisible={showNavigation} />
      <RsvpForm />
    </main>
  );
};
