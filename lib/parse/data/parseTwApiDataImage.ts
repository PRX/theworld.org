import type { WP_REST_API_Attachment as WPRestApiAttachment } from 'wp-types';
import type { IImage } from '@interfaces';

export function parseTwApiDataImage(data: WPRestApiAttachment) {
  const {
    id,
    source_url: url,
    alt_text: alt,
    caption,
    media_details: mediaDetails
  } = data;
  const result = {
    id,
    type: 'media:image',
    url,
    alt,
    caption: caption.rendered,
    metadata: {
      width: mediaDetails.width as number,
      height: mediaDetails.height as number
    }
  } as IImage;

  return result;
}
