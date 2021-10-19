/**
 * @file team.ts
 * Gather team data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiCollectionResponse } from 'pri-api-library/types';
import { fetchPriApiQuery } from '@lib/fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Persons assigned to The World program
  const teamMembers = (await fetchPriApiQuery('node--people', {
    include: ['image'],
    'filter[status]': 1,
    'filter[department][value]': 'the_world',
    'filter[department][operator]': '"CONTAINS"',
    sort: 'title',
    range: 100
  })) as IPriApiCollectionResponse;

  const apiResp = {
    teamMembers
  };

  return res.status(200).json(apiResp);
};
