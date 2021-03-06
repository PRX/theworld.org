/**
 * @file newsletter/subscribe.ts
 * Export function to subscribe to newsletter campaign.
 */

import fetch, { Headers } from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { encode } from 'base-64';

// eslint-disable-next-line import/no-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { listId, emailAddress, name, customFields } = req.body;
    const details = {
      EmailAddress: emailAddress,
      Name: name,
      CustomFields: customFields,
      ConsentToTrack: 'Unchanged'
    };
    const resp = await fetch(
      `https://api.createsend.com/api/v3.2/subscribers/${listId}.json`,
      {
        method: 'POST',
        headers: new Headers({
          Authorization: `Basic ${encode(`${process.env.CM_API_KEY}:magic`)}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(details)
      }
    );
    const respJson = await resp.json();

    if (resp.status !== 201) {
      return res.status(resp.status).json({
        errorCode: resp.status,
        error: Object.entries(respJson).reduce(
          (a, [key, value]) => ({
            ...a,
            [key.replace(/^[A-Z]/, m => m.toLowerCase())]: value
          }),
          {}
        )
      });
    }

    return res.status(200).json({
      success: true
    });
  } catch (err) {
    return res.status(500).json({
      errorCode: 500,
      error: err
    });
  }
};
