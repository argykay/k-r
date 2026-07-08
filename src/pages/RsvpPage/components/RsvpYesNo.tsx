import React from 'react';
import type { YesNo } from '../types';

export type RsvpYesNoProps = {
  name: string;
  label?: string;
  labelledBy?: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
  yesLabel: string;
  noLabel: string;
  error?: string;
  yesOptionLabel?: string;
  noOptionLabel?: string;
  yesInputId?: string;
  noInputId?: string;
};

export const RsvpYesNo = ({
  name,
  label,
  labelledBy,
  value,
  onChange,
  yesLabel,
  noLabel,
  error,
  yesOptionLabel,
  noOptionLabel,
  yesInputId,
  noInputId,
}: RsvpYesNoProps) => (
  <fieldset
    className="flex flex-col gap-3 border-0 p-0"
    aria-labelledby={labelledBy}
  >
    {label && !labelledBy ? (
      <legend className="text-style-paragraph-3 text-black">{label}</legend>
    ) : null}
    <div
      className="flex flex-col gap-2 sm:flex-row sm:gap-6"
      role="radiogroup"
      aria-label={labelledBy ? undefined : label}
    >
      {(
        [
          { option: 'yes' as const, text: yesOptionLabel ?? yesLabel, id: yesInputId },
          { option: 'no' as const, text: noOptionLabel ?? noLabel, id: noInputId },
        ] as const
      ).map(({ option, text, id }) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-2 text-paragraph-3 text-black"
        >
          <input
            type="radio"
            id={id}
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="h-4 w-4 accent-moss-green"
          />
          {text}
        </label>
      ))}
    </div>
    {error ? (
      <p className="text-paragraph-3 text-blood-orange" role="alert">
        {error}
      </p>
    ) : null}
  </fieldset>
);
