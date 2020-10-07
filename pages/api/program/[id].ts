/**
 * @file [id].ts
 * Gather program data from CMS API.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPriApiItem, postJsonPriApiCtaRegion } from '@lib/fetch/api';
import { IPriApiResource } from 'pri-api-library/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const getContext = (program: IPriApiResource): string[] => [
    `node:${program.id}`
  ];

  if (id) {
    const program = (await fetchPriApiItem('node--programs', id as string, {
      include: ['featured_stories.image']
    })) as IPriApiResource;

    if (program) {
      const { type } = program;

      // Fetch CTA Messages.
      const context = getContext(program);
      const { subqueues: ctaRegions } = (await postJsonPriApiCtaRegion(
        'tw_cta_regions_landing',
        {
          context
        }
      )) as IPriApiResource;

      // Build response object.
      const apiResp = {
        type,
        context,
        ctaRegions,
        data: program
      };

      res.status(200).json(apiResp);
    } else {
      res.status(404);
    }
  }

  res.status(400);
};
