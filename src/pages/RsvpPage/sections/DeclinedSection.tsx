import React from 'react';
import type { RsvpSectionProps } from './types';

export const DeclinedSection = ({ t }: RsvpSectionProps) => (
  <section className="flex flex-col gap-6">
    <p className="text-style-paragraph-3 text-black text-balance">
      {t('rsvp.stepDeclined')}
    </p>
  </section>
);
