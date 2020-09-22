/**
 * @file newsletter/subscribe.ts
 * Export function to subscribe to newsletter campaign.
 */

import Createsend from 'createsend-node';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(resolve => {
    try {
      const auth = {
        apiKey: process.env.CM_API_KEY
      };
      const api = new Createsend(auth);
      const { listId, emailAddress, name, customFields } = req.body;
      const details = {
        EmailAddress: emailAddress,
        Name: name,
        CustomFields: customFields
      };

      return api.subscribers.addSubscriber(listId, details, err => {
        if (err) {
          res.status(400).json({
            error: Object.entries(err).reduce(
              (a, [key, value]) => ({
                ...a,
                [key.replace(/^[A-Z]/, m => m.toLowerCase())]: value
              }),
              {}
            )
          });
        } else {
          res.status(200).json({
            success: true
          });
        }
        return resolve();
      });
    } catch (err) {
      res.status(500).json({
        errorCode: 500,
        error: err
      });
      return resolve();
    }
  });
};
