/**
 * @file parse/audio/audioData.ts
 *
 * Parse API audio data to player audio data.
 */

import { IAudioData } from '@components/Player/types';
import { IAudioResource } from '@interfaces';

export const parseAudioData = (
  data: IAudioResource,
  overrideProps?: Partial<IAudioData>
): IAudioData => {
  const {
    type,
    id,
    metatags: { canonical },
    url,
    audioTitle,
    metadata: { duration }
  } = data;

  return {
    guid: `${type}:${id}`,
    link: canonical,
    url,
    title: audioTitle,
    duration,
    ...overrideProps
  };
};
