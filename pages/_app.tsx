/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UrlSearchParams from 'url-search-params';

class TwApp extends App {

  async componentDidMount() {
    this.initializeRouteState();

    // Register route change events.
    Router.events.on('routeChangeComplete', this.handleRouteChangeComplete);
  }

  componentWillUnmount() {
    // Remove route changes events.
    Router.events.off('routeChangeComplete', this.handleRouteChangeComplete);
  }

  /**
   * Handle completed route changes.
   *
   * Next app router will navigate the browser URL to an app route URL, and has
   * no way of determining the correct route to use for any given alias URL. We
   * will provide the alias as a querystring param when rending internal links.
   * Here we will replace the history state to display the alias in the browser
   * URL bar, and not the app page route.
   */
  handleRouteChangeComplete = url => {
    const [, urlQuerystring] = url.split('?');
    const urlParams = new UrlSearchParams(urlQuerystring);

    // If our route contains an alias param, replace current history state
    // with current state using alias as display URL.
    if (urlParams.has('alias')) {
      const alias = urlParams.get('alias');
      const { router: { asPath, pathname } } = Router;

      window.history.replaceState({
        url: pathname,
        as: asPath
      }, null, alias);
    }
  }

  /**
   * Initialize route state to be compatible with client-side routing.
   *
   * Initial page loads will not have populated the history state with values
   * the Next app router can use as expected. This should only need to be done
   * once on the initial page. Should replace current history state with URL
   * values that would be supported by router when user returns to this page
   * using browser navigation.
   */
  initializeRouteState = () => {
    const { router: { asPath, pathname, route, query } } = Router;

    // If this is not an error route and is a dynamic route, check to see if
    // the `as` is prefixed with the expected pathname.
    if (route !== '/_error' && pathname !== asPath) {
      const asPathPrefix = Object.keys(query).reduce((result, key) => {
        const value = query[key].toString();
        return result.replace(`[${key}]`, value);
      }, route);
      // If the prefix is missing, replace history with current state and
      // using prefix as the `as` path, appending the current `as` path in the
      // `alias` querystring parameter. Use current `as` path as history URL.
      if (asPath.indexOf(asPathPrefix) !== 0) {
        window.history.replaceState({
          url: pathname,
          as: `${asPathPrefix}?alias=${asPath}`
        }, null, asPath);
      }
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <div>NAV BAR HERE</div>
        <Component {...pageProps} />
      </>
    );
  }
}

export default TwApp;
