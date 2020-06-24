/**
 * @file [id].ts
 * Gather story data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { IPriApiResource } from 'pri-api-library/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const story = (await fetchPriApiItem('node--stories', id as string, {
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
    })) as IPriApiResource;

    if (story) {
      const { type, primaryCategory } = story;
      const related =
        primaryCategory &&
        ((await fetchPriApiQuery('node--stories', {
          'filter[primary_category]': primaryCategory.id,
          'filter[status]': 1,
          range: 4,
          sort: '-date_published',
          include: ['image'],
          fields: ['image', 'metatags', 'title']
        })) as IPriApiResource[]);
      const apiResp = {
        type,
        story,
        ...(related && { related })
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
