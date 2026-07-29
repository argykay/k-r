import React, { useState } from 'react';
import { GridContainer, StarField } from '@components';
import { useTranslation } from '@i18n';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

export type PasswordGateProps = {
  error: boolean;
  onSubmit: (password: string) => void;
};

export const PasswordGate = ({ error, onSubmit }: PasswordGateProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value.trim());
  };

  return (
    <main className="relative flex min-h-screen items-center bg-moss-green text-cream">
      <StarField />
      <div className="relative z-10 w-full py-24 pb-32 md:py-32 md:pb-40">
        <GridContainer className="w-full">
          <div className="col-span-4 md:col-span-6 md:col-start-1 lg:col-span-6 lg:col-start-4">
            <div className="mx-auto flex max-w-lg flex-col items-center gap-8 text-center">
              <div className="flex flex-col gap-4 md:gap-5">
                <h1 className="mb-8 text-style-cursive-title text-xl text-cream md:text-4xl">
                  {t('meta.siteTitle')}
                </h1>
                <h2 className="text-style-header-4 text-cream">{t('gate.title')}</h2>
                <p className="text-style-paragraph-3 text-cream/90 text-balance">
                  {t('gate.label')}
                </p>
              </div>

              <form
                className="relative flex w-full flex-col items-center"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="flex flex-col items-stretch gap-3 sm:flex-row">
                  <input
                    id="site-access-password"
                    name="password"
                    type="text"
                    autoComplete="current-password"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder={t('gate.placeholder')}
                    aria-label={t('gate.label')}
                    className="w-40 rounded border border-cream bg-off-white px-4 py-3 text-style-paragraph-3 text-moss-green placeholder:text-moss-green/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-moss-green sm:w-44"
                    aria-invalid={error}
                    aria-describedby={error ? 'site-access-error' : undefined}
                  />
                  <button
                    type="submit"
                    className="text-style-button shrink-0 rounded border border-cream bg-off-white px-4 py-3 text-moss-green transition-colors hover:bg-transparent hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-moss-green"
                  >
                    {t('gate.submit')}
                  </button>
                </div>

                <p
                  id="site-access-error"
                  className="pointer-events-none absolute inset-x-0 top-full z-10 mt-3 px-4 text-center text-style-caption text-cream text-balance"
                  role="alert"
                  aria-live="polite"
                >
                  {error ? t('gate.error') : null}
                </p>
              </form>

              <LanguageSwitcher
                className="justify-center pt-8"
                linkClassName="text-cream"
                activeClassName="text-cream"
                underlineActive
              />
            </div>
          </div>
        </GridContainer>
      </div>
    </main>
  );
};
