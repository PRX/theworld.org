/**
 * @file fetchPriApi.js
 * Exports a mechanism that makes GET requests to PRI API easier to manage.
 */

import {
  fetchPriApi as libFetchPriApi,
  fetchPriApiItem as libFetchPriApiItem,
  fetchPriApiQuery as libFetchPriApiQuery
} from 'pri-api-library';
import { PriApiResourceResponse, IPriApiResponse } from 'pri-api-library/types';
import { ILink } from '@interfaces/link';
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
 * @param keys
 *    Object who's keys refer to relationship types, and values refer to a
 *    property on the related object that should become the key on the parsed
 *    resonse.
 *
 * @returns
 *    Denormalized resource collection.
 */
const fetchPriApiQuery = async (type: string, params?: object, keys?: object): Promise<PriApiResourceResponse> =>
  libFetchPriApiQuery(type, params, keys, priApiConfig);

/**
 * Methods that simplifies GET queries for resource item.
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
const fetchPriApiItem = async (
  type: string,
  id: number | string,
  params?: object,
  keys?: object
): Promise<PriApiResourceResponse> => libFetchPriApiItem(type, id, params, keys, priApiConfig);

/**
 * Metho that simplifies GET queries for resource item using URL path alias.
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
const fetchPriApiQueryAlias = async (alias: string, params?: object, keys?: object): Promise<PriApiResourceResponse> =>
  fetchPriApi(`query/alias/${alias.replace(/^\/+|\/+$/, '')}`, params, keys).then(resp => !resp.isFailure && resp.response);

/**
 * Metho that simplifies GET queries for menu.
 *
 * @param menuName
 *    Machine name of menu.
 *
 * @returns
 *    Denormalized resource item.
 */
const fetchPriApiQueryMenu = async (menuName: string): Promise<ILink[]> =>
  fetchPriApi(`menu/tree/${menuName}`).then(resp => !resp.isFailure && resp.response as ILink[]);

export { fetchPriApi, fetchPriApiQuery, fetchPriApiQueryAlias, fetchPriApiItem, fetchPriApiQueryMenu };
