/**
 * @file program/[id]/stories.ts
 * Gather program stories data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { IPriApiResource } from 'pri-api-library/types';
import { fetchPriApiQuery } from '@lib/fetch/api';
import { basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, page = '1', range } = req.query;

  if (id) {
    const fcForPerson = (await fetchPriApiQuery(
      'field_collection--story_creators',
      {
        'filter[person]': id as string,
        sort: '-id',
        range: range || 15,
        page
      }
    )) as IPriApiResource[];

    if (fcForPerson) {
      const fcIds = _.uniq(fcForPerson.map(fc => fc.id as string));

      // Fetch list of stories. Paginated.
      const data = _.orderBy(
        (await Promise.all(
          fcIds.map(fcId =>
            fetchPriApiQuery('node--stories', {
              ...basicStoryParams,
              'filter[status]': 1,
              'filter[byline][value]': fcId,
              'filter[byline][operator]': '"CONTAINS"'
            }).then(resp => resp[0])
          )
        )) as IPriApiResource[],
        story => story.datePublished,
        'desc'
      );

      // Build response object.
      const apiResp = {
        fcIds,
        data
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
