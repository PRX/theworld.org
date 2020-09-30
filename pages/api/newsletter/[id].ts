/**
 * @file [id].ts
 * Gather story data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiItem, postJsonPriApiCtaRegion } from '@lib/fetch/api';
import { IPriApiResource } from 'pri-api-library/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const getContext = (data: IPriApiResource): string[] => [`node:${data.id}`];

  if (id) {
    const data = (await fetchPriApiItem(
      'node--newsletter_sign_ups',
      id as string,
      {
        include: ['image']
      }
    )) as IPriApiResource;

    if (data) {
      const { type } = data;

      // Fetch CTA Messages.
      const context = getContext(data);
      const { subqueues: ctaRegions } = (await postJsonPriApiCtaRegion(
        'tw_cta_regions_content',
        {
          context
        }
      )) as IPriApiResource;

      // Build response object.
      const apiResp = {
        type,
        context,
        ctaRegions,
        data
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
