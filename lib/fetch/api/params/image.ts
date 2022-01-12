/**
 * @file image.ts
 *
 * Query parameters needed to requests data for image.
 */

export const basicImageParams = {
  fields: ['alt', 'metadata', 'metatags', 'styles']
};

export const fullImageParams = {
  include: ['license'],
  fields: [
    'title',
    'url',
    'alt',
    'metadata',
    'metatags',
    'credit',
    'caption',
    'styles',
    'license.title'
  ]
};
