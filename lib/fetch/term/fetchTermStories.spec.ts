import { generateFieldNameFromPath } from './fetchTermStories';

describe('lib/fetch/term', () => {
  describe(generateFieldNameFromPath, () => {
    test('should generate `tags` path.', () => {
      const result = generateFieldNameFromPath('/tags/foo');

      expect(result).toEqual('tags');
    });

    test('should generate `opencalais_*` path.', () => {
      let result = generateFieldNameFromPath('/city/foo');
      expect(result).toEqual('opencalais_city');

      result = generateFieldNameFromPath('/country/foo');
      expect(result).toEqual('opencalais_country');
    });

    test('should generate `opencalais_province` path.', () => {
      const result = generateFieldNameFromPath('/province-or-state/foo');

      expect(result).toEqual('opencalais_province');
    });
  });
});
