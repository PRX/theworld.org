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
  yoast_head?: string;
  yoast_head_json?: { [k: string]: any };
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
    yoast_head: yoastHead,
    yoast_head_json: yoastHeadJson,
    _embedded: embedded
  } = data;
  const { 'wp:featuredmedia': embeddedFeaturedMedia } = embedded ?? {};
  const result = {
    ...(id && { id }),
    ...(postType && {
      type: `post--${postType === 'post' ? 'story' : postType}`
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
    ...(yoastHead && { metatagsHtml: yoastHead }),
    ...(yoastHeadJson && { metatags: { ...yoastHeadJson, canonical: link } }),
    // Flatten rich content props.
    ...(title && { title: title.rendered }),
    ...(excerpt && { subhead: excerpt.rendered }),
    ...(content && { body: content.rendered })
  } as IPost;

  console.log(result);

  return result;
}
