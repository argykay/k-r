import React from 'react';
import { RsvpTextInput } from '../components/RsvpField';
import { RsvpYesNo } from '../components/RsvpYesNo';
import { SectionHeading } from './SectionHeading';
import type { RsvpSectionProps } from './types';

export const PlusOneSection = ({
  data,
  errors,
  setField,
  t,
}: RsvpSectionProps) => (
  <section className="flex flex-col gap-6">
    <SectionHeading
      id="rsvp-plus-one-heading"
      title={t('rsvp.plusOneLabel')}
    />
    <RsvpYesNo
      name="plus-one"
      labelledBy="rsvp-plus-one-heading"
      value={data.plusOne}
      onChange={(value) => setField('plusOne', value)}
      yesLabel={t('rsvp.yes')}
      noLabel={t('rsvp.no')}
      error={errors.plusOne}
      yesInputId="rsvp-plus-one-yes"
      noInputId="rsvp-plus-one-no"
    />
    {data.plusOne === 'yes' ? (
      <RsvpTextInput
        id="rsvp-plus-one-name"
        label={t('rsvp.plusOneNameLabel')}
        value={data.plusOneName}
        onChange={(value) => setField('plusOneName', value)}
        error={errors.plusOneName}
        required
      />
    ) : null}
  </section>
);
