import React from 'react';
import { RsvpYesNo } from '../components/RsvpYesNo';
import { SectionHeading } from './SectionHeading';
import type { RsvpSectionProps } from './types';

export const HousewarmingSection = ({
  data,
  errors,
  setField,
  t,
}: RsvpSectionProps) => (
  <section className="flex flex-col gap-6">
    <SectionHeading
      id="rsvp-housewarming-heading"
      title={t('rsvp.housewarmingLabel')}
    />
    <RsvpYesNo
      name="housewarming"
      labelledBy="rsvp-housewarming-heading"
      value={data.housewarming}
      onChange={(value) => setField('housewarming', value)}
      yesLabel={t('rsvp.yes')}
      noLabel={t('rsvp.no')}
      yesOptionLabel={t('rsvp.housewarmingYes')}
      noOptionLabel={t('rsvp.housewarmingNo')}
      error={errors.housewarming}
      yesInputId="rsvp-housewarming-yes"
      noInputId="rsvp-housewarming-no"
    />
  </section>
);
