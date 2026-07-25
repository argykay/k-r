import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { ReactComponent as CakeSvg } from '@assets/svgs/cake.svg';
import { ReactComponent as CarSvg } from '@assets/svgs/car.svg';
import { ReactComponent as HandsSvg } from '@assets/svgs/hands.svg';
import { ReactComponent as CupidSvg } from '@assets/svgs/cupid.svg';
import { ReactComponent as CottageSvg } from '@assets/svgs/cottage.svg';
import { ReactComponent as MenuSvg } from '@assets/svgs/menu.svg';
import { ReactComponent as TentSvg } from '@assets/svgs/tent.svg';
import { AnimatedVector, DecorativeStar, GridContainer, IntroReveal } from '@components';
import { useTranslation } from '@i18n';
import type { TranslationKey } from '@i18n/types';
import type { AnimatedVectorOptions } from '../../utils/animatedVector';

const VENUE_MAPS_URL = 'https://maps.app.goo.gl/NpXnyFJZWg474Fw78';
const PICKUP_MAPS_URL = 'https://maps.app.goo.gl/56GTwthD6LvPpx1v9';

const TIMELINE_ICON_ANIMATION: Pick<
  TimelineEntry,
  'iconAnimated' | 'iconAnimationOptions'
> = {
  iconAnimated: true,
  iconAnimationOptions: {
    intensity: 'subtle',
    effect: 'stroke',
    filterDisplayWidthPx: 40,
  },
};

type TimelineBodyLink = {
  href: string;
  beforeKey: TranslationKey;
  labelKey: TranslationKey;
  afterKey: TranslationKey;
  ariaKey: TranslationKey;
};

type TimelineEntry = {
  id: string;
  /** English-only — rendered in cursive, not locale-translated. */
  time: string;
  /** English-only — rendered in cursive, not locale-translated. */
  title: string;
  bodyKey: TranslationKey;
  bodyLink?: TimelineBodyLink;
  dateTime?: string;
  /** Pass an SVGR icon when ready — slot keeps size and alignment. */
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconAnimated?: boolean;
  iconAnimationOptions?: AnimatedVectorOptions;
};

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 'gettingThere',
    time: '12:00',
    title: 'Getting there',
    bodyKey: 'timeline.gettingThereHotel',
    dateTime: '2026-09-12T12:00',
    bodyLink: {
      href: PICKUP_MAPS_URL,
      beforeKey: 'timeline.gettingThereBodyBefore',
      labelKey: 'timeline.gettingThereHotel',
      afterKey: 'timeline.gettingThereBodyAfter',
      ariaKey: 'timeline.gettingThereMapsAria',
    },
    icon: CupidSvg,
    ...TIMELINE_ICON_ANIMATION,
  },
  {
    id: 'arrive',
    time: '13:00',
    title: 'Arrival',
    bodyKey: 'timeline.arriveVenue',
    dateTime: '2026-09-12T13:00',
    bodyLink: {
      href: VENUE_MAPS_URL,
      beforeKey: 'timeline.arriveBodyBefore',
      labelKey: 'timeline.arriveVenue',
      afterKey: 'timeline.arriveBodyAfter',
      ariaKey: 'timeline.arriveMapsAria',
    },
    icon: CottageSvg,
    ...TIMELINE_ICON_ANIMATION,
  },
  {
    id: 'ceremony',
    time: '13:15',
    title: 'Ceremony',
    bodyKey: 'timeline.ceremonyBody',
    dateTime: '2026-09-12T13:15',
    icon: HandsSvg,
    ...TIMELINE_ICON_ANIMATION,
  },
  {
    id: 'drinks',
    time: '14:30',
    title: 'Drinks & cake',
    bodyKey: 'timeline.drinksBody',
    dateTime: '2026-09-12T14:30',
    icon: CakeSvg,
    ...TIMELINE_ICON_ANIMATION,
  },
  {
    id: 'dinner',
    time: '16:00',
    title: 'Dinner',
    bodyKey: 'timeline.dinnerBody',
    icon: MenuSvg,
    ...TIMELINE_ICON_ANIMATION,
  },
  {
    id: 'party',
    time: '20:00',
    title: 'Party',
    bodyKey: 'timeline.partyBody',
    dateTime: '2026-09-12T20:00',
    icon: TentSvg,
    ...TIMELINE_ICON_ANIMATION,
  },
  {
    id: 'returnBuses',
    time: '01:00',
    title: 'Return buses',
    bodyKey: 'timeline.returnBusesBody',
    icon: CarSvg,
    ...TIMELINE_ICON_ANIMATION,
  },
];

