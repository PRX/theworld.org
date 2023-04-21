import type { WP_REST_API_Attachment as WPRestApiAttachment } from 'wp-types';
import type { IAudio } from '@interfaces';

export interface TwApiDataAudio extends WPRestApiAttachment {
  contributor: number[];
  acf?: {
    audio_title?: string;
    program?: number;
    broadcast_date?: number;
    segments?: number[];
  };
}

export function parseTwApiDataAudio(data: TwApiDataAudio) {
  const { id, title, source_url: url, contributor, acf } = data;
  const {
    audio_title: audioTitle,
    broadcast_date: dateBroadcast,
    program
  } = acf ?? {};
  const result = {
    id,
    type: 'media:audio',
    title: title.rendered,
    url,
    audioAuthor: contributor,
    ...(dateBroadcast && { dateBroadcast }),
    ...(audioTitle && { audioTitle }),
    ...(program && { program })
  } as IAudio;

  return result;
}
