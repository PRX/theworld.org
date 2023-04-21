import type { WP_REST_API_Post as WPRestApiPost } from 'wp-types';
import type { IEpisode } from '@interfaces';
import { parseTwApiDataPost } from './parseTwApiDataPost';

export interface TwApiDataPostEpisode extends WPRestApiPost {
  program: number[];
  acf?: {
    broadcast_date?: number;
    audio?: number;
    spotify_playlists?: { spotify_playlist: string }[];
    hosts?: number[];
    producers?: number[];
    reporter?: number[];
    guests?: number[];
  };
}

export default function parseTwApiDataPostEpisode(data: TwApiDataPostEpisode) {
  const { acf, program } = data;
  const { broadcast_date: dateBroadcast, audio } = acf ?? {};
  const post = parseTwApiDataPost(data);
  const result = {
    ...structuredClone(post),
    ...(dateBroadcast && { dateBroadcast }),
    ...(audio && { audio }),
    ...(program && { program })
  } as IEpisode;

  return result;
}
