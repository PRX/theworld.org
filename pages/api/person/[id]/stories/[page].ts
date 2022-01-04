/**
 * @file program/[id]/stories.ts
 * Gather program stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import _uniq from 'lodash/uniq';
import _orderBy from 'lodash/orderBy';
import {
  IPriApiResource,
  IPriApiCollectionResponse,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiItem, fetchPriApiQuery } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page = '1', range, exclude } = req.query;

  if (id) {
    const person = (await fetchPriApiItem(
      'node--people',
      id as string
    )) as IPriApiResourceResponse;

    if (person) {
      const { featuredStories } = person.data;
      const excluded = (exclude || featuredStories) && [
        ...(exclude && Array.isArray(exclude) ? exclude : [exclude]),
        ...(featuredStories && featuredStories.map(({ id: i }) => i))
      ];
      const fcForPerson = (await fetchPriApiQuery(
        'field_collection--story_creators',
        {
          'filter[person][value]': id as string,
          'filter[person][operator]': '"CONTAINS"',
          sort: '-id',
          range: range || 15,
          page
        }
      )) as IPriApiCollectionResponse;
      const { data: fcData, ...other } = fcForPerson;
      const fcIds = _uniq(fcData.map(fc => fc.id as string));

      // Fetch list of stories. Paginated.
      const stories = (await Promise.all(
        fcIds.map(fcId =>
          fetchPriApiQuery('node--stories', {
            ...basicStoryParams,
            'filter[status]': 1,
            'filter[byline][value]': fcId,
            'filter[byline][operator]': '"CONTAINS"',
            ...(excluded && {
              ...excluded,
              'filter[id][operator]': 'NOT IN'
            }),
            sort: '-id'
          }).then((resp: IPriApiCollectionResponse) => resp.data[0])
        )
      )) as IPriApiResource[];

      const data = _orderBy(stories, story => story.datePublished, 'desc');

      // Build response object.
      const apiResp = {
        data,
        ...other
      };

      res.setHeader(
        'Cache-Control',
        process.env.TW_API_COLLECTION_CACHE_CONTROL ||
          'public, s-maxage=300, stale-while-revalidate'
      );

      return res.status(200).json(apiResp);
    }

    return res.status(404);
  }

  return res.status(400);
};
