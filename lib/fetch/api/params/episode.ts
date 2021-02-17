/**
 * @file episode.ts
 *
 * Query parameters needed to requests data for an episode.
 */

export const basicEpisodeParams = {
  include: [
    'audio.segments',
    'image',
    'program',
    'hosts',
    'guests',
    'producers',
    'reporters'
  ],
  fields: [
    'title',
    'metatags',
    'date_published',
    'date_broadcasted',
    'teaser',
    'body',
    'image',
    'audio',
    'embedded_player_url',
    'popout_player_url',
    'program.title',
    'program.metatags',
    'host.title',
    'host.image',
    'host.metatags',
    'guests.title',
    'guests.image',
    'guests.metatags',
    'producers.title',
    'producers.image',
    'producers.metatags',
    'repoters.title',
    'repoters.image',
    'repoters.metatags'
  ]
};

export const fullEpisodeParams = {
  include: [
    'audio.segments',
    'image',
    'program',
    'hosts',
    'guests',
    'producers',
    'reporters',
    'stories',
    'music_heard' // Need to add to API (Drupal)
  ],
  fields: [
    'title',
    'metatags',
    'date_published',
    'date_broadcasted',
    'teaser',
    'body',
    'image',
    'audio',
    'embedded_player_url',
    'popout_player_url',
    'program.title',
    'program.metatags',
    'host.title',
    'host.image',
    'host.metatags',
    'guests.title',
    'guests.image',
    'guests.metatags',
    'producers.title',
    'producers.image',
    'producers.metatags',
    'repoters.title',
    'repoters.image',
    'repoters.metatags',
    'stories.title',
    'stories.metatags',
    'stories.image',
    'stories.primary_category.title',
    'stories.primary_category.metatags',
    'music_heard' // Need to add to API (Drupal)
  ]
};
