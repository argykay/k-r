import React, { useState } from 'react';
import { GridContainer } from '@components';
import { useTranslation } from '@i18n';

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
    <div className="flex min-h-screen items-center bg-cream text-burgundy">
      <GridContainer className="w-full py-20">
        <div className="col-span-4 md:col-span-6 md:col-start-1 lg:col-span-6 lg:col-start-4">
          <div className="mx-auto flex max-w-md flex-col gap-8 text-center">
            <div className="flex flex-col gap-3">
              <p className="text-style-caption text-stone">{t('meta.siteTitle')}</p>
              <h1 className="text-style-header-4 text-burgundy">{t('gate.title')}</h1>
              <p className="text-style-paragraph-3 text-burgundy text-balance">
                {t('gate.subtitle')}
              </p>
            </div>

            <form
              className="flex flex-col gap-4 text-left"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="site-access-password" className="text-style-caption text-stone">
                  {t('gate.label')}
                </label>
                <input
                  id="site-access-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder={t('gate.placeholder')}
                  className="w-full rounded border border-stone/30 bg-white px-4 py-3 text-style-paragraph-3 text-burgundy placeholder:text-stone/60 focus:border-moss-green focus:outline-none focus:ring-2 focus:ring-moss-green/30"
                  aria-invalid={error}
                  aria-describedby={error ? 'site-access-error' : undefined}
                />
              </div>

              {error ? (
                <p
                  id="site-access-error"
                  className="text-style-caption text-blood-orange"
                  role="alert"
                  aria-live="polite"
                >
                  {t('gate.error')}
                </p>
              ) : null}

              <button
                type="submit"
                className="w-full rounded bg-moss-green px-4 py-3 text-style-button text-white transition-colors hover:bg-moss-green/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-green focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                {t('gate.submit')}
              </button>
            </form>
          </div>
        </div>
      </GridContainer>
    </div>
  );
};
