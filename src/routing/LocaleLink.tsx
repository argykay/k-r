import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import type { RouteId } from './paths';
import { localizedPath } from './paths';
import { useTranslation } from '@i18n';

export type LocaleLinkProps = Omit<LinkProps, 'to'> & {
  route?: RouteId;
  to?: never;
};

/** Internal link that keeps the current locale prefix. */
export const LocaleLink = ({ route = 'home', ...props }: LocaleLinkProps) => {
  const { locale } = useTranslation();
  return <Link to={localizedPath(locale, route)} {...props} />;
};
