/**
 * @file fulStory.ts
 *
 * Query parameters needed to requests data for full story.
 */

export const fullStoryParams = {
  include: [
    'audio.program',
    'byline.credit_type',
    'byline.person',
    'format',
    'image',
    'categories',
    'opencalais_city',
    'opencalais_continent',
    'opencalais_country',
    'opencalais_province',
    'opencalais_region',
    'opencalais_person',
    'primary_category',
    'program',
    'tags',
    'verticals',
    'video'
  ]
};
