/**
 * @file fetchApi.js
 * Exports a mechanism that makes GET requests to API easier to manage.
 */

import fetch from 'isomorphic-unfetch';
import { IPriApiResource } from 'pri-api-library/types';
import { IncomingMessage } from 'http';

/**
 * Metho that simplifies GET queries for resource item using URL path alias.
 *
 * @param alias
 *    Alias used by resource item to display data.
 *
 * @returns
 *    Denormalized resource item.
 */
export const fetchApiQueryAlias = async (
  alias: string,
  req: IncomingMessage
): Promise<IPriApiResource> => {
  const baseUrl = req
    ? `${req.headers['x-forwarded-proto']}://${req.headers.host}`
    : '';

  if (req) {
    console.log(req.headers);
    console.log(process.env);
  }

  return fetch(`${baseUrl}/api/query/alias${alias}`).then(resp => resp.json());
};
