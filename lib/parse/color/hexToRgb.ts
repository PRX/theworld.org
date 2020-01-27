/**
 * @file hexToRgb.ts
 * Helper to convert hex string into array of number values.
 */

export default (hex: string) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m: string, r: string, g: string, b: string) =>
        '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x: string) => parseInt(x, 16));
