import React from 'react';
import { ReactComponent as BowSvg } from '@assets/svgs/bow.svg';
import { ReactComponent as FrameSvg } from '@assets/svgs/frame_1.svg';
import { AnimatedVector, FlowersIcon, GridContainer, IntroReveal } from '@components';
import { useTranslation } from '@i18n';

export const Welcome = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-moss-green text-cream">
      <GridContainer
        className="py-20 md:py-28 lg:py-32"
        gridClassName="gap-x-2 gap-y-14 md:gap-x-6 md:gap-y-16 lg:gap-x-6"
      >
        <div className="col-span-4 md:col-span-6 lg:col-span-6">
          <div className="flex w-full flex-col items-center gap-10 text-center md:gap-14 lg:gap-16 md:py-10">
            <IntroReveal className="flex justify-center">
              <FlowersIcon
                animated
                animationOptions={{ intensity: 'medium', effect: 'stroke' }}
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
                    intensity: 'subtle',
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

        <IntroReveal className="col-span-4 flex w-full justify-center px-10 md:col-span-6 lg:col-span-6 lg:col-start-7 lg:h-full lg:min-h-0 lg:items-center">
          <div className="w-full max-h-[85svh]">
            <AnimatedVector
              Svg={FrameSvg}
              className="h-full w-full max-h-[85svh]"
              svgClassName="block h-auto w-full max-h-[85svh] text-cream"
              animationOptions={{
                intensity: 'strong',
                effect: 'stroke',
              }}
            />
          </div>
        </IntroReveal>
      </GridContainer>
    </section>
  );
};
