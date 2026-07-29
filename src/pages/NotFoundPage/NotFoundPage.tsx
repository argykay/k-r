import { GridContainer, StarField } from '@components';
import { useTranslation } from '@i18n';
import { LocaleLink } from '@routing';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <main className="relative flex min-h-screen items-center bg-moss-green text-cream">
      <StarField />
      <div className="relative z-10 w-full py-24 pb-32 md:py-32 md:pb-40">
        <GridContainer className="w-full">
          <div className="col-span-4 md:col-span-6 md:col-start-1 lg:col-span-6 lg:col-start-4">
            <div className="mx-auto flex max-w-lg flex-col items-center gap-8 text-center">
              <div className="flex flex-col">
                <span className="text-style-cursive-title text-xl text-cream md:text-4xl">404</span>
                <h1 className="text-style-header-4 text-cream mb-10">{t('notFound.title')}</h1>
                <h2 className="text-style-cursive-title text-xl text-cream md:text-4xl md:my-12">
                  {t('notFound.description')}
                </h2>
              </div>

              <LocaleLink
                route="home"
                className="text-style-button rounded border border-cream bg-off-white px-4 py-3 text-moss-green transition-colors hover:bg-transparent hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-moss-green"
              >
                {t('notFound.homeCta')}
              </LocaleLink>

            </div>
          </div>
        </GridContainer>
      </div>
    </main>
  );
};
