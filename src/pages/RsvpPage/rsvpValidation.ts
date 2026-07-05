import type { TranslationKey } from '@i18n';
import type { RsvpFormData } from './types';

export type RsvpFieldErrors = Partial<Record<keyof RsvpFormData, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FIELD_IDS: Partial<Record<keyof RsvpFormData, string>> = {
  fullName: 'rsvp-full-name',
  email: 'rsvp-email',
  attending: 'rsvp-attending-yes',
  plusOne: 'rsvp-plus-one-yes',
  plusOneName: 'rsvp-plus-one-name',
  children: 'rsvp-children-yes',
  childrenCount: 'rsvp-children-count',
  guestMeal: 'rsvp-guest-meal',
  plusOneMeal: 'rsvp-plus-one-meal',
  kidsMeal: 'rsvp-kids-meal-yes',
  housewarming: 'rsvp-housewarming-yes',
  weddingBus: 'rsvp-wedding-bus-yes',
};

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function validateForm(
  data: RsvpFormData,
  t: (key: TranslationKey) => string
): RsvpFieldErrors {
  const errors: RsvpFieldErrors = {};
  const required = t('rsvp.validationRequired');

  if (!data.fullName.trim()) {
    errors.fullName = required;
  }

  if (!data.email.trim()) {
    errors.email = required;
  } else if (!isValidEmail(data.email)) {
    errors.email = t('rsvp.validationInvalidEmail');
  }

  if (!data.attending) {
    errors.attending = required;
    return errors;
  }

  if (data.attending === 'no') {
    return errors;
  }

  if (!data.plusOne) {
    errors.plusOne = required;
  } else if (data.plusOne === 'yes' && !data.plusOneName.trim()) {
    errors.plusOneName = required;
  }

  if (!data.children) {
    errors.children = required;
  } else if (data.children === 'yes') {
    const count = data.childrenCount;
    if (count === '' || count < 1 || count > 10 || !Number.isInteger(count)) {
      errors.childrenCount = t('rsvp.validationInvalidChildrenCount');
    }
  }

  if (data.children === 'yes' && !data.kidsMeal) {
    errors.kidsMeal = required;
  }

  if (!data.housewarming) {
    errors.housewarming = required;
  }

  if (!data.weddingBus) {
    errors.weddingBus = required;
  }

  return errors;
}

export function isFormSubmittable(
  data: RsvpFormData,
  t: (key: TranslationKey) => string
): boolean {
  return Object.keys(validateForm(data, t)).length === 0;
}

export function validateField(
  field: keyof RsvpFormData,
  data: RsvpFormData,
  t: (key: TranslationKey) => string
): string | undefined {
  return validateForm(data, t)[field];
}

export function focusFirstError(errors: RsvpFieldErrors) {
  const firstField = Object.keys(errors)[0] as keyof RsvpFormData | undefined;
  if (!firstField) {
    return;
  }

  const elementId = FIELD_IDS[firstField];
  if (elementId) {
    document.getElementById(elementId)?.focus();
  }
}
