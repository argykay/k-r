export const SITE_ACCESS_STORAGE_KEY = 'k-r-site-unlocked';

export const getSitePassword = (): string =>
  process.env.REACT_APP_SITE_PASSWORD?.trim() ?? '';

export const isSiteAccessEnabled = (): boolean =>
  getSitePassword().length > 0;

export const checkPassword = (candidate: string): boolean => {
  const password = getSitePassword();
  if (!password) {
    return true;
  }
  return candidate === password;
};

export const unlockSite = (): void => {
  try {
    sessionStorage.setItem(SITE_ACCESS_STORAGE_KEY, '1');
  } catch {
    // sessionStorage may be unavailable in private mode or restricted contexts
  }
};

export const isSiteUnlocked = (): boolean => {
  try {
    return sessionStorage.getItem(SITE_ACCESS_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};
