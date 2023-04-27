/**
 * Define program data interfaces and types.
 */

import type { TwApiCollectionMeta } from '@lib/fetch/api/fetchTwApi';
import type { IContributor } from './contributor.interface';
import type { IImage } from './image.interface';
import type { IStory } from './story.interface';
import type { ITerm } from './term.interface';
import type { IEpisode } from './episode.interface';

export interface IProgram extends ITerm {
  teaser: string;
  bannerImage?: number | IImage;
  podcastLogo?: string;
  hosts?: number[] | IContributor[];
  sponsors?: {
    title: string;
    url: string;
  }[];
  featuredStory?: number | IStory;
  featuredStories?: number[] | IStory[];
  episodes?: number[] | { meta: TwApiCollectionMeta; data: IEpisode[] }[];
  stories?: number[] | { meta: TwApiCollectionMeta; data: IStory[] }[];
}
