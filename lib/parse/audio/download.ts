/**
 * @file lib/parse/audio/download.ts
 * Helper functions for downloading audio files.
 */

import { parse } from 'url';
import { IPriApiResource } from 'pri-api-library/types';

export const generateAudioDownloadFilename = (
  { url, program, metatags, metadata }: IPriApiResource,
  prefixOverride?: string
) => {
  const { canonical } = metatags || {};
  const { pathname } = parse(canonical || url);
  const parts = (pathname || '')
    .split('/')
    .filter((item) => !!item && !!item.length && item !== 'file');
  const prefix =
    prefixOverride ||
    (!!program && program.title.toLowerCase().replace(/\s+/, '-')) ||
    'tw';
  const format = (metadata && metadata.audio_url) || 'mp3';

  return `${[prefix, ...parts].join('--')}.${format}`;
};
