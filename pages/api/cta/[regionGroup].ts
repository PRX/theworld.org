/**
 * @file cta/[regionGroup].ts
 * Gather CTA messages for a region group.
 */
import { NextApiRequest, NextApiResponse } from 'next';
import { IPriApiResourceResponse } from 'pri-api-library/types';
import { fetchCtaRegionGroup } from '@lib/fetch/cta';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { regionGroup } = req.query;
    const allNumericRegex = /^\d+$/;

    if (regionGroup && !allNumericRegex.test(regionGroup as string)) {
      // Fetch CTA Messages.
      const regionGroupData = (await fetchCtaRegionGroup(
        regionGroup as string
      )) as IPriApiResourceResponse;

      if (!regionGroupData || !regionGroupData.data.id) {
        // Unknown region group name.
        return res.status(404);
      }

      // OK. Return region group subqueues.
      res.setHeader(
        'Cache-Control',
        process.env.TW_API_CTA_CACHE_CONTROL ||
          'public, s-maxage=2, stale-while-revalidate'
      );

      return res.status(200).json(regionGroupData);
    }
    // No region group name provided.
    return res
      .status(400)
      .json({ errorCode: 400, error: 'Invalid Region Group Name.' });
  } catch (err) {
    return res.status(500).json({
      errorCode: 500,
      error: err
    });
  }
};
