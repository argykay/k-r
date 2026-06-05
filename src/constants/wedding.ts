/** Ceremony location — Lejre, Denmark. */
export const WEDDING_TIMEZONE = 'Europe/Copenhagen';

const WEDDING_LOCAL = {
  year: 2026,
  month: 9,
  day: 13,
  hour: 13,
  minute: 0,
  second: 0,
} as const;

/**
 * UTC timestamp for a wall-clock time in an IANA timezone (handles DST).
 */
export const zonedTimeToUtc = (
  local: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute?: number;
    second?: number;
  },
  timeZone: string
): number => {
  const {
    year,
    month,
    day,
    hour,
    minute = 0,
    second = 0,
  } = local;

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const readZoned = (instant: number) => {
    const parts = formatter.formatToParts(new Date(instant));
    const pick = (type: Intl.DateTimeFormatPartTypes) =>
      Number(parts.find((p) => p.type === type)?.value ?? 0);

    return Date.UTC(
      pick('year'),
      pick('month') - 1,
      pick('day'),
      pick('hour'),
      pick('minute'),
      pick('second')
    );
  };

  const desired = Date.UTC(year, month - 1, day, hour, minute, second);
  let guess = desired;

  for (let i = 0; i < 5; i += 1) {
    const delta = desired - readZoned(guess);
    if (delta === 0) {
      return guess;
    }
    guess += delta;
  }

  return guess;
};

/** Wedding ceremony — 13 Sep 2026, 13:00 Europe/Copenhagen (venue local time). */
export const WEDDING_START_MS = zonedTimeToUtc(WEDDING_LOCAL, WEDDING_TIMEZONE);

export const WEDDING_START = new Date(WEDDING_START_MS);

export function getTimeUntilWedding(now = new Date()) {
  const diff = Math.max(0, WEDDING_START_MS - now.getTime());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: diff === 0 && now.getTime() >= WEDDING_START_MS,
  };
}
