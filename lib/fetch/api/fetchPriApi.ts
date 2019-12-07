/**
 * @file fetch.js
 * Exports a mechanism that makes GET requests easier to manage.
 */

import {
  fetchPriApi as libFetchPriApi,
  fetchPriApiItem as libFetchPriApiItem,
  fetchPriApiQuery as libFetchPriApiQuery
} from 'pri-api-library';
import { PriApiResourceResponse, IPriApiResponse } from 'pri-api-library/types';
import { priApi as priApiConfig} from '../../../config';

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
const fetchPriApi = async (
  path: string,
  params?: object,
  keys?: object
): Promise<IPriApiResponse> => libFetchPriApi(path, params, keys, priApiConfig);

/**
 * Methods that simplifies GET queries for collection resources.
 *
 * @param type
 *    Resource type name.
 * @param params
 *    Optional. Query string params described in key:value pairs.
 *
 * @returns
 *    Denormalized resource collection.
 */
const fetchPriApiQuery = async (type: string, params?: object, keys?: object): Promise<PriApiResourceResponse> =>
  libFetchPriApiQuery(type, params, keys, priApiConfig);

const fetchPriApiQueryAlias = async (alias: string, params?: object, keys?: object): Promise<PriApiResourceResponse> =>
  fetchPriApi(`query/alias/${alias.replace(/^\/+|\/+$/, '')}`, params, keys).then(resp => !resp.isFailure && resp.response);

/**
 * Methods that simplifies GET queries for resource item.
 *
 * @param type
 *    Resource type name.
 * @param id
 *    Resource unique identifier.
 * @param params
 *    Optional. Query string params described in key:value pairs.
 *
 * @returns
 *    Denormalized resource item.
 */
const fetchPriApiItem = async (
  type: string,
  id: number | string,
  params?: object,
  keys?: object
): Promise<PriApiResourceResponse> => libFetchPriApiItem(type, id, params, keys, priApiConfig);

export { fetchPriApi, fetchPriApiQuery, fetchPriApiQueryAlias, fetchPriApiItem };
