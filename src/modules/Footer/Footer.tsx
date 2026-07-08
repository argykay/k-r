import React from 'react';
import footerPhoto from '@assets/photos/2.jpg';
import { ReactComponent as HeartSvg } from '@assets/svgs/heart.svg';
import { AnimatedVector, GridContainer } from '@components';

import { useTranslation } from '@i18n';

const HERO_HEART_ANIMATION = {
  intensity: 'subtle' as const,
  effect: 'stroke' as const,
  filterDisplayWidthPx: 30,
};

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="footer-photo-bg relative bg-cover text-moss-green min-h-100"
      style={{ backgroundImage: `url(${footerPhoto})` }}
    >
      <div className="absolute inset-0 bg-background-off-white/80" aria-hidden />
      <GridContainer className="relative py-6">
        <div className="col-span-4 flex flex-col items-center gap-2 text-center md:col-span-6 md:col-start-1 lg:col-span-8 lg:col-start-3">
        <AnimatedVector
                  Svg={HeartSvg}
                  className="my-2 w-6 shrink-0"
                  svgClassName="block h-auto w-full text-cream"
                  animationOptions={HERO_HEART_ANIMATION}
                />
          <p className="text-style-caption text-balance text-white">{t('footer.line1')}</p>
          <p className="font-cardo italic text-style-caption text-white  md:text-balance">
            {t('footer.line2')}
          </p>
        </div>
      </GridContainer>
    </footer>
  );
};
