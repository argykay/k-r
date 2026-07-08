import React from 'react';
import { MAP_EMBED_URL } from '@constants/map';
import { useTranslation } from '@i18n';

export const GoogleMapEmbed = () => {
  const { t } = useTranslation();

  return (
    <div
      className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg shadow-md"
      style={{ aspectRatio: '1 / 1' }}
    >
      <iframe
        src={MAP_EMBED_URL}
        className="h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        title={t('map.embedTitle')}
      />
    </div>
  );
};
