import padStart from 'lodash/padStart';

/**
 * Parse date into and array of padded date parts.
 * Example. `['2022, '02', '16']` for February, 16 2022.
 *
 * @param seconds number
 *    Duration in seconds.
 */
export const parseDateParts = (date: number | string | Date): string[] => {
  const dt = new Date(date);
  const dtYear = `${dt.getFullYear()}`;
  const dtMonth = padStart(`${dt.getMonth() + 1}`, 2, '0');
  const dtDate = padStart(`${dt.getDate()}`, 2, '0');

  return [dtYear, dtMonth, dtDate];
};
