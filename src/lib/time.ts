/** Units from largest to smallest, in seconds. A month is the mean Gregorian month. */
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31_557_600],
  ['month', 2_629_800],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60]
];

const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

/**
 * How long ago `then` was: "just now", "3 minutes ago", "yesterday", "2 weeks ago". Uses the
 * largest unit that fits; anything under a minute, or in the future, is "just now".
 */
export function timeAgo(then: number, now = Date.now()): string {
  const seconds = Math.max(0, (now - then) / 1000);
  for (const [unit, size] of UNITS) {
    if (seconds >= size) return formatter.format(-Math.floor(seconds / size), unit);
  }
  return 'just now';
}
