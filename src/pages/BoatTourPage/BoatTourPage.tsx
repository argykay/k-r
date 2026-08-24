import type { ReactNode } from 'react';
import { GridContainer, IntroReveal } from '@components';
import { KALVEBOD_BOLGE_MAPS_URL, REFFEN_MAPS_URL } from '@constants/map';
import { useNavigationVisibility } from '@hooks';
import { Navigation } from '@modules';
import { useTranslation, type TranslationKey } from '@i18n';
import { FaqSideStars } from '../FaqPage/FaqSideStars';

const BODY_CLASS = 'text-style-paragraph-3 leading-relaxed text-black';
const LINK_CLASS =
  'text-moss-green underline underline-offset-4';

const BoatTourSideStars = () => (
  <FaqSideStars svgClassName="block h-full w-full text-blood-orange" />
);

type MapsLinkProps = {
  href: string;
  labelKey: TranslationKey;
  ariaKey: TranslationKey;
};

const MapsLink = ({ href, labelKey, ariaKey }: MapsLinkProps) => {
  const { t } = useTranslation();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={LINK_CLASS}
      aria-label={t(ariaKey)}
    >
      {t(labelKey)}
    </a>
  );
};

type LinkedParagraphProps = {
  beforeKey: TranslationKey;
  afterKey: TranslationKey;
  children: ReactNode;
};

const LinkedParagraph = ({
  beforeKey,
  afterKey,
  children,
}: LinkedParagraphProps) => {
  const { t } = useTranslation();

  return (
    <p className={BODY_CLASS}>
      {t(beforeKey)}
      {children}
      {t(afterKey)}
    </p>
  );
};

export const BoatTourPage = () => {
  const { t } = useTranslation();
  const showNavigation = useNavigationVisibility({ visibleAtTop: true });

  return (
    <main>
      <Navigation isVisible={showNavigation} />
      <section className="relative overflow-hidden bg-background-off-white py-16">
        <BoatTourSideStars />
        <GridContainer className="relative z-10">
          <div className="col-span-4 md:col-span-4 md:col-start-2 lg:col-span-6 lg:col-start-4">
            <header className="pt-20 text-center">
              <IntroReveal staggerIndex={0}>
                <h1 className="text-style-cursive-title text-3xl text-blood-orange lg:text-4xl">
                  {t('boatTour.title')}
                </h1>
              </IntroReveal>
            </header>

            <IntroReveal
              staggerIndex={1}
              className="my-8 flex flex-col gap-8 text-left"
            >
              <p className={BODY_CLASS}>{t('boatTour.p1')}</p>
              <LinkedParagraph
                beforeKey="boatTour.p2Before"
                afterKey="boatTour.p2After"
              >
                <MapsLink
                  href={KALVEBOD_BOLGE_MAPS_URL}
                  labelKey="boatTour.kalvebodLabel"
                  ariaKey="boatTour.kalvebodMapsAria"
                />
              </LinkedParagraph>
              <LinkedParagraph
                beforeKey="boatTour.p3Before"
                afterKey="boatTour.p3After"
              >
                <MapsLink
                  href={REFFEN_MAPS_URL}
                  labelKey="boatTour.reffenLabel"
                  ariaKey="boatTour.reffenMapsAria"
                />
              </LinkedParagraph>
              <p className={BODY_CLASS}>{t('boatTour.p4')}</p>
              <p className={BODY_CLASS}>{t('boatTour.p5')}</p>
            </IntroReveal>
          </div>
        </GridContainer>
      </section>
    </main>
  );
};
