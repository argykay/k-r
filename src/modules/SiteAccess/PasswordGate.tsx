import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DecorativeStar, GridContainer } from '@components';
import { useTranslation } from '@i18n';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

export type PasswordGateProps = {
  error: boolean;
  onSubmit: (password: string) => void;
};

type PatternStar = {
  variant: 0 | 1;
  left: string;
  top: string;
  sizeClassName: string;
  mdOnly?: boolean;
  mobileOnly?: boolean;
};

type Visibility = 'all' | 'md' | 'mobile';

type StarCoord = {
  left: number;
  top: number;
  size: string;
  visibility: Visibility;
};

/**
 * Rectangular star frame — tidy rows with a slight alternating vertical offset.
 * Desktop adds a second inner frame closer to the content.
 */
const buildTidyStars = (): StarCoord[] => {
  const stars: StarCoord[] = [];
  const seen = new Set<string>();

  const push = (left: number, top: number, size: string, visibility: Visibility) => {
    const key = `${Math.round(left * 10) / 10}:${Math.round(top * 10) / 10}:${visibility}`;
    if (seen.has(key)) return;
    seen.add(key);
    stars.push({ left, top, size, visibility });
  };

  /** Horizontal row with alternating ±nudge for light variation. */
  const pushRow = (
    xs: number[],
    top: number,
    size: string,
    visibility: Visibility,
    nudge = 1.5,
  ) => {
    xs.forEach((x, i) => {
      const offset = i % 2 === 0 ? -nudge : nudge;
      push(x, top + offset, size, visibility);
    });
  };

  /** Vertical column with alternating ±nudge. */
  const pushColumn = (
    x: number,
    ys: number[],
    size: string,
    visibility: Visibility,
    nudge = 1.5,
  ) => {
    ys.forEach((y, i) => {
      const offset = i % 2 === 0 ? -nudge : nudge;
      push(x + offset, y, size, visibility);
    });
  };

  // Outer frame — mobile keeps 3 on top/bottom; desktop fills in the gaps
  pushRow([8, 50, 92], 7, 'h-7 w-7', 'all');
  pushRow([28, 72], 7, 'h-7 w-7', 'md');
  pushRow([8, 50, 92], 93, 'h-7 w-7', 'all');
  pushRow([28, 72], 93, 'h-7 w-7', 'md');
  pushColumn(8, [28, 50, 72], 'h-7 w-7', 'all');
  pushColumn(92, [28, 50, 72], 'h-7 w-7', 'all');

  // Mobile: extra top & bottom rows closer to content (thinner than desktop)
  pushRow([30, 70], 18, 'h-6 w-6', 'mobile');
  pushRow([30, 70], 82, 'h-6 w-6', 'mobile');

  // Desktop: inner frame nearer the content
  pushRow([20, 40, 60, 80], 16, 'h-7 w-7', 'md');
  pushRow([20, 40, 60, 80], 84, 'h-7 w-7', 'md');
  pushColumn(20, [32, 50, 68], 'h-7 w-7', 'md');
  pushColumn(80, [32, 50, 68], 'h-7 w-7', 'md');

  return stars;
};

const PATTERN_STARS: ReadonlyArray<PatternStar> = buildTidyStars().map(
  (star, index) => ({
    variant: (index % 2 === 0 ? 0 : 1) as 0 | 1,
    left: `${star.left}%`,
    top: `${star.top}%`,
    sizeClassName: star.size,
    mdOnly: star.visibility === 'md',
    mobileOnly: star.visibility === 'mobile',
  }),
);

const STAR_FADE_DURATION_S = 0.45;
const STAR_STAGGER_S = 0.07;

/** Stable shuffled reveal order for this page load. */
const shuffleOrder = (length: number): number[] => {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }
  return order;
};

const StarField = () => {
  const prefersReducedMotion = useReducedMotion();
  const delayByIndex = useMemo(() => {
    const order = shuffleOrder(PATTERN_STARS.length);
    const delays = new Array<number>(PATTERN_STARS.length);
    order.forEach((starIndex, step) => {
      delays[starIndex] = step * STAR_STAGGER_S;
    });
    return delays;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {PATTERN_STARS.map((star, index) => (
        <motion.div
          key={`pattern-star-${index}`}
          className={[
            'absolute -translate-x-1/2 -translate-y-1/2',
            star.mdOnly ? 'hidden md:block' : undefined,
            star.mobileOnly ? 'md:hidden' : undefined,
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ left: star.left, top: star.top }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: STAR_FADE_DURATION_S,
                  delay: delayByIndex[index],
                  ease: 'easeOut',
                }
          }
        >
          <DecorativeStar
            variant={star.variant}
            className={star.sizeClassName}
            backgroundClassName=""
            svgClassName="block h-full w-full text-cream"
          />
        </motion.div>
      ))}
    </div>
  );
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
                <h1 className="mb-10 text-style-cursive-title text-xl text-cream md:text-4xl">
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
