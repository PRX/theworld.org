import { parseDateParts } from './index';

describe('lib/parse/date', () => {
  describe('parseUtcDate', () => {
    test('should parse UTC date into array of padded date parts', () => {
      const result = parseDateParts(1645044300000); // UTC Date for February 16, 2022 · 3:45 PM EST

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual('2022');
      expect(result[1]).toEqual('02');
      expect(result[2]).toEqual('16');
    });
  });
});
