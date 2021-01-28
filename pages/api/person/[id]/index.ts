/**
 * @file program/[id]/index.ts
 * Gather program data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import {
  fetchApiPersonStories,
  fetchPriApiItem,
  fetchApiPersonAudio
} from '@lib/fetch/api';
import { IPriApiResource } from 'pri-api-library/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const params = {
      include: ['program', 'image', 'social_links']
    };
    const person = (await fetchPriApiItem(
      'node--people',
      id as string,
      params
    )) as IPriApiResource;

    if (person) {
      // Fetch first page of stories.
      const { data: stories } = await fetchApiPersonStories(
        id as string,
        1,
        undefined,
        req
      );

      // Latest audio segments.
      const { data: segments } = await fetchApiPersonAudio(
        id as string,
        'program-segment',
        1,
        10,
        req
      );

      // Build response object.
      const apiResp = {
        ...person,
        stories,
        segments
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404).end();
    }
  }

  res.status(400).end();
};
