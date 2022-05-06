import { generateFieldNameFromPath } from './fetchTermStories';

describe('lib/fetch/term', () => {
  describe('generateFieldNameFromPath', () => {
    test('should generate `tags` field name.', () => {
      const result = generateFieldNameFromPath('/tags/foo');

      expect(result).toEqual('tags');
    });

    test('should generate `format` field name.', () => {
      const result = generateFieldNameFromPath('/story-format/foo');

      expect(result).toEqual('format');
    });

    test('should generate `opencalais_*` field name.', () => {
      let result = generateFieldNameFromPath('/city/foo');
      expect(result).toEqual('opencalais_city');

      result = generateFieldNameFromPath('/country/foo');
      expect(result).toEqual('opencalais_country');
    });

    test('should generate `opencalais_province` field name.', () => {
      const result = generateFieldNameFromPath('/province-or-state/foo');

      expect(result).toEqual('opencalais_province');
    });

    test('should generate `opencalais_social` field name.', () => {
      const result = generateFieldNameFromPath('/social-tags/foo');

      expect(result).toEqual('opencalais_social');
    });

    test('should generate `false` field name.', () => {
      const result = generateFieldNameFromPath('/countries-regions/foo');

      expect(result).toEqual(false);
    });
  });
});
