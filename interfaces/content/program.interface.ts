/**
 * Define program data interfaces and types.
 */

import { ITerm } from './term.interface';

export interface IProgram extends ITerm {
  teaser: string;
  bannerImage?: number;
  podcastLogo?: string;
  hosts?: number[];
  sponsors?: {
    title: string;
    url: string;
  }[];
}
