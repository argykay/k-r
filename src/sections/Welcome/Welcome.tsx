import React from 'react';
import { ReactComponent as BowSvg } from '@assets/svgs/bow.svg';
import { ReactComponent as FrameSvg } from '@assets/svgs/frame_1.svg';
import welcomePhoto from '@assets/photos/1.jpg';
import { AnimatedVector, FlowersIcon, GridContainer, IntroReveal } from '@components';
import { useTranslation } from '@i18n';

export const Welcome = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-moss-green text-cream min-h-content">
      <GridContainer
        className="min-h-content"
        gridClassName="min-h-content items-center gap-x-2 md:gap-y-14 md:gap-x-6 md:gap-y-16 items-stretch"
      >
        <div className="col-span-4 md:col-span-6 lg:col-span-6 flex flex-col items-center justify-center py-10">
          <div className="flex w-full flex-col items-center gap-10 text-center md:gap-14 lg:gap-16">
            <IntroReveal className="flex justify-center items-center">
              <FlowersIcon
                animated
                animationOptions={{ intensity: 'strong', effect: 'stroke', filterDisplayWidthPx: 20 }}
                colorClassName="text-cream"
              />
            </IntroReveal>

            <IntroReveal
              as="p"
              className="max-w-xl text-header-2 text-cream"
            >
              {t('welcome.message')}
            </IntroReveal>

            <IntroReveal
              variant="fadeScale"
              duration={0.5}
              className="flex w-full items-center justify-center gap-5 md:gap-8"
            >
              <div className="flex h-5 w-20 shrink-0 items-center justify-center md:h-6 md:w-24">
                <AnimatedVector
                  Svg={BowSvg}
                  className="h-10 w-40 scale-50 text-cream md:h-12 md:w-48"
                  svgClassName="block h-full w-full"
                  animationOptions={{
                    intensity: 'strong',
                    effect: 'stroke',
                    filterDisplayWidthPx: 80,
                  }}
                />
              </div>
            </IntroReveal>

            <div className="flex w-full max-w-lg flex-col gap-6">
              <IntroReveal
                as="p"
                className="text-paragraph-3 leading-relaxed text-cream text-balance"
              >
                {t('welcome.location')}
              </IntroReveal>

              <IntroReveal
                as="p"
                className="font-cardo italic leading-relaxed text-cream/85 text-balance"
              >
                {t('welcome.closing')}
              </IntroReveal>
            </div>
          </div>
        </div>

        <div
          className="welcome-photo-bleed col-span-4 relative flex min-h-96 items-center justify-center bg-cover bg-center md:col-span-6 lg:col-span-6 lg:col-start-7 lg:min-h-content lg:self-stretch"
          style={{ backgroundImage: `url(${welcomePhoto})` }}
          role="img"
          aria-label={t('welcome.photoAlt')}
        >
          <AnimatedVector
            Svg={FrameSvg}
            className="pointer-events-none box-border h-full w-full max-h-full max-w-full p-3 text-cream md:p-4"
            svgClassName="block h-full w-full text-cream"
            animationOptions={{
              intensity: 'strong',
              effect: 'stroke',
            }}
          />
        </div>
      </GridContainer>
    </section>
  );
};
