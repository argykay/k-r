import React from 'react';
import { PasswordGate } from './PasswordGate';
import { useSiteAccess } from './useSiteAccess';

export type SiteAccessGateProps = {
  children: React.ReactNode;
};

export const SiteAccessGate = ({ children }: SiteAccessGateProps) => {
  const { enabled, unlocked, error, submitPassword } = useSiteAccess();

  if (!enabled || unlocked) {
    return <>{children}</>;
  }

  return <PasswordGate error={error} onSubmit={submitPassword} />;
};
