import React, { useEffect, useState } from 'react';
import { ReactComponent as Star1Svg } from '@assets/svgs/star_1.svg';
import { ReactComponent as Star2Svg } from '@assets/svgs/star_2.svg';
import { getTimeUntilWedding } from '@constants/wedding';
import { useTranslation } from '@i18n';
import { AnimatedVector } from '../AnimatedVector/AnimatedVector';
import { IntroReveal, useIntroRevealInView } from '../IntroReveal/IntroReveal';
import { RollingNumber } from '../RollingNumber/RollingNumber';
import type { AnimatedVectorOptions } from '../../utils/animatedVector';

const HAND_DRAWN_STROKE: AnimatedVectorOptions = {
  intensity: 'medium',
  effect: 'stroke',
};

export type CountdownTimerProps = {
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  starClassName?: string;
};

type CountdownUnitProps = {
  label: string;
  value: number;
  minDigits: number;
  valueClassName: string;
  labelClassName: string;
};

const CountdownUnitBody = ({
  label,
  value,
  minDigits,
  valueClassName,
  labelClassName,
}: CountdownUnitProps) => {
  const isInView = useIntroRevealInView();

  return (
    <>
      <div
        className={[
          'countdown-unit-value text-style-header-5 md:text-style-header-3',
          valueClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <RollingNumber
          value={value}
          minDigits={minDigits}
          animate={isInView}
          baseDelay={0.15}
        />
      </div>
      <p
        className={[
          'text-style-caption lowercase tracking-wide md:tracking-widest',
          labelClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </p>
    </>
  );
};

const CountdownUnit = (props: CountdownUnitProps) => (
  <IntroReveal className="countdown-unit flex min-w-0 flex-col items-center gap-1 md:gap-4">
    <CountdownUnitBody {...props} />
  </IntroReveal>
);

type CountdownStarProps = {
  variant: 1 | 2;
  starClassName: string;
};

const CountdownStar = ({ variant, starClassName }: CountdownStarProps) => {
  const Svg = variant === 1 ? Star1Svg : Star2Svg;

  return (
    <IntroReveal
      variant="fadeScale"
      duration={0.5}
      className="countdown-star mt-2 h-4 w-4 shrink-0 md:mt-4 md:h-6 md:w-8"
      aria-hidden
    >
      <AnimatedVector
        Svg={Svg}
        className="h-full w-full"
        svgClassName={['block h-full w-full', starClassName].filter(Boolean).join(' ')}
        animationOptions={HAND_DRAWN_STROKE}
      />
    </IntroReveal>
  );
};

export const CountdownTimer = ({
  className = '',
  valueClassName = 'text-black',
  labelClassName = 'text-stone',
  starClassName = 'text-black',
}: CountdownTimerProps) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(getTimeUntilWedding);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeUntilWedding());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = timeLeft;
  const unitProps = { valueClassName, labelClassName };

  return (
    <div
      className={[
        'mx-auto flex flex-nowrap items-start justify-center gap-2 md:gap-8',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="timer"
      aria-label={t('countdown.ariaLabel')}
    >
      <CountdownUnit
        {...unitProps}
        label={t('countdown.days')}
        value={days}
        minDigits={days >= 100 ? 3 : 2}
      />
      <CountdownStar variant={1} starClassName={starClassName} />
      <CountdownUnit
        {...unitProps}
        label={t('countdown.hours')}
        value={hours}
        minDigits={2}
      />
      <CountdownStar variant={2} starClassName={starClassName} />
      <CountdownUnit
        {...unitProps}
        label={t('countdown.minutes')}
        value={minutes}
        minDigits={2}
      />
      <CountdownStar variant={1} starClassName={starClassName} />
      <div aria-live="polite" className="contents">
        <CountdownUnit
          {...unitProps}
          label={t('countdown.seconds')}
          value={seconds}
          minDigits={2}
        />
      </div>
    </div>
  );
};
