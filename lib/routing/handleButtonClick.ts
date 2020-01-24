/**
 * @file handleButtonClick.ts
 * Handler functions for routing interactions.
 */

import { MouseEvent } from 'react';
import Router from 'next/router';
import { Url } from 'url';

export const generateLinkHrefFromUrl = (url: Url) => {
  const query = url.pathname !== '/' ? {
    alias: url.pathname
  } : null;

  return {
    pathname: '/',
    query
  };
}

export default (url: Url) => (event: MouseEvent) =>{
  event.preventDefault();

  Router.push(generateLinkHrefFromUrl(url), url.pathname);
};