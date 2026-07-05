import React from 'react';
import { RsvpYesNo } from '../components/RsvpYesNo';
import { SectionHeading } from './SectionHeading';
import type { RsvpSectionProps } from './types';

export const AttendingSection = ({
  data,
  errors,
  setField,
  t,
}: RsvpSectionProps) => (
  <section className="flex flex-col gap-6">
    <SectionHeading
      id="rsvp-attending-heading"
      title={t('rsvp.attendingLabel')}
    />
    <RsvpYesNo
      name="attending"
      labelledBy="rsvp-attending-heading"
      value={data.attending}
      onChange={(value) => setField('attending', value)}
      yesLabel={t('rsvp.yes')}
      noLabel={t('rsvp.no')}
      yesOptionLabel={t('rsvp.attendingYes')}
      noOptionLabel={t('rsvp.attendingNo')}
      error={errors.attending}
      yesInputId="rsvp-attending-yes"
      noInputId="rsvp-attending-no"
    />
  </section>
);
