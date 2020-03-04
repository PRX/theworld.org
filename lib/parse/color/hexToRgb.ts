/**
 * @file hexToRgb.ts
 */

export type RgbValues = number[];

/**
 * Helper to convert hex string into array of number values.
 *
 * @param hex
 *    Hexidecimal color string.
 */
export const hexToRgb = (hex: string): RgbValues =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m: string, r: string, g: string, b: string) =>
        `#${r}${r}${g}${g}${b}${b}`
    )
    .replace(/^#/, '')
    .match(/.{2}/g)
    .map((x: string) => parseInt(x, 16));

/**
 * Convert hexidecimal colors strings to rgba.
 *
 * @param hex
 *    Hexidecimal color string.
 * @param alpha
 *    Number between 0 and 1.
 */
export const hexToCssRgba = (hex: string, alpha: number) =>
  `rgba(${hexToRgb(hex)},${alpha})`;

/**
 * Add alpha value to CSS color. Hexideciaml strings will be converted to rgba.
 *
 * @param color
 *    CSS color string.
 * @param alpha
 *    Number bewteen 0 and 1.
 */
export const addCssColorAlpha = (color: string, alpha: number) =>
  color.match(/^#?(?:(?:[a-f\d]{2}){3}|(?:[a-f\d]){3})$/i)
    ? hexToCssRgba(color, alpha)
    : color
      .replace(/^rgb\(/, 'rgba(')
      .replace(/^hsl\(/, 'hsla(')
      .replace(/\(([^)]+)\)/, (m: string, p: string) => {
        const rgba = p
          .split(/,\s?|\s\/\s|\s/)
          .slice(0, 3);

        rgba.push(`${alpha}`);

        return `(${rgba})`;
      });
