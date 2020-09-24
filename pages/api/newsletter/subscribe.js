/**
 * @file newsletter/subscribe.js
 * Export function to subscribe to newsletter campaign.
 */

const Createsend = require('createsend-node');

const auth = {
  apiKey: process.env.CM_API_KEY
};
const api = new Createsend(auth);

// eslint-disable-next-line import/no-default-export
export default async (req, res) => {
  try {
    const { listId, emailAddress, name, customFields } = req.body;
    const details = {
      EmailAddress: emailAddress,
      Name: name,
      CustomFields: customFields
    };

    api.subscribers.addSubscriber(listId, details, err => {
      if (err) {
        res.end(
          JSON.stringify({
            error: Object.entries(err).reduce(
              (a, [key, value]) => ({
                ...a,
                [key.replace(/^[A-Z]/, m => m.toLowerCase())]: value
              }),
              {}
            )
          })
        );
      } else {
        res.end(
          JSON.stringify({
            success: true
          })
        );
      }
    });
  } catch (err) {
    res.status(500);
    res.end(
      JSON.stringify({
        errorCode: 500,
        error: err
      })
    );
  }
};
