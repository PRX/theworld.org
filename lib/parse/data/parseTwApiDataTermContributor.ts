/**
 * @file parseTwApiDataTermContributor.ts
 * Parse The World Wordpress API contributor data into normalized model.
 */

import type { WP_REST_API_Term as WPRestApiTerm } from 'wp-types';
import type { IContributor } from '@interfaces';
import { parseTwApiDataTerm } from './parseTwApiDataTerm';

export interface TwApiDataTermContributor extends WPRestApiTerm {
  acf?: {
    program?: number[];
    position?: string;
    teaser: string;
    image?: number;
    featured_stories: number[];
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
  };
}

export function parseTwApiDataTermContributor(data: TwApiDataTermContributor) {
  const { acf } = data;
  const {
    program,
    position,
    teaser,
    image,
    featured_stories: featuredStories,
    facebook,
    twitter,
    instagram,
    tiktok,
    tumblr,
    podcast,
    blog,
    website,
    email,
    rss
  } = acf || {};
  const term = parseTwApiDataTerm(data);
  const result = {
    ...structuredClone(term),
    ...(program && { program }),
    ...(!!position && { position }),
    ...(!!teaser && { teaser }),
    ...(image && { image }),
    ...(!!featuredStories && { featuredStories }),
    ...(!!facebook && { facebook }),
    ...(!!twitter && { twitter }),
    ...(!!instagram && { instagram }),
    ...(!!tiktok && { tiktok }),
    ...(!!tumblr && { tumblr }),
    ...(!!podcast && { podcast }),
    ...(!!blog && { blog }),
    ...(!!website && { website }),
    ...(!!email && { email }),
    ...(!!rss && { rss })
  } as IContributor;

  return result;
}
