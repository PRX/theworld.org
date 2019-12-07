/**
 * @file _app.tsx
 * Override the main app component.
 */

import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UrlSearchParams from 'url-search-params';

class TwApp extends App {
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
