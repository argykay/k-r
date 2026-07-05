import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { GridContainer } from '@components';
import { useTranslation } from '@i18n';
import { LocaleLink } from '@routing';
import { useRsvpForm } from './hooks/useRsvpForm';
import {
  focusFirstError,
  isFormSubmittable,
  validateField,
  validateForm,
  type RsvpFieldErrors,
} from './rsvpValidation';
import { submitRsvp } from './rsvpSubmit';
import { AttendingSection } from './sections/AttendingSection';
import { ChildrenSection } from './sections/ChildrenSection';
import { ContactSection } from './sections/ContactSection';
import { DeclinedSection } from './sections/DeclinedSection';
import { HousewarmingSection } from './sections/HousewarmingSection';
import { MealsSection } from './sections/MealsSection';
import { PlusOneSection } from './sections/PlusOneSection';
import { WeddingBusSection } from './sections/WeddingBusSection';
import type { RsvpFormData } from './types';

type FormView = 'form' | 'success' | 'error';

const sectionMotion = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
};

export const RsvpForm = () => {
  const { t, locale } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const { data, setField } = useRsvpForm();
  const dataRef = useRef(data);
  dataRef.current = data;
  const [view, setView] = useState<FormView>('form');
  const [errors, setErrors] = useState<RsvpFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldAndClearError = useCallback(
    <K extends keyof RsvpFormData>(field: K, value: RsvpFormData[K]) => {
      setField(field, value);
      setErrors((prev) => {
        if (!prev[field]) {
          return prev;
        }
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [setField]
  );

  const clearFieldError = useCallback((field: keyof RsvpFormData) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const onFieldBlur = useCallback(
    (field: keyof RsvpFormData) => {
      const message = validateField(field, data, t);
      setErrors((prev) => {
        const next = { ...prev };
        if (message) {
          next[field] = message;
        } else {
          delete next[field];
        }
        return next;
      });
    },
    [data, t]
  );

  const canSubmit = useMemo(() => isFormSubmittable(data, t), [data, t]);

  const sectionProps = {
    data,
    errors,
    setField: setFieldAndClearError,
    t,
    onFieldBlur,
    clearFieldError,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const formErrors = validateForm(dataRef.current, t);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      focusFirstError(formErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await submitRsvp(dataRef.current, locale);
      setView('success');
    } catch {
      setView('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (view === 'success') {
    return (
      <section className="bg-background-off-white py-16 md:py-24">
        <GridContainer>
          <div className="col-span-4 md:col-span-4 md:col-start-2 lg:col-span-6 lg:col-start-4">
            <div className="rounded-lg bg-white p-8 text-center shadow-sm md:p-12">
              <h2 className="text-style-header-3 text-moss-green">
                {t('rsvp.successTitle')}
              </h2>
              <p className="mt-4 text-style-paragraph-3 text-black">
                {t('rsvp.successBody')}
              </p>
              <LocaleLink
                route="home"
                className="mt-8 inline-block text-style-link text-moss-green underline-offset-4 hover:underline"
              >
                {t('rsvp.successBackHome')}
              </LocaleLink>
            </div>
          </div>
        </GridContainer>
      </section>
    );
  }

  if (view === 'error') {
    return (
      <section className="bg-background-off-white py-16 md:py-24">
        <GridContainer>
          <div className="col-span-4 md:col-span-4 md:col-start-2 lg:col-span-6 lg:col-start-4">
            <div className="rounded-lg bg-white p-8 text-center shadow-sm md:p-12">
              <h2 className="text-style-header-3 text-blood-orange">
                {t('rsvp.errorTitle')}
              </h2>
              <p className="mt-4 text-style-paragraph-3 text-black">
                {t('rsvp.errorBody')}
              </p>
              <button
                type="button"
                onClick={() => setView('form')}
                className="mt-8 text-style-button rounded bg-moss-green px-8 py-3 text-cream"
              >
                {t('rsvp.errorRetry')}
              </button>
            </div>
          </div>
        </GridContainer>
      </section>
    );
  }

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: sectionMotion.initial,
        animate: sectionMotion.animate,
        exit: sectionMotion.exit,
        transition: { duration: 0.25 },
      };

  return (
    <section className="bg-background-off-white py-16 md:py-24">
      <GridContainer>
        <div className="col-span-4 md:col-span-4 md:col-start-2 lg:col-span-6 lg:col-start-4">
          <header className="mb-10 text-center">
            <h1 className="text-style-header-3 text-moss-green">
              {t('rsvp.title')}
            </h1>
            <p className="mt-4 text-style-paragraph-3 text-black">
              {t('rsvp.intro')}
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-white p-6 shadow-sm md:p-10"
            noValidate
          >
            <div className="flex flex-col gap-8">
              <ContactSection {...sectionProps} />
              <AttendingSection {...sectionProps} />

              <AnimatePresence initial={false}>
                {data.attending === 'no' ? (
                  <motion.div key="declined" className="flex flex-col gap-8" {...motionProps}>
                    <DeclinedSection {...sectionProps} />
                    <div>
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        canSubmit={canSubmit}
                        label={
                          isSubmitting ? t('rsvp.submitting') : t('rsvp.submit')
                        }
                      />
                    </div>
                  </motion.div>
                ) : null}

                {data.attending === 'yes' ? (
                  <motion.div key="attending" className="flex flex-col gap-8" {...motionProps}>
                    <PlusOneSection {...sectionProps} />
                    <ChildrenSection {...sectionProps} />
                    <HousewarmingSection {...sectionProps} />
                    <MealsSection {...sectionProps} />
                    <WeddingBusSection {...sectionProps} />
                    <div>
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        canSubmit={canSubmit}
                        label={
                          isSubmitting ? t('rsvp.submitting') : t('rsvp.submit')
                        }
                      />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </GridContainer>
    </section>
  );
};

type SubmitButtonProps = {
  isSubmitting: boolean;
  canSubmit: boolean;
  label: string;
};

const SubmitButton = ({ isSubmitting, canSubmit, label }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={isSubmitting || !canSubmit}
    className={`text-style-button w-full rounded px-8 py-3 transition sm:w-auto ${
      canSubmit
        ? 'bg-moss-green text-cream hover:bg-moss-green/90 disabled:cursor-wait disabled:opacity-70'
        : 'cursor-not-allowed border border-stone/25 bg-stone/15 text-stone/55'
    }`}
  >
    {label}
  </button>
);
