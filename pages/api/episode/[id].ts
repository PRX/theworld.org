/**
 * @file episode/[id].ts
 * Gather episode data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { fetchPriApiItem } from '@lib/fetch/api';
import { fullEpisodeParams, basicStoryParams } from '@lib/fetch/api/params';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (id) {
    const episode = (await fetchPriApiItem('node--episodes', id as string, {
      ...fullEpisodeParams
    })) as IPriApiResourceResponse;

    if (episode) {
      const { audio } = episode.data;
      const { segments } = audio || {};
      let stories: IPriApiResource[];

      if (segments && segments.length) {
        stories = (await Promise.all(
          segments
            .filter((item: IPriApiResource) => !!item.usage.story)
            .map((item: IPriApiResource) => item.usage.story[0])
            .map((item: IPriApiResource) =>
              fetchPriApiItem('node--stories', item.id, basicStoryParams).then(
                (resp: IPriApiResourceResponse) => resp.data
              )
            )
        )) as IPriApiResource[];
      }

      const apiResp = {
        ...episode.data,
        ...(stories &&
          !!stories.length && {
            stories: {
              data: stories,
              meta: {
                count: stories.length
              }
            }
          })
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404).end();
    }

    return;
  }

  res.status(400).end();
};
