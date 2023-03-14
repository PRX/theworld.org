/**
 * @file fetchTwApi.js
 * Exports a mechanism that makes GET requests to TW (WP) API easier to manage.
 */

import { RequestInit } from 'next/dist/server/web/spec-extension/request';
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
export const fetchTwApi = async (
  path: string,
  params?: object,
  init?: RequestInit
) => {
  let url = `${apiUrlBase}/${path}`;

  if (params) {
    const qs = qsStringify(params);
    url = `${url}?${qs}`;
  }

  const data = await fetch(url, init)
    .then((resp) => resp.json())
    .catch(() => false);

  return data;
};
