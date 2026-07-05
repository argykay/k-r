import React from 'react';

const inputClassName =
  'rsvp-input w-full rounded border border-stone/40 bg-white px-3 py-2.5 text-paragraph-3 text-black outline-none transition focus:border-moss-green focus:ring-2 focus:ring-moss-green/30';

export type RsvpFieldProps = {
  id: string;
  label?: string;
  labelledBy?: string;
  error?: string;
  children: React.ReactNode;
};

export const RsvpField = ({
  id,
  label,
  labelledBy,
  error,
  children,
}: RsvpFieldProps) => (
  <div className="flex flex-col gap-2">
    {label && !labelledBy ? (
      <label htmlFor={id} className="text-style-paragraph-3 text-black">
        {label}
      </label>
    ) : null}
    {children}
    {error ? (
      <p
        id={`${id}-error`}
        className="text-paragraph-3 text-blood-orange"
        role="alert"
      >
        {error}
      </p>
    ) : null}
  </div>
);

export type RsvpTextInputProps = {
  id: string;
  label?: string;
  labelledBy?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'number';
  error?: string;
  min?: number;
  max?: number;
  onBlur?: () => void;
  required?: boolean;
};

export const RsvpTextInput = ({
  id,
  label,
  labelledBy,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  min,
  max,
  onBlur,
  required,
}: RsvpTextInputProps) => (
  <RsvpField id={id} label={label} labelledBy={labelledBy} error={error}>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      min={min}
      max={max}
      required={required}
      aria-labelledby={labelledBy}
      className={`${inputClassName}${error ? ' border-blood-orange' : ''}`}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
    />
  </RsvpField>
);

export type RsvpTextareaProps = {
  id: string;
  label?: string;
  labelledBy?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  rows?: number;
};

export const RsvpTextarea = ({
  id,
  label,
  labelledBy,
  value,
  onChange,
  placeholder,
  error,
  rows = 3,
}: RsvpTextareaProps) => (
  <RsvpField id={id} label={label} labelledBy={labelledBy} error={error}>
    <textarea
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={rows}
      aria-labelledby={labelledBy}
      className={`${inputClassName} resize-y min-h-[5rem]`}
      aria-invalid={Boolean(error)}
    />
  </RsvpField>
);

export { inputClassName };
