import { parse } from 'url';
import { generateLinkHrefFromUrl } from './index';

describe('generateLinkHrefFromUrl', () => {
  test('should return with query object containing URL path in alias property.', () => {
    const url = parse('https://www.example.com/alias/path/foo');
    const result = generateLinkHrefFromUrl(url);

    expect(result).toHaveProperty('query');
    expect(result.query).toHaveProperty('alias');
    expect(result.query.alias).toEqual('/alias/path/foo');
  });

  test('should return with query property as `null`', () => {
    const url = parse('https://www.example.com/');
    const result = generateLinkHrefFromUrl(url);

    expect(result).toHaveProperty('query');
    expect(result.query).toBeNull();
  });
});
