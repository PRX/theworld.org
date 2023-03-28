import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import fetchTwApi from '@lib/fetch/api/fetchTwApi';

/**
 * Method that simplifies GET queries for resource item using URL path alias.
 *
 * @param alias
 *    Alias used by resource item to display data.
 * @param params
 *    Optional. Query string params described in key:value pairs.
 * @param init
 *    Optional. Fetch request init options.
 *
 * @returns
 *    Denormalized resource item.
 */
export const fetchTwApiQueryAlias = async (
  alias: string,
  params?: object,
  init?: RequestInit
) =>
  fetchTwApi(
    `tw/v2/alias`,
    {
      _fields: 'id,type,taxonomy',
      ...params,
      slug: alias
    },
    init
  ).then(
    (resp) =>
      resp && {
        data: {
          id: resp.data.id,
          type: resp.data.taxonomy || resp.data.type
        }
      }
  );

export default fetchTwApiQueryAlias;
