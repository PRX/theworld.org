/**
 * @file generateAudioUrl.ts
 *
 * Generate audio URL from passed URL. Append `_from` param when not
 * already included.
 */

export const generateAudioUrl = (audioUrl: string) => {
  const audioUrlWithProtocol = /^\/\//.test(audioUrl)
    ? `https:${audioUrl}`
    : audioUrl;
  const url = new URL(audioUrlWithProtocol);

  if (!url.searchParams.get('_from')) {
    url.searchParams.set('_from', 'theworld.org');
  }

  return url.toString();
};
