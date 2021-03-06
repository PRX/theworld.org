/**
 * @file story.ts
 *
 * Query parameters needed to requests data for a story.
 */

export const basicStoryParams = {
  include: [
    'audio',
    'image',
    'primary_category',
    'program',
    'byline.credit_type',
    'byline.person',
    'crossLinks'
  ],
  fields: [
    'title',
    'metatags',
    'date_published',
    'date_updated',
    'date_broadcasted',
    'teaser',
    'body',
    'image.title',
    'image.url',
    'image.metadata',
    'image.credit',
    'image.caption',
    'image.alt',
    'image.styles',
    'display_template',
    'audio.url',
    'audio.metatags',
    'embedded_player_url',
    'popout_player_url',
    'primary_category.title',
    'primary_category.metatags',
    'program.title',
    'program.metatags',
    'byline.credit_type.title',
    'byline.person.title',
    'byline.person.metatags',
    'crossLinks.title',
    'crossLinks.metatags'
  ]
};

export const fullStoryParams = {
  include: [
    'audio',
    'image',
    'primary_category',
    'program',
    'byline.credit_type',
    'byline.person',
    'categories',
    'opencalais_city',
    'opencalais_continent',
    'opencalais_country',
    'opencalais_province',
    'opencalais_region',
    'opencalais_person',
    'tags',
    'video'
  ],
  fields: [
    'title',
    'metatags',
    'date_published',
    'date_updated',
    'date_broadcasted',
    'teaser',
    'body',
    'share_links',
    'image.title',
    'image.url',
    'image.metadata',
    'image.credit',
    'image.caption',
    'image.alt',
    'image.styles',
    'display_template',
    'audio.url',
    'audio.metatags',
    'embedded_player_url',
    'popout_player_url',
    'primary_category.title',
    'primary_category.metatags',
    'program.title',
    'program.metatags',
    'byline.credit_type.title',
    'byline.person.title',
    'byline.person.metatags',
    'categories.title',
    'categories.metatags',
    'opencalais_city.title',
    'opencalais_city.metatags',
    'opencalais_continent.title',
    'opencalais_continent.metatags',
    'opencalais_country.title',
    'opencalais_country.metatags',
    'opencalais_province.title',
    'opencalais_province.metatags',
    'opencalais_region.title',
    'opencalais_region.metatags',
    'opencalais_person.title',
    'opencalais_person.metatags',
    'tags.title',
    'tags.metatags',
    'video'
  ]
};
