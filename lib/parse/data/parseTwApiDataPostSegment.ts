import type { WP_REST_API_Post as WPRestApiPost } from 'wp-types';
import type { ISegment } from '@interfaces';
import { parseTwApiDataPost } from './parseTwApiDataPost';

export interface TwApiDataPostSegment extends WPRestApiPost {
  contributor: number[];
  program: number[];
  acf?: {
    broadcast_date?: number;
    audio?: number;
    transcript?: string;
  };
}

export default function parseTwApiDataPostSegment(data: TwApiDataPostSegment) {
  const { acf, contributor, program } = data;
  const { broadcast_date: dateBroadcast, audio, transcript } = acf ?? {};
  const post = parseTwApiDataPost(data);
  const result = {
    ...structuredClone(post),
    ...(dateBroadcast && { dateBroadcast }),
    ...(audio && { audio }),
    ...(contributor && { contributor }),
    ...(program && { program }),
    ...(transcript && { transcript })
  } as ISegment;

  return result;
}
