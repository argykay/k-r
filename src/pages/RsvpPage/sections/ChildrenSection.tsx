import React from 'react';
import { RsvpTextInput } from '../components/RsvpField';
import { RsvpYesNo } from '../components/RsvpYesNo';
import { SectionHeading } from './SectionHeading';
import type { RsvpSectionProps } from './types';

export const ChildrenSection = ({
  data,
  errors,
  setField,
  t,
}: RsvpSectionProps) => (
  <section className="flex flex-col gap-6">
    <SectionHeading
      id="rsvp-children-heading"
      title={t('rsvp.childrenLabel')}
    />
    <RsvpYesNo
      name="children"
      labelledBy="rsvp-children-heading"
      value={data.children}
      onChange={(value) => setField('children', value)}
      yesLabel={t('rsvp.yes')}
      noLabel={t('rsvp.no')}
      error={errors.children}
      yesInputId="rsvp-children-yes"
      noInputId="rsvp-children-no"
    />
    {data.children === 'yes' ? (
      <>
        <RsvpTextInput
          id="rsvp-children-count"
          label={t('rsvp.childrenCountLabel')}
          type="number"
          value={data.childrenCount === '' ? '' : String(data.childrenCount)}
          onChange={(value) => {
            if (value === '') {
              setField('childrenCount', '');
              return;
            }
            const parsed = Number.parseInt(value, 10);
            setField('childrenCount', Number.isNaN(parsed) ? '' : parsed);
          }}
          min={1}
          max={10}
          error={errors.childrenCount}
          required
        />
        <RsvpYesNo
          name="kids-meal"
          label={t('rsvp.kidsMealLabel')}
          value={data.kidsMeal}
          onChange={(value) => setField('kidsMeal', value)}
          yesLabel={t('rsvp.yes')}
          noLabel={t('rsvp.no')}
          error={errors.kidsMeal}
          yesInputId="rsvp-kids-meal-yes"
          noInputId="rsvp-kids-meal-no"
        />
      </>
    ) : null}
  </section>
);
