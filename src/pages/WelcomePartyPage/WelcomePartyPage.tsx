import type { ReactNode } from 'react';
import { ReactComponent as BikeSvg } from '@assets/svgs/bike.svg';
import { ReactComponent as BirdSvg } from '@assets/svgs/bird.svg';
import { ReactComponent as BowSvg } from '@assets/svgs/bow.svg';
import { ReactComponent as HandSvg } from '@assets/svgs/hand.svg';
import { ReactComponent as PillowSvg } from '@assets/svgs/pillow.svg';
import { ReactComponent as SwansSvg } from '@assets/svgs/swans.svg';
import { ReactComponent as VaseSvg } from '@assets/svgs/vase.svg';
import { AnimatedVector, DottedDivider, GridContainer, IntroReveal, PhotoSlideshow, StarList } from '@components';
import { WELCOME_PARTY_MAPS_URL } from '@constants/map';
import { useNavigationVisibility } from '@hooks';
import { Navigation } from '@modules';
import { useTranslation } from '@i18n';

const TRANSPORT_KEYS = [
  'welcomeParty.transportBus400S',
  'welcomeParty.transportBus127',
  'welcomeParty.transportBus128',
] as const;

const WAITING_KEYS = [
  'welcomeParty.waitingItem1',
  'welcomeParty.waitingItem2',
  'welcomeParty.waitingItem3',
  'welcomeParty.waitingItem4',
] as const;

const SECTION_TITLE_CLASS =
  'text-style-cursive-title mx-auto max-w-lg text-center text-blood-orange md:max-w-xl';

const BODY_CLASS = 'text-style-paragraph-3 leading-relaxed';

type EditorialSectionProps = {
  title: string;
  children: ReactNode;
};

const EditorialSection = ({ title, children }: EditorialSectionProps) => (
  <section className="flex flex-col gap-7 md:gap-8">
    <h3 className={SECTION_TITLE_CLASS}>{title}</h3>
    {children}
  </section>
);

type RevealedSectionProps = {
  staggerIndex: number;
  showDivider?: boolean;
  children: ReactNode;
};

const RevealedSection = ({
  staggerIndex,
  showDivider = false,
  children,
}: RevealedSectionProps) => (
  <IntroReveal staggerIndex={staggerIndex} className="flex flex-col">
    {showDivider ? (
      <div className="my-20 md:my-28">
        <DottedDivider color="text-moss-green" />
      </div>
    ) : null}
    {children}
  </IntroReveal>
);

