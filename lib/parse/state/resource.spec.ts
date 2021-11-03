import { makeResourceSignature } from './resource';

describe('lib/parse/state', () => {
  describe('makeResourceSignature', () => {
    test('should construct a valid resource signature', () => {
      const type = 'foo';
      const id = 'bar';
      const result1 = makeResourceSignature({ type, id });
      const result2 = makeResourceSignature({ type, id: undefined });

      expect(result1).toEqual('foo:bar');
      expect(result2).toEqual('foo');
    });
  });
});
