/**
 * @file parseTwApiDataPost.ts
 * Parse The World Wordpress API post data into normalized model.
 */

import type { WP_REST_API_Attachment, WP_REST_API_Post, WP_REST_API_Term } from 'wp-types';
import { parseTwApiDataImage } from './parseTwApiDataImage';
import { parseTwApiDataTaxonomy } from './parseTwApiDataTaxonomy';

export function parseTwApiDataPost(data: WP_REST_API_Post) {
  const {
    id,
    type: postType,
    date,
    link,
    guid,
    title,
    content,
    excerpt,
    yeost_head,
    yeost_head_json,
    featured_media: featuredMedia,
    _embedded: embedded
  } = data;
  let result = {
    ...(id && { id }),
    ...(postType && {type: `post:${postType === 'post' ? 'story' : postType}`}),
    ...(date && {datePublished: date}),
    ...(link && {link}),
    ...((yeost_head || undefined) && { metatagsHtml: yeost_head }),
    // Flatten rich content props.
    ...(guid && { guid: guid.rendered }),
    ...(title && { title: title.rendered }),
    ...(content && { body: content.rendered }),
    ...(excerpt && { subhead: excerpt.rendered }),
    // Move embedded data to data prop.
    ...(embedded?.['wp:featuredmedia'] && {
      image: parseTwApiDataImage(embedded['wp:featuredmedia'][0] as WP_REST_API_Attachment)
    }),
    ...((embedded?.['wp:term'] as WP_REST_API_Term[][])?.reduce(
      (a, terms) => ({
        ...terms.reduce(
          (ac, term) => ({
            ...ac,
            [term.taxonomy]: [
              ...ac[term.taxonomy],
              parseTwApiDataTaxonomy(term)
            ]
          }),
          a
        )
      }),
      {} as { [k: string]: any }
    ) || {})
  };

  return result;
}