type TimelineIconSlotProps = {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconAnimated?: boolean;
  iconAnimationOptions?: AnimatedVectorOptions;
  label: string;
};

const TimelineIconSlot = ({
  icon: Icon,
  iconAnimated = false,
  iconAnimationOptions,
  label,
}: TimelineIconSlotProps) => {
  if (Icon) {
    return (
      <div
        className="timeline-icon-slot relative z-10 h-24 w-24 shrink-0 md:h-32 md:w-32"
        aria-hidden
      >
        {iconAnimated ? (
          <AnimatedVector
            Svg={Icon}
            svgClassName="block h-full w-full text-moss-green"
            animationOptions={
              iconAnimationOptions ?? {
                intensity: 'medium',
                effect: 'stroke',
                filterDisplayWidthPx: 128,
              }
            }
          />
        ) : (
          <Icon className="block h-full w-full text-moss-green" aria-hidden />
        )}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return (
    <div
      className="timeline-icon-slot relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed border-burgundy/25 bg-cream/90 md:h-16 md:w-16"
      aria-hidden
    >
      <span className="block h-2.5 w-2.5 rounded-full bg-burgundy/20" />
      <span className="sr-only">{label}</span>
    </div>
  );
};

const TIMELINE_ROW_GRID =
  'grid w-full grid-cols-4 items-center gap-2 md:grid-cols-6 md:gap-6 lg:grid-cols-12 lg:gap-10';

/**
 * Base (4 cols): icon 1 + star 1 + text 2.
 * md (6 cols): icon @ 1, star @ 2, text @ 3–5.
 * lg (12 cols): icon @ 4–5, star @ 6, text @ 7–10.
 */
const TIMELINE_ICON_COL =
  'col-span-1 flex justify-center self-center md:col-start-1 lg:col-span-2 lg:col-start-4';
const TIMELINE_STAR_COL =
  'timeline-star-column relative col-span-1 flex self-stretch items-center justify-center md:col-start-2 lg:col-start-6';
const TIMELINE_TEXT_COL =
  'col-span-2 min-w-0 ml-1 md:col-start-3 md:col-span-3 lg:col-span-4 lg:col-start-7 lg:pl-16';

const TimelineSpineRail = () => (
  <div
    className={[TIMELINE_ROW_GRID, 'pointer-events-none absolute inset-x-0 top-0 bottom-0 z-0'].join(
      ' ',
    )}
    aria-hidden
  >
    <div className={TIMELINE_ICON_COL} />
    <div className={[TIMELINE_STAR_COL, 'h-full'].join(' ')}>
      <div className="timeline-spine-rail absolute left-1/2 w-0 -translate-x-1/2">
        <svg
          className="h-full w-2 overflow-visible"
          width="2"
          height="100%"
          preserveAspectRatio="none"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            className="timeline-spine-line animate-timeline-dash"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
    <div className={TIMELINE_TEXT_COL} />
  </div>
);

type TimelineRowProps = {
  entry: TimelineEntry;
  staggerIndex: number;
  starRef?: React.Ref<HTMLDivElement>;
};

const TIMELINE_TIME_CLASS = 'text-style-cursive-time text-xxl shrink-0 text-moss-green';
const TIMELINE_TITLE_CLASS =
  'text-style-cursive-title text-xl text-moss-green text-balance';
const TIMELINE_BODY_CLASS =
  'text-style-paragraph-3 leading-relaxed text-stone/60 text-balance';

const timelineLinkClassName =
  'text-inherit underline underline transition-colors hover:text-moss-green';

const TimelineBody = ({
  entry,
}: {
  entry: TimelineEntry;
}) => {
  const { t } = useTranslation();
  if (entry.bodyLink) {
    const { href, beforeKey, labelKey, afterKey, ariaKey } = entry.bodyLink;

    return (
      <p className={TIMELINE_BODY_CLASS}>
        {t(beforeKey)}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={timelineLinkClassName}
          aria-label={t(ariaKey)}
        >
          {t(labelKey)}
        </a>
        {t(afterKey)}
      </p>
    );
  }

  return <p className={TIMELINE_BODY_CLASS}>{t(entry.bodyKey)}</p>;
};

const TimelineRow = ({ entry, staggerIndex, starRef }: TimelineRowProps) => {
  const { t } = useTranslation();
  const rowLabel = entry.bodyLink
    ? `${t(entry.bodyLink.beforeKey)}${t(entry.bodyLink.labelKey)}${t(entry.bodyLink.afterKey)}`
    : t(entry.bodyKey);

  return (
    <li className="timeline-row relative flex justify-center items-center">
      <IntroReveal
        staggerIndex={staggerIndex}
        className={[TIMELINE_ROW_GRID, 'py-1'].join(' ')}
      >
        <div className={TIMELINE_ICON_COL}>
          <TimelineIconSlot
            icon={entry.icon}
            iconAnimated={entry.iconAnimated}
            iconAnimationOptions={entry.iconAnimationOptions}
            label={rowLabel}
          />
        </div>
        <div className={TIMELINE_STAR_COL}>
          <DecorativeStar
            variant={staggerIndex % 2 === 0 ? 0 : 1}
            starRef={starRef}
          />
        </div>
        <div
          className={[
            TIMELINE_TEXT_COL,
            'flex w-full flex-col gap-2 pb-2 pt-2 m-auto md:pb-3 md:pt-3',
          ].join(' ')}
        >
          <div
            className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
            lang="en"
          >
            <time dateTime={entry.dateTime} className={TIMELINE_TIME_CLASS}>
              {entry.time}
            </time>
            <span className={TIMELINE_TITLE_CLASS}>{entry.title}</span>
          </div>
          <TimelineBody entry={entry} />
        </div>
      </IntroReveal>
    </li>
  );
};

const TimelineList = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const firstStarRef = useRef<HTMLDivElement>(null);
  const lastStarRef = useRef<HTMLDivElement>(null);

  const updateSpineInsets = useCallback(() => {
    const wrap = wrapRef.current;
    const first = firstStarRef.current;
    const last = lastStarRef.current;
    if (!wrap || !first || !last) {
      return;
    }

    const wrapRect = wrap.getBoundingClientRect();
    const firstRect = first.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();

    const top = firstRect.top + firstRect.height / 2 - wrapRect.top;
    const bottom = wrapRect.bottom - (lastRect.top + lastRect.height / 2);

    wrap.style.setProperty('--timeline-spine-top', `${top}px`);
    wrap.style.setProperty('--timeline-spine-bottom', `${bottom}px`);
  }, []);

  useLayoutEffect(() => {
    updateSpineInsets();

    const wrap = wrapRef.current;
    if (!wrap) {
      return undefined;
    }

    const observer = new ResizeObserver(updateSpineInsets);
    observer.observe(wrap);
    firstStarRef.current && observer.observe(firstStarRef.current);
    lastStarRef.current && observer.observe(lastStarRef.current);
    window.addEventListener('resize', updateSpineInsets);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSpineInsets);
    };
  }, [updateSpineInsets]);

  const lastIndex = TIMELINE_ENTRIES.length - 1;

  return (
    <div ref={wrapRef} className="timeline-list-wrap relative">
      <TimelineSpineRail />
      <ol className="timeline-list relative z-10 flex w-full flex-col gap-10 md:gap-12">
        {TIMELINE_ENTRIES.map((entry, index) => (
          <TimelineRow
            key={entry.id}
            entry={entry}
            staggerIndex={index}
            starRef={
              index === 0
                ? firstStarRef
                : index === lastIndex
                  ? lastStarRef
                  : undefined
            }
          />
        ))}
      </ol>
    </div>
  );
};

export const Timeline = () => {
  const { t } = useTranslation();

  return (
    <section
      id="timeline"
      className="bg-cream text-stone/60"
      aria-labelledby="timeline-heading"
    >
      <GridContainer className="py-20 md:py-28 lg:py-32">
        <div className="col-span-4 md:col-span-6 lg:col-span-12">

          <IntroReveal
            as="h2"
            className="text-style-cursive-title mx-auto mb-12 max-w-lg text-center text-blood-orange md:mb-8 md:max-w-xl"
          >
            {t('timeline.intro1')}
          </IntroReveal>

          <IntroReveal
            as="p"
            className="text-style-paragraph-3 mx-auto mb-12 max-w-lg text-center text-stone/60 md:mb-16 md:max-w-xl"
          >
            {t('timeline.intro2')}
          </IntroReveal>

          <TimelineList />

          <IntroReveal
            as="p"
            className="text-style-caption mx-auto mt-14 max-w-md text-center text-stone/60 md:mt-16 text-balance"
          >
            {t('timeline.footnote')}
          </IntroReveal>
        </div>
      </GridContainer>
    </section>
  );
};
