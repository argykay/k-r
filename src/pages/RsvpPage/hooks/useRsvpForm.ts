import { useCallback, useState } from 'react';
import { INITIAL_RSVP_FORM, type RsvpFormData, type YesNo } from '../types';

function clearAttendingYesFields(data: RsvpFormData): RsvpFormData {
  return {
    ...data,
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
}

function applyFieldChange(
  prev: RsvpFormData,
  field: keyof RsvpFormData,
  value: RsvpFormData[keyof RsvpFormData]
): RsvpFormData {
  let next: RsvpFormData = { ...prev, [field]: value };

  if (field === 'attending') {
    const attending = value as YesNo;
    if (attending === 'no') {
      next = clearAttendingYesFields(next);
    }
  }

  if (field === 'plusOne' && value === 'no') {
    next = { ...next, plusOneName: '', plusOneMeal: '' };
  }

  if (field === 'children' && value === 'no') {
    next = { ...next, childrenCount: '', kidsMeal: '' };
  }

  return next;
}

export function useRsvpForm() {
  const [data, setData] = useState<RsvpFormData>(INITIAL_RSVP_FORM);

  const setField = useCallback(
    <K extends keyof RsvpFormData>(field: K, value: RsvpFormData[K]) => {
      setData((prev) => applyFieldChange(prev, field, value));
    },
    []
  );

  const resetForm = useCallback(() => {
    setData(INITIAL_RSVP_FORM);
  }, []);

  return { data, setField, resetForm };
}
