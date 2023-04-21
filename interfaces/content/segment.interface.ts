/**
 * Defines segment data interface and types.
 */

import type { IPost } from './post.interface';

export interface ISegment extends IPost {
  dateBroadcast?: string;
  audio?: number;
  program?: number[];
  contributors?: number[];
  transcript?: string;
}
