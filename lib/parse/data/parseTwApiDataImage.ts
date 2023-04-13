import type { WP_REST_API_Attachment } from 'wp-types';
import type { IImage } from '@interfaces';


export function parseTwApiDataImage(data: WP_REST_API_Attachment) {
  const {
    id,
    type,
    media_type: mediaType,
    source_url: url,
    alt_text: alt,
    caption,
    media_details: mediaDetails
  } = data;
  const image = {
    id,
    type: `${type}:${mediaType}`,
    url,
    alt,
    caption: caption.rendered,
    metadata: {
      width: mediaDetails.width as number,
      height: mediaDetails.height as number
    }
  } as IImage;

  return image;
}
