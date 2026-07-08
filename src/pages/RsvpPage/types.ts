export type YesNo = 'yes' | 'no' | '';

export type RsvpFormData = {
  fullName: string;
  email: string;
  attending: YesNo;
  plusOne: YesNo;
  plusOneName: string;
  children: YesNo;
  childrenCount: number | '';
  guestMeal: string;
  plusOneMeal: string;
  kidsMeal: YesNo;
  housewarming: YesNo;
  weddingBus: YesNo;
};

export const INITIAL_RSVP_FORM: RsvpFormData = {
  fullName: '',
  email: '',
  attending: '',
  plusOne: '',
  plusOneName: '',
  children: '',
  childrenCount: '',
  guestMeal: '',
  plusOneMeal: '',
  kidsMeal: '',
  housewarming: '',
  weddingBus: '',
};

export function yesNoToSheet(value: YesNo): string {
  if (value === 'yes') return 'Yes';
  if (value === 'no') return 'No';
  return '';
}
