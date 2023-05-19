/**
 * @file parseTwApiDataTerm.ts
 * Parse The World Wordpress API term data into normalized model.
 */

import type { WP_REST_API_Term as WPRestApiTerm } from 'wp-types';
import type { ITerm } from '@interfaces';

export interface TwApiTerm extends WPRestApiTerm {
  yeost_head?: string;
  yeost_head_json?: { [k: string]: any };
}

export function parseTwApiDataTerm(data: TwApiTerm) {
  const {
    id,
    taxonomy,
    link,
    name: title,
    description: body,
    yeost_head: yeostHead,
    yeost_head_json: yeostHeadJson
  } = data;
  const result = {
    ...(id && { id }),
    ...(taxonomy && {
      type: `term--${taxonomy}`
    }),
    ...(link && { link }),
    ...(title && { title }),
    ...(body && { body }),
    ...(yeostHead && { metatagsHtml: yeostHead }),
    ...(yeostHeadJson && { metatags: yeostHeadJson })
  } as ITerm;

  return result;
}
