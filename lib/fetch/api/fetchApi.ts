/**
 * @file fetchApi.js
 * Exports a mechanism that makes GET requests to API easier to manage.
 */

import fetch from 'isomorphic-unfetch';
import { IPriApiResource } from 'pri-api-library/types';
import { IncomingMessage } from 'http';

/**
 * Method that simplifies GET requests.
 *
 * @param path
 *    Path to the resource being requested.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Denormalized response to request, or error object.
 */
export const fetchApi = async (path: string, req: IncomingMessage) => {
  const baseUrl = req
    ? `${req.headers['x-forwarded-proto']}://${req.headers.host}`
    : '';
  return fetch(`${baseUrl}/api/${path}`).then(resp => resp.json());
};

/**
 * Metho that simplifies GET queries for resource item using URL path alias.
 *
 * @param alias
 *    Alias used by resource item to display data.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Denormalized resource item.
 */
export const fetchApiQueryAlias = async (
  alias: string,
  req: IncomingMessage
): Promise<IPriApiResource> => fetchApi(`query/alias${alias}`, req);
