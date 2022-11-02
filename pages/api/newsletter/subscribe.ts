/**
 * @file newsletter/subscribe.ts
 * Subscribe to newsletter campaign.
 */

import fetch, { Headers } from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { encode } from 'base-64';

// eslint-disable-next-line import/no-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      listId: listIdSubmitted,
      emailAddress,
      name,
      customFields
    } = req.body;
    const [clientId, listId] =
      !listIdSubmitted || listIdSubmitted.indexOf(':') === -1
        ? [undefined, listIdSubmitted]
        : listIdSubmitted.split(':');
    const clientEnvVarExists = !!(
      clientId && process.env[`CM_API_KEY_${clientId}`]
    );
    const apiKey = clientEnvVarExists
      ? process.env[`CM_API_KEY_${clientId}`]
      : process.env.CM_API_KEY;
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
          Authorization: `Basic ${encode(`${apiKey}:magic`)}`,
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
        ),
        debug: {
          clientId,
          listId,
          clientEnvVarExists,
          ...details
        }
      });
    }

    res.setHeader(
      'Cache-Control',
      'no-cache, no-store, max-age=0, must-revalidate'
    );

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
