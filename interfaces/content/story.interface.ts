/**
 * Defines story data interface and types.
 */

import type { IAudio } from './audio.interface';
import type { IContributor } from './contributor.interface';
import type { IPost } from './post.interface';
import type { IProgram } from './program.interface';
import type { ITerm } from './term.interface';

export interface IStory extends IPost {
  displayTemplate: string;
  dateBroadcast?: string;
  audio?: number | IAudio;
  contributors: number[] | IContributor[];
  program: number[] | IProgram[];
  city: number[] | ITerm[];
  provinceOrState: number[] | ITerm[];
  country: number[] | ITerm[];
  region: number[] | ITerm[];
  continent: number[] | ITerm[];
  person: number[] | ITerm[];
  socialTags: number[] | ITerm[];
  resourceDevelopment: number[] | ITerm[];
  storyFormat: number[] | ITerm[];
}
