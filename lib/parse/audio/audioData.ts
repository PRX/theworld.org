/**
 * @file parse/audio/audioData.ts
 *
 * Parse API audio data to player audio data.
 */

import { IAudioData } from '@components/Player/types';
import { IAudioResource } from '@interfaces';
import { generateAudioUrl } from '@lib/generate/string';

export const parseAudioData = (
  data: IAudioResource,
  fallbackProps?: Partial<IAudioData>
): IAudioData => {
  const {
    guid,
    type,
    id,
    metatags,
    url,
    audioTitle,
    audioAuthor,
    metadata,
    program,
    broadcastDate: audioBroadcastDate
  } = data;
  const { canonical } = metatags || {};
  const { duration } = metadata || {};
  const {
    imageUrl,
    title: fallbackTitle,
    linkResource,
    queuedFrom
  } = fallbackProps || {};
  const broadcastDate =
    audioBroadcastDate ||
    linkResource?.broadcastDate ||
    linkResource?.dateBroadcast ||
    linkResource?.datePublished;
  const dataString =
    broadcastDate &&
    ((d) => {
      const timeStamp = parseInt(d, 10) * 1000;
      const date = new Date(timeStamp);
      return date.toLocaleDateString(undefined, { dateStyle: 'medium' });
    })(broadcastDate);
  const info = [
    ...(program ? [program.title] : [metatags?.['og:site_name']]),
    ...(audioAuthor ? audioAuthor.map(({ title }) => title) : []),
    ...(dataString ? [dataString] : [])
  ];

  return {
    guid: guid || `${type}:${id}`,
    url: generateAudioUrl(url),
    title: audioTitle || fallbackTitle || metatags?.['og:title'],
    queuedFrom,
    link: canonical,
    ...(program?.metatags?.['og:image'] && {
      imageUrl: program.metatags['og:image']
    }),
    ...(metatags?.['og:image'] && { imageUrl: metatags?.['og:image'] }),
    ...(imageUrl && { imageUrl }),
    ...(duration && { duration }),
    ...(info.length ? { info } : {}),
    ...(linkResource && { linkResource })
  };
};
