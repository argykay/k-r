import type { Locale } from '@i18n';
import { yesNoToSheet, type RsvpFormData } from './types';

export class RsvpSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RsvpSubmitError';
  }
}

export function buildRsvpPayload(
  data: RsvpFormData,
  locale: Locale
): URLSearchParams {
  const params = new URLSearchParams();

  params.set('full_name', data.fullName.trim());
  params.set('email', data.email.trim());
  params.set('attending', yesNoToSheet(data.attending));
  params.set('plus_one', yesNoToSheet(data.plusOne));
  params.set('plus_one_name', data.plusOneName.trim());
  params.set('plus_one_meal', data.plusOneMeal.trim());
  params.set('children', yesNoToSheet(data.children));
  params.set(
    'children_count',
    data.children === 'yes' && data.childrenCount !== ''
      ? String(data.childrenCount)
      : ''
  );
  params.set('kids_meal', yesNoToSheet(data.kidsMeal));
  params.set('guest_meal', data.guestMeal.trim());
  params.set('housewarming', yesNoToSheet(data.housewarming));
  params.set('wedding_bus', yesNoToSheet(data.weddingBus));
  params.set('locale', locale);

  return params;
}

export async function submitRsvp(
  data: RsvpFormData,
  locale: Locale
): Promise<void> {
  const url = process.env.REACT_APP_RSVP_SCRIPT_URL;
  if (!url) {
    throw new RsvpSubmitError('missing_endpoint');
  }

  const response = await fetch(url, {
    method: 'POST',
    body: buildRsvpPayload(data, locale),
  });

  let result: { ok?: boolean; error?: string } | null = null;
  try {
    result = await response.json();
  } catch {
    if (!response.ok) {
      throw new RsvpSubmitError('request_failed');
    }
  }

  if (!response.ok || result?.ok === false) {
    throw new RsvpSubmitError(result?.error ?? 'request_failed');
  }
}
