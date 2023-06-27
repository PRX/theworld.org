/**
 * Define contributor data interfaces and types.
 */

import { ITerm } from './term.interface';

export interface IContributor extends ITerm {
  program?: number[];
  position?: string;
  teaser?: string;
  image?: number;
  featuredStories?: number[];
  facebook?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  tumblr?: string;
  podcast?: string;
  blog?: string;
  website?: string;
  email?: string;
  rss?: string;
}
