/**
 * Defines segment data interface and types.
 */

import { Segment } from '@interfaces/api';
import type { IPost } from './post.interface';

export interface ISegment extends IPost {
  dateBroadcast?: string;
  audio?: number;
  program?: number[];
  contributors?: number[];
  transcript?: string;
}

export type PostSegment = Segment & {
  // Add props that were aliased in the query.
};
