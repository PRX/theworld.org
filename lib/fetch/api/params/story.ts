/**
 * @file fulStory.ts
 *
 * Query parameters needed to requests data for full story.
 */

export const basicStoryParams = {
  include: ['format', 'image', 'primary_category']
};

export const fullStoryParams = {
  include: [
    ...basicStoryParams.include,
    'audio.program',
    'byline.credit_type',
    'byline.person',
    'program',
    'categories',
    'opencalais_city',
    'opencalais_continent',
    'opencalais_country',
    'opencalais_province',
    'opencalais_region',
    'opencalais_person',
    'tags',
    'verticals',
    'video'
  ]
};
