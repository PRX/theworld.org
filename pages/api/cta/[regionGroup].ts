/**
 * @file cta/[regionGroup].ts
 * Gather CTA messages for a region group.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { postJsonPriApiCtaRegion } from '@lib/fetch/api';
import { IPriApiResource } from 'pri-api-library/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { regionGroup } = req.query;
    const { context = [] } = req.body;

    if (regionGroup) {
      // Fetch CTA Messages.
      const regionGroupData = (await postJsonPriApiCtaRegion(
        regionGroup as string,
        {
          context
        }
      )) as IPriApiResource;

      if (!regionGroupData.id) {
        // Unknown region group name.
        return res.status(404);
      }

      // OK. Return region group subqueues.
      return res.status(200).json(regionGroupData.subqueues);
    }
    // No region group name provided.
    return res.status(400);
  } catch (err) {
    return res.status(500).json({
      errorCode: 500,
      error: err
    });
  }
};
