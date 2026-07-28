import React from 'react';
import { MAP_EMBED_URL } from '@constants/map';
import { useTranslation } from '@i18n';

export const GoogleMapEmbed = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
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
