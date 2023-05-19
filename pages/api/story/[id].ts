/**
 * @file story/[id].ts
 * Gather story data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiItem } from '@lib/fetch/api';
import { fullStoryParams } from '@lib/fetch/api/params';
import fetchTwApiStory from '@lib/fetch/story/fetchTwApiStory';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    // const story = (await fetchPriApiItem('node--stories', id as string, {
    //   ...fullStoryParams
    // })) as IPriApiResourceResponse;

    const story = await fetchTwApiStory(parseInt(id as string, 10));

    if (story) {
      res.setHeader(
        'Cache-Control',
        process.env.TW_API_RESOURCE_CACHE_CONTROL ||
          'public, s-maxage=600, stale-while-revalidate'
      );

      return res.status(200).json(story);
    }

    return res.status(404).end();
  }

  return res.status(400).end();
};
