/**
 * @file fetch.js
 * Exports a mechanism that makes GET requests easier to manage.
 */

import fetch from 'isomorphic-unfetch';
import qs from 'qs';
import { denormalizeJsonApi } from '../denormalize';
import { protocol, domain, apiPath, apiVersion } from '../../../config';

/**
 * Method that simplifies GET requests.
 *
 * @param {string} path - Path to the resource being requested.
 * @param {object} params - Object that will be transformed into a query string.
 * @param {object} keys - Object who's keys refer to relationship types, and
 *                        values refer to a property on the related object that
 *                        should become the key on the parsed resonse.
 *
 * @returns {object} - Denormalized response to request, or error object.
 */
const fetchPriApi = async (path, params, keys) => {
  let url = `${protocol}://${domain}/${apiPath}/v${apiVersion}/${path}`;
  const renderParams = {
    ...params
  };

  // If GET params passed, merge them into the request URL.
  if (params) {
    // Flatten each param array value into a comma separated list.
    Object.keys(params).forEach(key => {
      if (Array.isArray(params[key])) {
        renderParams[key] = params[key].join(',');
      }
    });

    // Build final URL with get params.
    url = `${url}?${qs.stringify(renderParams)}`;
  }

  // {@see https://github.com/mikeal/r2/issues/45}
  const resp = await fetch(url);
  const data = await resp.json();
  return {
    path: url,
    response: denormalizeJsonApi(data, keys),
    isFailure: data.status && data.status >= 400
  };
};

const fetchPriApiQuery = async (type, params = false) =>
  fetchPriApi(type, params).then(resp => {
    return !resp.isFailure && resp.response
  });

const fetchPriApiItem = async (type, id, params = false) =>
  fetchPriApi(`${type}/${id}`, params).then(resp => {
    return !resp.isFailure && {
      embedPlayerUrl: `${protocol}://${domain}/node/${id}/embed`,
      popoutPlayerUrl: `${protocol}://${domain}/node/${id}/popout`,
      ...resp.response
    };
  });

const hasEmptyApiData = d =>
  d.reduce((a, { id, type, self }) => a || id && type && !self, false);

export { fetchPriApi, fetchPriApiQuery, fetchPriApiItem, hasEmptyApiData };
