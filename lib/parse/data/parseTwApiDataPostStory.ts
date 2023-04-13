import type { WP_REST_API_Post } from 'wp-types';
import { parseTwApiDataPost } from './parseTwApiDataPost';

export interface TwApiDataPostStory extends WP_REST_API_Post {
  /**
   *  Added by Advanced Custom Fields [WP REST API Integration](https://www.advancedcustomfields.com/resources/wp-rest-api-integration/).
   */
  acf?: {
    /**
     * Date story was broadcast, if applicable.
     */
    broadcast_date?: number;

    /**
     * What type of layout to render story page with.
     */
    format?: string;

    /**
     * Audio media associated with the content.
     */
    audio?: string | { id: string; };
  };
}

export default function parseTwApiDataPostStory(data: TwApiDataPostStory) {
  const { acf } = data;
  const { broadcast_date: dateBroadcast, format: displayTemplate, audio } =
    acf ?? {};
  const post = parseTwApiDataPost(data);
  const story = {
    ...structuredClone(post),
    dateBroadcast,
    displayTemplate,
    ...(audio && { audio: typeof audio === 'string' ? audio : audio.id })
  };

  return story;
}
