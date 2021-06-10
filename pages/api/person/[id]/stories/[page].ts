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
          'filter[person]': id as string,
          sort: '-id',
          range: range || 15,
          page
        }
      )) as IPriApiCollectionResponse;
      const { data: fcData, ...other } = fcForPerson;
      const fcIds = _uniq(fcData.map(fc => fc.id as string));

      // Fetch list of stories. Paginated.
      const data = _orderBy(
        (await Promise.all(
          fcIds.map(fcId =>
            fetchPriApiQuery('node--stories', {
              ...basicStoryParams,
              'filter[status]': 1,
              'filter[byline][value]': fcId,
              'filter[byline][operator]': '"CONTAINS"',
              ...(excluded && {
                'filter[id][value]': excluded,
                'filter[id][operator]': '<>'
              })
            }).then((resp: IPriApiCollectionResponse) => resp.data[0])
          )
        )) as IPriApiResource[],
        story => story.datePublished,
        'desc'
      );

      // Build response object.
      const apiResp = {
        data,
        ...other
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
