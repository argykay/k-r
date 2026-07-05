import React from 'react';
import { RsvpTextInput } from '../components/RsvpField';
import { isValidEmail } from '../rsvpValidation';
import { SectionHeading } from './SectionHeading';
import type { RsvpSectionProps } from './types';

export const ContactSection = ({
  data,
  errors,
  setField,
  t,
  onFieldBlur,
  clearFieldError,
}: RsvpSectionProps) => (
  <section className="flex flex-col gap-6">
    <SectionHeading title={t('rsvp.stepContact')} />
    <RsvpTextInput
      id="rsvp-full-name"
      label={t('rsvp.fullNameLabel')}
      value={data.fullName}
      onChange={(value) => {
        setField('fullName', value);
        if (errors.fullName && value.trim()) {
          clearFieldError?.('fullName');
        }
      }}
      onBlur={() => onFieldBlur?.('fullName')}
      error={errors.fullName}
      required
    />
    <RsvpTextInput
      id="rsvp-email"
      label={t('rsvp.emailLabel')}
      type="email"
      value={data.email}
      onChange={(value) => {
        setField('email', value);
        if (errors.email && isValidEmail(value)) {
          clearFieldError?.('email');
        }
      }}
      onBlur={() => onFieldBlur?.('email')}
      error={errors.email}
      required
    />
  </section>
);
