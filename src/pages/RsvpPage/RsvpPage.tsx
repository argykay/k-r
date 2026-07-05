import React from 'react';
import { Navigation } from '@modules';
import { RsvpForm } from './RsvpForm';

export const RsvpPage = () => (
  <main>
    <Navigation isVisible={true} />
    <RsvpForm />
  </main>
);
