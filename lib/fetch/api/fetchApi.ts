/**
 * @file fetchApi.js
 * Exports a mechanism that makes GET requests to API easier to manage.
 */

import fetch from 'isomorphic-unfetch';
import { IPriApiResource } from 'pri-api-library/types';
import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { parse, format } from 'url';
import { ICtaMessage } from '@interfaces/cta';
import {
  INewsletterOptions,
  INewsletterData,
  ICMApiCustomField
} from '@interfaces/newsletter';

/**
 * Method that simplifies GET requests.
 *
 * @param path
 *    Path to the resource being requested.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 * @param query
 *    Query object.
 * @param body
 *    Data object to send as JSON. Will convert request to POST.
 *
 * @returns
 *    Denormalized response to request, or error object.
 */
export const fetchApi = async (
  path: string,
  req?: IncomingMessage,
  query?: ParsedUrlQuery,
  body?: Object
) => {
  const baseUrl = req
    ? `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`
    : '';
  const { query: reqQuery = {} } = (req && parse(req.url, true)) || {};

  delete reqQuery.alias;

  const url = format({
    pathname: `${baseUrl}/api/${path}`,
    query: {
      ...reqQuery,
      ...(query || {})
    }
  });

  return fetch(
    url,
    body
      ? {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      : {}
  ).then(r => r.json());
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
  req?: IncomingMessage
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
export const fetchApiApp = async (req?: IncomingMessage) =>
  fetchApi('app', req);

/**
 * Method that simplifies GET queries for homepage data.
 *
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Homepage data object.
 */
export const fetchApiHomepage = async (req?: IncomingMessage) =>
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
  req?: IncomingMessage
) => fetchApi(`newsletter/${id}`, req);

/**
 * Post subscription data to Campaign Monitor.
 *
 * @param newsletter Newsletter data object.
 * @param options Newsletter subscription options.
 */
export const postNewsletterSubsciption = async (
  newsletter: INewsletterData,
  options: INewsletterOptions
) => {
  const { emailAddress } = newsletter;
  const { listId, customFields: cflds } = {
    listId: '04472db22d3fa6920bb38f18358b0f72',
    ...options
  };
  const customFields = Object.entries(cflds).map(
    ([Key, Value]: [string, string]): ICMApiCustomField => ({
      Key,
      Value
    })
  );
  const payload = {
    listId,
    emailAddress,
    customFields
  };
  return fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(r => r.json());
};

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
  req?: IncomingMessage
): Promise<IPriApiResource> => fetchApi(`story/${id}`, req);

/**
 * Method that simplifies GET queries for program data.
 *
 * @param id
 *    API id of program.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Story data object.
 */
export const fetchApiProgram = async (
  id: string | number,
  req?: IncomingMessage
): Promise<IPriApiResource> => fetchApi(`program/${id}`, req);

/**
 * Method that simplifies GET queries for program stories data.
 *
 * @param id
 *    API id of program.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Story data object.
 */
export const fetchApiProgramStories = async (
  id: string | number,
  page: string | number = 1,
  req?: IncomingMessage
): Promise<{ data: IPriApiResource[] }> =>
  fetchApi(`program/${id}/stories/${page}`, req);

/**
 * Method that simplifies GET queries for category data.
 *
 * @param id
 *    API id of category.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Story data object.
 */
export const fetchApiCategory = async (
  id: string | number,
  req?: IncomingMessage
): Promise<IPriApiResource> => fetchApi(`category/${id}`, req);

/**
 * Method that simplifies GET queries for category stories data.
 *
 * @param id
 *    API id of category.
 * @param req
 *    Request object from `getInitialProps` ctx object.
 *
 * @returns
 *    Story data object.
 */
export const fetchApiCategoryStories = async (
  id: string | number,
  page: number = 1,
  range?: number,
  field?: string,
  exclude?: string | string[],
  req?: IncomingMessage
): Promise<{ data: IPriApiResource[] }> =>
  fetchApi(`category/${id}/stories/${page}`, req, {
    ...(range && { range: `${range}` }),
    ...(exclude && { exclude }),
    ...(field && { field })
  });

export const fetchApiCtaRegionGroup = async (
  regionGroup: string,
  context: string[],
  req: IncomingMessage
): Promise<{ data: { [k: string]: ICtaMessage[] } }> =>
  fetchApi(`cta/${regionGroup}`, req, undefined, {
    context
  });
