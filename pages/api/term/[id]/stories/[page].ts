/**
 * @file term/[id]/stories.ts
 * Gather term stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import {
  IPriApiResourceResponse,
  IPriApiCollectionResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page = '1', range = 15, exclude } = req.query;
  const storyTermFields = [
    'opencalais_city',
    'opencalais_continent',
    'opencalais_country',
    'opencalais_province',
    'opencalais_region',
    'opencalais_person',
    'tags'
  ];

  if (id) {
    const term = (await fetchPriApiItem(
      'taxonomy_term--terms',
      id as string
    )) as IPriApiResourceResponse;

    if (term) {
      const { featuredStories } = term.data;
      const excluded = (exclude || featuredStories) && [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
        ...(featuredStories ? featuredStories.map(({ id: i }) => i) : [])
      ];

      // Fetch list of stories. Paginated.
      const { data, meta } = (await Promise.all(
        storyTermFields.map(field =>
          fetchPriApiQuery('node--stories', {
            ...basicStoryParams,
            'filter[status]': 1,
            [`filter[${field}]`]: id,
            ...(excluded && {
              'filter[id][value]': excluded,
              'filter[id][operator]': '<>'
            }),
            sort: '-date_published',
            range,
            page
          })
        )
      ).then(resp =>
        resp.reduce(
          (acc: IPriApiCollectionResponse, next: IPriApiCollectionResponse) =>
            next
              ? {
                  data: [...acc.data, ...next.data],
                  meta: {
                    count:
                      (acc.meta.count as number) + (next.meta.count as number)
                  }
                }
              : acc,
          { data: [], meta: {} }
        )
      )) as IPriApiCollectionResponse;

      // Build response object.
      const apiResp = {
        data: _.orderBy(data, story => story.data.datePublished, 'desc'),
        meta
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404).end();
    }
  }

  res.status(400).end();
};
