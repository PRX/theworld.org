/**
 * @file episode.ts
 *
 * Query parameters needed to requests data for an episode.
 */

import { basicAudioParams } from './audio';

export const basicEpisodeParams = {
  include: [
    ...basicAudioParams.include.map(p => `audio.${p}`),
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
    'image.title',
    'image.url',
    'image.metadata',
    'image.credit',
    'image.caption',
    'image.alt',
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
    ...basicAudioParams.include.map(p => `audio.${p}`),
    'image',
    'program',
    'hosts.image.license',
    'guests.image.license',
    'producers.image.license',
    'reporters.image.license'
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
    'hosts.title',
    'hosts.image',
    'hosts.metatags',
    'guests.title',
    'guests.image',
    'guests.metatags',
    'producers.title',
    'producers.image',
    'producers.metatags',
    'reporters.title',
    'reporters.image',
    'reporters.metatags',
    'stories.title',
    'stories.metatags',
    'stories.image',
    'stories.primary_category.title',
    'stories.primary_category.metatags',
    'spotify_playlist',
    'share_links'
  ]
};
