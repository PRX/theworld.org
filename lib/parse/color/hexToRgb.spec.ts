import { hexToRgb, RgbValues } from './index';

describe(hexToRgb, () => {
  test('should parse hex string to RGB values.', () => {
    const result = hexToRgb('#00FF00');

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(0);
    expect(result[1]).toEqual(255);
    expect(result[2]).toEqual(0);
  });

  test('should parse hex without hash.', () => {
    const result = hexToRgb('00FF00');

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(0);
    expect(result[1]).toEqual(255);
    expect(result[2]).toEqual(0);
  });

  test('should parse 3 character hex string to RGB values.', () => {
    const result = hexToRgb('#0F0');

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(0);
    expect(result[1]).toEqual(255);
    expect(result[2]).toEqual(0);
  });
});
