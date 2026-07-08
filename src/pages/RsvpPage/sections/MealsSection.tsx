import React from 'react';
import { RsvpTextInput } from '../components/RsvpField';
import { SectionHeading } from './SectionHeading';
import type { RsvpSectionProps } from './types';

export const MealsSection = ({
  data,
  errors,
  setField,
  t,
}: RsvpSectionProps) => (
  <section className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <SectionHeading
        id="rsvp-guest-meal-heading"
        title={t('rsvp.guestMealLabel')}
      />
      <RsvpTextInput
        id="rsvp-guest-meal"
        labelledBy="rsvp-guest-meal-heading"
        value={data.guestMeal}
        onChange={(value) => setField('guestMeal', value)}
        placeholder={t('rsvp.guestMealPlaceholder')}
        error={errors.guestMeal}
      />
    </div>
    {data.plusOne === 'yes' ? (
      <div className="flex flex-col gap-2">
        <SectionHeading
          id="rsvp-plus-one-meal-heading"
          title={t('rsvp.plusOneMealLabel')}
        />
        <RsvpTextInput
          id="rsvp-plus-one-meal"
          labelledBy="rsvp-plus-one-meal-heading"
          value={data.plusOneMeal}
          onChange={(value) => setField('plusOneMeal', value)}
          placeholder={t('rsvp.plusOneMealPlaceholder')}
          error={errors.plusOneMeal}
        />
      </div>
    ) : null}
  </section>
);
