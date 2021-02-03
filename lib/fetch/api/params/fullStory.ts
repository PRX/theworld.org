/**
 * @file fulStory.ts
 *
 * Query parameters needed to requests data for full story.
 */

export const basicStoryParams = {
  include: [
    'audio.program',
    'byline.credit_type',
    'byline.person',
    'format',
    'image',
    'primary_category',
    'program',
    'video'
  ]
};

export const fullStoryParams = {
  include: [
    'audio.program',
    'byline.credit_type',
    'byline.person',
    'format',
    'image',
    'program',
    'video',
    'categories',
    'primary_category',
    'opencalais_city',
    'opencalais_continent',
    'opencalais_country',
    'opencalais_province',
    'opencalais_region',
    'opencalais_person',
    'tags',
    'verticals'
  ]
};
