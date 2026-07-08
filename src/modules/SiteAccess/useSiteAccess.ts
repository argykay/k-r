import { useCallback, useState } from 'react';
import {
  SITE_ACCESS_STORAGE_KEY,
  checkPassword,
  isSiteAccessEnabled,
  isSiteUnlocked,
  unlockSite,
} from '@constants/siteAccess';

let devLockQueryHandled = false;

/** Dev only: visit `/?lock` to clear session unlock and see the gate again. */
const maybeHandleDevLockQuery = (): void => {
  if (
    devLockQueryHandled ||
    process.env.NODE_ENV !== 'development' ||
    typeof window === 'undefined' ||
    !isSiteAccessEnabled()
  ) {
    return;
  }

  devLockQueryHandled = true;

  const params = new URLSearchParams(window.location.search);
  if (!params.has('lock')) {
    return;
  }

  try {
    sessionStorage.removeItem(SITE_ACCESS_STORAGE_KEY);
  } catch {
    // ignore
  }

  params.delete('lock');
  const search = params.toString();
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`,
  );
};

export function useSiteAccess() {
  maybeHandleDevLockQuery();

  const enabled = isSiteAccessEnabled();
  const [unlocked, setUnlocked] = useState(() => {
    if (!enabled) {
      return true;
    }
    return isSiteUnlocked();
  });
  const [error, setError] = useState(false);

  const submitPassword = useCallback(
    (candidate: string) => {
      if (!enabled) {
        setUnlocked(true);
        return;
      }

      if (checkPassword(candidate)) {
        unlockSite();
        setUnlocked(true);
        setError(false);
        return;
      }

      setError(true);
    },
    [enabled],
  );

  return {
    enabled,
    unlocked,
    error,
    submitPassword,
  };
}
