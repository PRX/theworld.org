import { formatDuration } from './duration';

describe('lib/parse/time', () => {
  describe('formatDuration', () => {
    test('should construct a valid duration string', () => {
      const minute = 60;
      const hour = minute * 60;
      const result1 = formatDuration(minute * 5 + 5);
      const result2 = formatDuration(minute * 23 + 45);
      const result3 = formatDuration(hour * 8 + minute * 5 + 45);
      const result4 = formatDuration(hour * 8 + minute * 23 + 45);
      const result5 = formatDuration(hour * 11 + minute * 23 + 45);
      const result6 = formatDuration(5);
      const result7 = formatDuration(35);

      expect(result1).toEqual('5:05');
      expect(result2).toEqual('23:45');
      expect(result3).toEqual('8:05:45');
      expect(result4).toEqual('8:23:45');
      expect(result5).toEqual('11:23:45');
      expect(result6).toEqual('00:05');
      expect(result7).toEqual('00:35');
    });
  });
});
