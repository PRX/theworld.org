/**
 * @file handleButtonClick.ts
 * Handler functions for routing interactions.
 */

import { MouseEvent } from 'react';
import Router from 'next/router';
import { parse, Url } from 'url';
import { isLocalUrl } from '../parse/url';

/**
 * Helper function to convert generic Url object for use in app relative aliseed
 * Url object for use in Link components.
 *
 * @param url
 *    Url object to convert.
 *
 * @returns
 *    Url object with alias query relative to app.
 */
export const generateLinkHrefFromUrl = (url: Url) => {
  const pathname = url.pathname !== '/' ? '/[...alias]' : '/';
  const query =
    pathname !== '/' && url.pathname
      ? { alias: url.pathname.replace(/^\/+|\/+$/g, '').split('/') }
      : null;

  return {
    pathname,
    query
  };
};

/**
 * Generates handler function to update route on click.
 *
 * @param url
 *    Url object to update router with.
 *
 * @returns
 *    Handler function.
 */
/* istanbul ignore next */
export const handleButtonClick =
  (url: Url | string, callback?: Function) => (event: MouseEvent) => {
    event.preventDefault();

    if (url) {
      const parsedUrl = typeof url === 'string' ? parse(url as string) : url;

      Router.push(
        isLocalUrl(parsedUrl.href)
          ? generateLinkHrefFromUrl(parsedUrl)
          : parsedUrl,
        parsedUrl.pathname || undefined
      );
    }

    if (callback) {
      callback();
    }
  };
