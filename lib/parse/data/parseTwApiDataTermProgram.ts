/**
 * @file parseTwApiDataTermProgram.ts
 * Parse The World Wordpress API program data into normalized model.
 */

import type { WP_REST_API_Term as WPRestApiTerm } from 'wp-types';
import type { IProgram } from '@interfaces';
import { parseTwApiDataTerm } from './parseTwApiDataTerm';

export type SponsorLink = {
  title: string;
  url: string;
};

export interface TwApiDataTermProgram extends WPRestApiTerm {
  acf?: {
    teaser: string;
    image_banner?: number;
    logo?: number;
    hosts?: number[];
    ['collection-sponsor_links']:
      | {
          sponsor_links: SponsorLink | '';
        }[]
      | false;
    featured_stories: number[];
  };
}

export function parseTwApiDataTermProgram(data: TwApiDataTermProgram) {
  const { acf } = data;
  const {
    teaser,
    image_banner: bannerImage,
    logo: podcastLogo,
    hosts,
    'collection-sponsor_links': sponsorLinks,
    featured_stories: featuredStories
  } = acf || {};
  const term = parseTwApiDataTerm(data);
  const sponsors: SponsorLink[] | undefined = sponsorLinks
    ? (sponsorLinks
        .map(({ sponsor_links: sl }) => sl)
        .filter((v) => !!v) as SponsorLink[])
    : undefined;
  const result = {
    ...structuredClone(term),
    ...(teaser && { teaser }),
    ...(bannerImage && { bannerImage }),
    ...(podcastLogo && { podcastLogo }),
    ...(hosts && { hosts }),
    ...(sponsors?.length && { sponsors }),
    ...(featuredStories && { featuredStories })
  } as IProgram;

  return result;
}
