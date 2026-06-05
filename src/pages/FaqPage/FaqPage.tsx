import React from 'react';
import { ReactComponent as FlowersSvg2Svg } from '@assets/svgs/whimsical.svg';
import { AnimatedVector, FaqAccordion, GridContainer, IntroReveal } from '@components';
import { FAQ_ITEMS } from '@constants/faqItems';
import { Navigation } from '@modules';
import { useTranslation } from '@i18n';
import { FaqSparkles } from './FaqSparkles';

export const FaqPage = () => {
  const { t } = useTranslation();

  return (
    <main className="relative overflow-hidden bg-moss-green text-cream">
      <FaqSparkles />
      <div className="relative z-10">
        <Navigation isVisible={true} />
        <GridContainer className="py-32 md:py-28">
          <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-4">
            <h1 className="text-style-cursive-title text-xl text-center text-cream lg:text-4xl">
              {t('faq.title')}
            </h1>
            <IntroReveal className="w-full max-w-sm mx-auto">
              <AnimatedVector
                Svg={FlowersSvg2Svg}
                className="w-full"
                svgClassName="block h-auto w-full text-cream"
                animationOptions={{
                  intensity: 'medium',
                  effect: 'stroke',
                }}
              />
            </IntroReveal>
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </GridContainer>
      </div>
    </main>
  );
};
