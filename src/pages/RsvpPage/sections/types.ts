import type { RsvpFieldErrors } from '../rsvpValidation';
import type { RsvpFormData } from '../types';
import type { TranslationKey } from '@i18n';

export type RsvpSectionProps = {
  data: RsvpFormData;
  errors: RsvpFieldErrors;
  setField: <K extends keyof RsvpFormData>(
    field: K,
    value: RsvpFormData[K]
  ) => void;
  t: (key: TranslationKey) => string;
  onFieldBlur?: (field: keyof RsvpFormData) => void;
  clearFieldError?: (field: keyof RsvpFormData) => void;
};
