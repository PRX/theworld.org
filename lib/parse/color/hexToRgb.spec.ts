import { hexToRgb, hexToCssRgba, addCssColorAlpha } from './index';

describe('lib/parse/color', () => {
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

  describe('hexToCssRgba', () => {
    test('should convert hex string to rgba.', () => {
      const result1 = hexToCssRgba('#00FF00', 0.5);
      const result2 = hexToCssRgba('#0F0', 0.25);

      expect(result1).toEqual('rgba(0,255,0,0.5)');
      expect(result2).toEqual('rgba(0,255,0,0.25)');
    });
  });

  describe('addCssColorAlpha', () => {
    test('should convert hex string to rgba.', () => {
      const result1 = addCssColorAlpha('#00FF00', 0.5);
      const result2 = addCssColorAlpha('#0F0', 0.25);

      expect(result1).toEqual('rgba(0,255,0,0.5)');
      expect(result2).toEqual('rgba(0,255,0,0.25)');
    });

    test('should convert rgb string to rgba.', () => {
      const result1 = addCssColorAlpha('rgb(0,255,0)', 0.5);
      const result2 = addCssColorAlpha('rgb(0, 255, 0)', 0.5);
      const result3 = addCssColorAlpha('rgb(0 255 0)', 0.5);

      expect(result1).toEqual('rgba(0,255,0,0.5)');
      expect(result2).toEqual('rgba(0,255,0,0.5)');
      expect(result3).toEqual('rgba(0,255,0,0.5)');
    });

    test('should convert hsl string to hsla.', () => {
      const result1 = addCssColorAlpha('hsl(100,100%,30%)', 0.5);
      const result2 = addCssColorAlpha('hsl(100, 100%, 30%)', 0.5);
      const result3 = addCssColorAlpha('hsl(100 100% 30%)', 0.5);
      const result4 = addCssColorAlpha('hsl(100, 100%, 30% / 0.75)', 0.5);

      expect(result1).toEqual('hsla(100,100%,30%,0.5)');
      expect(result2).toEqual('hsla(100,100%,30%,0.5)');
      expect(result3).toEqual('hsla(100,100%,30%,0.5)');
      expect(result4).toEqual('hsla(100,100%,30%,0.5)');
    });

    test('should update alpha of rgba and hsla.', () => {
      const result1 = addCssColorAlpha('rgba(0,255,0,0.75)', 0.5);
      const result2 = addCssColorAlpha('hsla(100,100%,30%,0.75)', 0.5);

      expect(result1).toEqual('rgba(0,255,0,0.5)');
      expect(result2).toEqual('hsla(100,100%,30%,0.5)');
    });
  });
});
