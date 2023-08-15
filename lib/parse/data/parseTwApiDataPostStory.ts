import type { WP_REST_API_Post as WPRestApiPost } from 'wp-types';
import type { IStory } from '@interfaces/content/story.interface';
import { parseTwApiDataPost } from './parseTwApiDataPost';

export interface TwApiDataPostStory extends WPRestApiPost {
  contributor: number[];
  program: number[];
  resource_development: number[];
  story_format: number[];
  city: number[];
  continent: number[];
  country: number[];
  province_or_state: number[];
  region: number[];
  person: number[];
  social_tags: number[];
  acf?: {
    broadcast_date?: number;
    format?: string;
    audio?: number;
  };
}

export function parseTwApiDataPostStory(data: TwApiDataPostStory) {
  const {
    acf,
    contributor,
    program,
    city,
    continent,
    country,
    person,
    province_or_state: provinceOrState,
    region,
    social_tags: socialTags,
    resource_development: resourceDevelopment,
    story_format: storyFormat
  } = data;
  const {
    broadcast_date: dateBroadcast,
    format: displayTemplate,
    audio
  } = acf ?? {};
  const post = parseTwApiDataPost(data);
  const result = {
    ...post,
    displayTemplate,
    ...(dateBroadcast && { dateBroadcast }),
    ...(audio && { audio }),
    ...(contributor && { contributor }),
    ...(program && { program }),
    ...(city && { city }),
    ...(continent && { continent }),
    ...(country && { country }),
    ...(person && { person }),
    ...(provinceOrState && { provinceOrState }),
    ...(region && { region }),
    ...(socialTags && { socialTags }),
    ...(resourceDevelopment && { resourceDevelopment }),
    ...(storyFormat && { storyFormat })
  } as IStory;

  return result;
}

export default parseTwApiDataPostStory;