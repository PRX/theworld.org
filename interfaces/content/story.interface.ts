/**
 * Defines story data interface and types.
 */

import type { Maybe, Post, PostToCategoryConnection } from '@interfaces/api';

export type PostStory = Post & {
  primaryCategory?: Maybe<PostToCategoryConnection>;
};
