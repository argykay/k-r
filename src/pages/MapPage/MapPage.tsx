import { GoogleMapEmbed, GridContainer, IntroReveal } from '@components';
import { MAP_VIEWER_URL } from '@constants/map';
import { useNavigationVisibility } from '@hooks';
import { Navigation } from '@modules';
import { useTranslation } from '@i18n';

export const MapPage = () => {
  const { t } = useTranslation();
  const showNavigation = useNavigationVisibility({ visibleAtTop: true });

  return (
    <main className="bg-moss-green text-cream">
      <Navigation isVisible={showNavigation} />
      <GridContainer className="pt-32 md:pt-28">
        <div className="col-span-4 flex flex-col items-center gap-6 md:col-span-6 md:col-start-1 lg:col-span-6 lg:col-start-4">
          <IntroReveal staggerIndex={0}>
            <h1 className="text-style-cursive-title text-center text-xl text-cream lg:text-4xl">
              {t('map.title')}
            </h1>
          </IntroReveal>
          <IntroReveal as="p" staggerIndex={1} className="text-style-paragraph-3 text-center text-cream">
            {t('map.intro')}
          </IntroReveal>
        </div>
      </GridContainer>
      <GridContainer className="py-6">
        <div className="my-6 col-span-4 flex justify-center md:col-span-6 md:col-start-1 lg:col-span-6 lg:col-start-4">
          <IntroReveal staggerIndex={2}>
            <a
              href={MAP_VIEWER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-style-button inline-block rounded border border-cream bg-cream px-8 py-3 text-moss-green transition-colors hover:bg-transparent hover:text-cream"
              aria-label={t('map.openInMapsAria')}
            >
              {t('map.openInMaps')}
            </a>
          </IntroReveal>
        </div>
      </GridContainer>
      <GoogleMapEmbed />
    </main>
  );
};
