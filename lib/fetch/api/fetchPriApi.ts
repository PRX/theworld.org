/**
 * @file fetchPriApi.js
 * Exports a mechanism that makes GET requests to PRI API easier to manage.
 */

import {
  fetchPriApi as libFetchPriApi,
  postJsonPriApi as libPostJsonPriApi,
  fetchPriApiItem as libFetchPriApiItem,
  fetchPriApiQuery as libFetchPriApiQuery,
  denormalizeJsonApi
} from 'pri-api-library';
import {
  IPriApiResource,
  PriApiResourceResponse,
  IPriApiResponse,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import * as JSONAPI from 'jsonapi-typescript';
import { ILink } from '@interfaces/link';
import { parseCtaMessage } from '@lib/parse/cta';
// eslint-disable-next-line import/no-unresolved
import { priApi as priApiConfig } from '@config';

/**
 * Method that simplifies GET requests.
 *
 * @param path
 *    Path to the resource being requested.
 * @param params
 *    Object that will be transformed into a query string.
 * @param keys
 *    Object who's keys refer to relationship types, and values refer to a
 *    property on the related object that should become the key on the parsed
 *    resonse.
 *
 * @returns
 *    Denormalized response to request, or error object.
 */
export const fetchPriApi = async (
  path: string,
  params?: object,
  keys?: object
): Promise<IPriApiResponse> => libFetchPriApi(path, params, keys, priApiConfig);

/**
 * Method that simplifies POST JSON requests.
 *
 * @param path
 *    Path to the resource being requested.
 * @param params
 *    Object that will be transformed into a query string.
 * @param body
 *    Object containing the body to send as JSON.
 * @param keys
 *    Object who's keys refer to relationship types, and values refer to a
 *    property on the related object that should become the key on the parsed
 *    resonse.
 *
 * @returns
 *    Denormalized response to request, or error object.
 */
export const postJsonPriApi = async (
  path: string,
  params?: object,
  body?: object,
  keys?: object
): Promise<IPriApiResponse> =>
  libPostJsonPriApi(path, params, body, keys, priApiConfig);

/**
 * Method that simplifies GET queries for collection resources.
 *
 * @param type
 *    Resource type name.
 * @param params
 *    Optional. Query string params described in key:value pairs.
 * @param keys
 *    Object who's keys refer to relationship types, and values refer to a
 *    property on the related object that should become the key on the parsed
 *    resonse.
 *
 * @returns
 *    Denormalized resource collection.
 */
export const fetchPriApiQuery = async (
  type: string,
  params?: object,
  keys?: object
): Promise<PriApiResourceResponse> =>
  libFetchPriApiQuery(type, params, keys, priApiConfig);

/**
 * Method that simplifies GET queries for resource item.
 *
 * @param type
 *    Resource type name.
 * @param id
 *    Resource unique identifier.
 * @param params
 *    Optional. Query string params described in key:value pairs.
 * @param keys
 *    Object who's keys refer to relationship types, and values refer to a
 *    property on the related object that should become the key on the parsed
 *    resonse.
 *
 * @returns
 *    Denormalized resource item.
 */
export const fetchPriApiItem = async (
  type: string,
  id: number | string,
  params?: object,
  keys?: object
): Promise<PriApiResourceResponse> =>
  libFetchPriApiItem(type, id, params, keys, priApiConfig);

/**
 * Method that simplifies GET queries for resource item using URL path alias.
 *
 * @param alias
 *    Alias used by resource item to display data.
 * @param params
 *    Optional. Query string params described in key:value pairs.
 * @param keys
 *    Object who's keys refer to relationship types, and values refer to a
 *    property on the related object that should become the key on the parsed
 *    resonse.
 *
 * @returns
 *    Denormalized resource item.
 */
export const fetchPriApiQueryAlias = async (
  alias: string,
  params?: object,
  keys?: object
): Promise<PriApiResourceResponse> =>
  fetchPriApi(
    `query/alias/${alias.replace(/^\/+|\/+$/, '')}`,
    params,
    keys
  ).then(resp => !resp.isFailure && resp.response);

/**
 * Method that simplifies GET queries for menu.
 *
 * @param menuName
 *    Machine name of menu.
 *
 * @returns
 *    Denormalized resource item.
 */
export const fetchPriApiQueryMenu = async (
  menuName: string
): Promise<ILink[]> =>
  fetchPriApi(`menu/tree/${menuName}`).then(
    ({ isFailure, response }) => !isFailure && (response.data as ILink[])
  );

/**
 * Method that simplifies GET queries for CTA region collections.
 *
 * @param alias
 *    Alias used by resource item to display data.
 * @param params
 *    Optional. Query string params described in key:value pairs.
 * @param keys
 *    Object who's keys refer to relationship types, and values refer to a
 *    property on the related object that should become the key on the parsed
 *    resonse.
 *
 * @returns
 *    Denormalized resource item.
 */
export const fetchPriApiCtaRegion = async (
  name: string,
  params?: object,
  keys?: object
): Promise<PriApiResourceResponse> =>
  fetchPriApi(`cta/region/${name.replace(/^\/+|\/+$/, '')}`, params, keys).then(
    resp => !resp.isFailure && resp.response
  );

/**
 * Method that simplifies POST JSON queries for CTA region group collections.
 *
 * @param alias
 *    Alias used by resource item to display data.
 * @param body
 *    Object containing the body to send as JSON.
 *
 * @returns
 *    Denormalized resource item.
 */
export const postJsonPriApiCtaRegion = async (
  name: string,
  body: object
): Promise<PriApiResourceResponse> =>
  postJsonPriApi(
    `tw/cta/region_group/${name}`,
    {
      include: 'newsletter'
    },
    body
  )
    .then(resp => !resp.isFailure && resp.response)
    .then(
      (resp: IPriApiResourceResponse) =>
        resp && {
          ...resp,
          data: {
            ...resp.data,
            subqueues: Object.entries((resp.data as IPriApiResource).subqueues)
              // Denormalize subqueue array items.
              .map(
                ([key, items]: [string, JSONAPI.CollectionResourceDoc[]]) => [
                  key,
                  items.map(item => denormalizeJsonApi(item))
                ]
              )
              // Parse Message data
              .map(([key, items]: [string, IPriApiResource[]]) => [
                key,
                items.map(item => parseCtaMessage(item, key))
              ])
              // Convert back to object.
              .reduce(
                (a, [key, value]: [string, any]) => ({
                  ...a,
                  [key]: value
                }),
                {}
              )
          }
        }
    );
