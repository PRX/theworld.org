/**
 * @file fetchTwApi.js
 * Exports a mechanism that makes GET requests to TW (WP) API easier to manage.
 */

import type { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { stringify as qsStringify } from 'qs';
import { twApi as configTwApi } from '@config';

const twApiConfig = configTwApi || process.env.TW_API_CONFIG;
const { apiUrlBase } = twApiConfig;

/**
 * Fetch data from TW (WP) API.
 *
 * @param path API resource path.
 * @param params Query parameters.
 * @param init Init options for the fetch.
 * @returns Fetched data.
 */
export async function fetchTwApi<T>(
  path: string,
  params?: { [k: string]: any },
  init?: RequestInit
) {
  let url = `${apiUrlBase}/${path}`;

  if (params) {
    const qs = qsStringify(params);
    url = `${url}?${qs}`;
  }

  const resp = await fetch(url, init);

  if (!resp.ok) return undefined;

  try {
    const data = await resp.json();
    const isCollection = !!resp.headers['x-wp-total'];

    if (isCollection) {
      const count = parseInt(resp.headers['x-wp-total'], 10);
      const first = 1;
      const last = parseInt(resp.headers['x-wp-totalpages'], 10);
      const size = Math.ceil(count / last);
      const page = parseInt(params?.page, 10) || 1;
      const next = page + 1;

      return {
        meta: {
          count,
          first,
          last,
          ...(next <= last && { next }),
          page,
          size
        },
        data
      } as T;
    }

    return { data } as T;
  } catch (error) {
    return undefined;
  }
}

export default fetchTwApi;
