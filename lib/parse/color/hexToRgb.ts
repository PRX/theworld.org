/**
 * @file hexToRgb.ts
 * Helper to convert hex string into array of number values.
 */

export type RgbValues = number[];

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

export const hexToCssRgba = (hex: string, alpha: number = 1) =>
  `rgba(${hexToRgb(hex)},${alpha})`;

export const addCssColorAlpha = (color: string, alpha: number = 1) =>
  color.indexOf('#') === 0
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
