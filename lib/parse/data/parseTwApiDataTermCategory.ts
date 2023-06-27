/**
 * @file parseTwApiDataTermCategory.ts
 * Parse The World Wordpress API category data into normalized model.
 */

import type { WP_REST_API_Category as WPRestApiCategory } from 'wp-types';
import type { ICategory } from '@interfaces';
import { parseTwApiDataTerm } from './parseTwApiDataTerm';

export interface TwApiDataTermCategory extends WPRestApiCategory {
  acf?: {
    teaser: string;
  };
}

export function parseTwApiDataTermCategory(data: TwApiDataTermCategory) {
  const { acf } = data;
  const { teaser } = acf || {};
  const term = parseTwApiDataTerm(data);
  const result = {
    ...structuredClone(term),
    ...(teaser && { teaser })
  } as ICategory;

  return result;
}
