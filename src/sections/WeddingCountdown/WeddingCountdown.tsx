import React from 'react';
import { CountdownTimer, GridContainer, IntroReveal } from '@components';
import { useTranslation } from '@i18n';

export const WeddingCountdown = () => {
  const { t } = useTranslation();

  return (
    <section
      className="bg-cream py-16 md:py-24"
      aria-labelledby="countdown-heading"
    >
      <GridContainer>
        <div className="col-span-4 md:col-span-6 lg:col-span-12">
          <IntroReveal
            as="h2"
            duration={0.7}
            className="text-style-cursive-title mb-10 text-center text-blood-orange text-balance md:mb-14"
            id="countdown-heading"
          >
            {t('countdown.title')}
          </IntroReveal>

          <CountdownTimer />

          <IntroReveal
            as="p"
            duration={0.6}
            className="text-style-caption mt-10 text-center text-black"
          >
            {t('navigation.date')}
          </IntroReveal>
        </div>
      </GridContainer>
    </section>
  );
};
