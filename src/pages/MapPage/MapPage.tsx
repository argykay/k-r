import { GoogleMapEmbed, GridContainer } from '@components';
import { MAP_VIEWER_URL } from '@constants/map';
import { Navigation } from '@modules';
import { useTranslation } from '@i18n';

export const MapPage = () => {
  const { t } = useTranslation();

  return (
    <main className="bg-moss-green text-cream">
      <Navigation isVisible={true} />
      <GridContainer className="py-32 md:py-28">
        <div className="col-span-4 flex flex-col items-center gap-6 md:col-span-6 md:col-start-1 lg:col-span-6 lg:col-start-4">
          <h1 className="text-style-cursive-title text-center text-xl text-cream lg:text-4xl">
            {t('map.title')}
          </h1>
          <p className="text-style-paragraph-3 text-center text-cream">
            {t('map.intro')}
          </p>
          <GoogleMapEmbed />
          <p className="text-center">
            <a
              href={MAP_VIEWER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-style-link text-cream underline-offset-4 hover:underline"
              aria-label={t('map.openInMapsAria')}
            >
              {t('map.openInMaps')}
            </a>
          </p>
        </div>
      </GridContainer>
    </main>
  );
};
