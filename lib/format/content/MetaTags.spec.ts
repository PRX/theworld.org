import { sanitizeContent } from './sanitizeContent';

describe('Components/MetaTags', () => {
  describe('sanitizeContent', () => {
    test('should handle undefined value', () => {
      const result = sanitizeContent(undefined);

      expect(result).toBeUndefined();
    });

    test('should handle null value', () => {
      const result = sanitizeContent(null);

      expect(result).toBeUndefined();
    });

    test('should handle empty value', () => {
      const result = sanitizeContent('');

      expect(result).toEqual('');
    });

    test('should remove HTML tags.', () => {
      const result = sanitizeContent('<b>foo</b>');
      expect(result).toEqual('foo');
    });
  });
});
