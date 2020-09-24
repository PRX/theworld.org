/**
 * @file fetchApi.js
 * Exports a mechanism that makes GET requests to API easier to manage.
 */

import fetch from 'isomorphic-unfetch';
import { IPriApiResource } from 'pri-api-library/types';
import { IncomingMessage } from 'http';
import { IContentContextData } from '@interfaces/content';

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
 * Method that simplifies GET queries for resource item using URL path alias.
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

/**
 * Method that simplifies GET queries for app data.
 *
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    App data object.
 */
export const fetchApiApp = async (req: IncomingMessage) => fetchApi('app', req);

/**
 * Method that simplifies GET queries for homepage data.
 *
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Homepage data object.
 */
export const fetchApiHomepage = async (req: IncomingMessage) =>
  fetchApi('homepage', req);

/**
 * Method that simplifies GET queries for newsletter data.
 *
 * @param id
 *    API id of newsletter.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Story data object.
 */
export const fetchApiNewsletter = async (
  id: string | number,
  req: IncomingMessage
) => fetchApi(`newsletter/${id}`, req);

/**
 * Method that simplifies GET queries for story data.
 *
 * @param id
 *    API id of story.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Story data object.
 */
export const fetchApiStory = async (
  id: string | number,
  req: IncomingMessage
): Promise<IContentContextData> => fetchApi(`story/${id}`, req);
