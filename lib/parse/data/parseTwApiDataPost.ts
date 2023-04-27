/**
 * @file parseTwApiDataPost.ts
 * Parse The World Wordpress API post data into normalized model.
 */

import type {
  WP_REST_API_Attachment as WPRestApiAttachment,
  WP_REST_API_Post as WPRestApiPost
} from 'wp-types';
import type { IPost } from '@interfaces';
import { parseTwApiDataImage } from './parseTwApiDataImage';

export interface TwApiPost extends WPRestApiPost {
  yeost_head?: string;
  yeost_head_json?: { [k: string]: any };
}

export function parseTwApiDataPost(data: TwApiPost) {
  const {
    id,
    type: postType,
    date,
    link,
    title,
    content,
    excerpt,
    featured_media: image,
    categories,
    tags,
    yeost_head: yeostHead,
    yeost_head_json: yeostHeadJson,
    _embedded: embedded
  } = data;
  const { 'wp:featuredmedia': embeddedFeaturedMedia } = embedded ?? {};
  const result = {
    ...(id && { id }),
    ...(postType && {
      type: `post:${postType === 'post' ? 'story' : postType}`
    }),
    ...(date && { datePublished: date }),
    ...(link && { link }),
    ...(image && { image }),
    ...(embeddedFeaturedMedia && {
      image: parseTwApiDataImage(
        embeddedFeaturedMedia[0] as WPRestApiAttachment
      )
    }),
    ...(categories && { categories }),
    ...(tags && { tags }),
    ...(yeostHead && { metatagsHtml: yeostHead }),
    ...(yeostHeadJson && { metatags: yeostHeadJson }),
    // Flatten rich content props.
    ...(title && { title: title.rendered }),
    ...(excerpt && { subhead: excerpt.rendered }),
    ...(content && { body: content.rendered })
  } as IPost;

  return result;
}
