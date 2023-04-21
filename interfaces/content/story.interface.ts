/**
 * Defines story data interface and types.
 */

import type { IPost } from './post.interface';

export interface IStory extends IPost {
  displayTemplate: string;
  dateBroadcast?: string;
  audio?: number;
  contributors: number[];
  program: number[];
  city: number[];
  provinceOrState: number[];
  country: number[];
  region: number[];
  continent: number[];
  person: number[];
  socialTags: number[];
  resourceDevelopment: number[];
  storyFormat: number[];
}