export const WelcomePartyPage = () => {
  const { t } = useTranslation();
  const showNavigation = useNavigationVisibility({ visibleAtTop: true });

  return (
    <main className="bg-cream text-black">
      <Navigation isVisible={showNavigation} />
      <GridContainer className="py-36 md:py-32 lg:py-40">
        <article className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4">
          <IntroReveal
            staggerIndex={0}
            className="mb-20 flex flex-col items-center gap-10 text-center md:mb-24 md:gap-12"
          >
            <h1 className="text-style-cursive-title text-3xl text-moss-green lg:text-5xl">
              {t('welcomeParty.title')}
            </h1>
            <PhotoSlideshow
              alt={t('welcomeParty.slideshowPhotoAlt')}
              ariaLabel={t('welcomeParty.slideshowLabel')}
              pauseLabel={t('welcomeParty.pauseSlideshow')}
              playLabel={t('welcomeParty.playSlideshow')}
            />
          </IntroReveal>

          <div className="flex flex-col">
            <RevealedSection staggerIndex={1}>
              <EditorialSection title={t('welcomeParty.sectionStartWeekend')}>
              <p className={BODY_CLASS + ' text-center text-moss-green'}>{t('welcomeParty.startP1')}</p>
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
                  <div
                    className="h-40 w-40 shrink-0"
                    aria-hidden
                  >
                    <AnimatedVector
                      Svg={BirdSvg}
                      className="h-full w-full text-moss-green"
                      svgClassName="block h-full w-full text-moss-green"
                      animationOptions={{
                        intensity: 'medium',
                        effect: 'stroke',
                        filterDisplayWidthPx: 224,
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col gap-7 md:gap-8">
                    <p className={BODY_CLASS}>{t('welcomeParty.startP2')}</p>
                    <p className={BODY_CLASS}>{t('welcomeParty.startP3')}</p>
                  </div>
                </div>
              </EditorialSection>
            </RevealedSection>

            <RevealedSection staggerIndex={2} showDivider>
              <section className="flex flex-col gap-7 md:gap-8">
                <div className="mx-auto w-40 shrink-0 md:w-52" aria-hidden>
                  <AnimatedVector
                    Svg={BikeSvg}
                    className="w-full"
                    svgClassName="block h-auto w-full text-moss-green"
                    animationOptions={{
                      intensity: 'medium',
                      effect: 'stroke',
                      filterDisplayWidthPx: 208,
                    }}
                  />
                </div>
                
                <div className="flex flex-col gap-2 text-center">
                  
                  <p className={SECTION_TITLE_CLASS}>
                    {t('welcomeParty.wheneverTime')}
                  </p>
                  <p className={BODY_CLASS + ' text-center text-moss-green'}>
                    {t('welcomeParty.wheneverDate')}
                  </p>
                </div>
                <p className={BODY_CLASS + ' text-center'}>{t('welcomeParty.wheneverP1')}</p>
                <p className={BODY_CLASS + ' text-center'}>{t('welcomeParty.wheneverP2')}</p>
              </section>
            </RevealedSection>

            <RevealedSection staggerIndex={3} showDivider>
              <EditorialSection title={t('welcomeParty.sectionWaiting')}>
                <div className="flex flex-row items-center justify-center gap-8 md:gap-10">
                  <div className="min-w-0 flex-1">
                    <StarList
                      items={WAITING_KEYS.map((key) => ({
                        key,
                        label: t(key),
                      }))}
                    />
                  </div>
                  <div
                    className="h-28 w-28 shrink-0 md:h-32 md:w-32 md:mr-14"
                    aria-hidden
                  >
                    <AnimatedVector
                      Svg={HandSvg}
                      className="h-full w-full text-moss-green"
                      svgClassName="block h-full w-full text-moss-green"
                      animationOptions={{
                        intensity: 'medium',
                        effect: 'stroke',
                        filterDisplayWidthPx: 128,
                      }}
                    />
                  </div>
                </div>
              </EditorialSection>
            </RevealedSection>

            <RevealedSection staggerIndex={4} showDivider>
              <EditorialSection title={t('welcomeParty.sectionFindUs')}>
                <p className={BODY_CLASS + ' text-center'}>{t('welcomeParty.findUsIntro')}</p>

                <address className={`${BODY_CLASS} not-italic text-center`}>
                  <a
                    href={WELCOME_PARTY_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-moss-green underline-offset-4 hover:underline"
                    aria-label={t('welcomeParty.addressMapsAria')}
                  >
                    {t('welcomeParty.addressLine1')}
                    <br />
                    {t('welcomeParty.addressLine2')}
                    <br />
                    {t('welcomeParty.addressLine3')}
                  </a>
                </address>

                <div className="mx-auto my-2 w-14 shrink-0 md:w-20" aria-hidden>
                  <AnimatedVector
                    Svg={BowSvg}
                    className="w-full"
                    svgClassName="block h-auto w-full text-moss-green"
                    animationOptions={{
                      intensity: 'medium',
                      effect: 'stroke',
                      filterDisplayWidthPx: 64,
                    }}
                  />
                </div>

                <div className="mt-6 flex flex-col gap-8">
                  <h3 className={SECTION_TITLE_CLASS}>
                    {t('welcomeParty.gettingHereTitle')}
                  </h3>

                  <div className="flex flex-col items-center gap-8 md:flex-row md:gap-28">
                    <div className="min-w-0 flex-1 flex flex-col gap-8">
                      <div className="flex flex-col gap-5">
                        <p className="text-style-paragraph-2 text-moss-green">
                          {t('welcomeParty.transportPublicLabel')}
                        </p>
                        <StarList
                          items={TRANSPORT_KEYS.map((key) => ({
                            key,
                            label: t(key),
                          }))}
                        />
                      </div>

                      <div className="flex flex-col gap-5">
                        <p className="text-style-paragraph-2 text-moss-green">
                          {t('welcomeParty.transportCarLabel')}
                        </p>
                        <p className={BODY_CLASS}>{t('welcomeParty.transportCarBody')}</p>
                      </div>
                    </div>

                    <div
                      className="h-44 w-44 shrink-0 items-center justify-center"
                      aria-hidden
                    >
                      <AnimatedVector
                        Svg={VaseSvg}
                        className="h-full w-full text-moss-green"
                        svgClassName="block h-full w-full text-moss-green"
                        animationOptions={{
                          intensity: 'medium',
                          effect: 'stroke',
                          filterDisplayWidthPx: 224,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </EditorialSection>
            </RevealedSection>

            <RevealedSection staggerIndex={5} showDivider>
              <EditorialSection title={t('welcomeParty.sectionOneThing')}>
                <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-10">
                  <div
                    className="h-36 w-36 shrink-0"
                    aria-hidden
                  >
                    <AnimatedVector
                      Svg={PillowSvg}
                      className="h-full w-full text-moss-green"
                      svgClassName="block h-full w-full text-moss-green"
                      animationOptions={{
                        intensity: 'medium',
                        effect: 'stroke',
                        filterDisplayWidthPx: 224,
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col gap-7 md:gap-8">
                    <p className={BODY_CLASS}>{t('welcomeParty.oneThingP1')}</p>
                    <p className={BODY_CLASS}>{t('welcomeParty.oneThingP2')}</p>
                  </div>
                </div>
              </EditorialSection>
            </RevealedSection>

            <RevealedSection staggerIndex={6} showDivider>
              <EditorialSection title={t('welcomeParty.sectionCantMakeIt')}>
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
                  <div className="min-w-0 flex-1 flex flex-col gap-7 md:gap-8">
                    <p className={BODY_CLASS}>{t('welcomeParty.cantMakeItP1')}</p>
                    <p className={BODY_CLASS}>{t('welcomeParty.cantMakeItP2')}</p>
                    <p className={BODY_CLASS}>{t('welcomeParty.cantMakeItP3')}</p>
                  </div>
                  <div
                    className="h-44 w-44 shrink-0"
                    aria-hidden
                  >
                    <AnimatedVector
                      Svg={SwansSvg}
                      className="h-full w-full text-moss-green"
                      svgClassName="block h-full w-full text-moss-green"
                      animationOptions={{
                        intensity: 'medium',
                        effect: 'stroke',
                        filterDisplayWidthPx: 224,
                      }}
                    />
                  </div>
                </div>
              </EditorialSection>
            </RevealedSection>
          </div>
        </article>
      </GridContainer>
    </main>
  );
};
