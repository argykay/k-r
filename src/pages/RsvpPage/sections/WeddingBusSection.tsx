import React from 'react';
import { RsvpYesNo } from '../components/RsvpYesNo';
import { SectionHeading } from './SectionHeading';
import type { RsvpSectionProps } from './types';

export const WeddingBusSection = ({
  data,
  errors,
  setField,
  t,
}: RsvpSectionProps) => (
  <section className="flex flex-col gap-6">
    <SectionHeading
      id="rsvp-wedding-bus-heading"
      title={t('rsvp.weddingBusLabel')}
    />
    <RsvpYesNo
      name="wedding-bus"
      labelledBy="rsvp-wedding-bus-heading"
      value={data.weddingBus}
      onChange={(value) => setField('weddingBus', value)}
      yesLabel={t('rsvp.yes')}
      noLabel={t('rsvp.no')}
      yesOptionLabel={t('rsvp.weddingBusYes')}
      noOptionLabel={t('rsvp.weddingBusNo')}
      error={errors.weddingBus}
      yesInputId="rsvp-wedding-bus-yes"
      noInputId="rsvp-wedding-bus-no"
    />
  </section>
);
