/**
 * Defines episode data interface and types.
 */

import type { IPost } from './post.interface';

export interface IEpisode extends IPost {
  dateBroadcast?: string;
  audio?: number;
  program: number[];
  spotifyPlaylist?: string[];
  hosts?: number[];
  producers?: number[];
  guests?: number[];
  reporters?: number[];
}
