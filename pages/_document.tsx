/**
 * @file _document.tsx
 * Exports the main document.
 */

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

class TwDocument extends Document {
  render() {
    return (
      <Html lang="en" className="no-js">
        <Head>
          {[
            'alegreya/italic/alegreya-italic-400-latin.woff',
            'alegreya/normal/alegreya-normal-400-latin.woff',
            'montserrat/normal/montserrat-normal-400-latin.woff2',
            'montserrat/normal/montserrat-normal-700-latin.woff2',
            'opensans/normal/opensans-normal-400-latin.woff2',
            'opensans/normal/opensans-normal-700-latin.woff2',
            'sourcesanspro/italic/sourcesanspro-italic-400-latin.woff2',
            'sourcesanspro/normal/sourcesanspro-normal-400-latin.woff2',
            'sourcesanspro/normal/sourcesanspro-normal-700-latin.woff2'
          ].map(path => (
            <link
              key={path}
              rel="preload"
              href={`/fonts/${path}`}
              as="font"
              type={`font/${path.split('.').pop()}`}
              crossOrigin="anonymous"
            />
          ))}
          <link href="/css/fonts.css" rel="stylesheet" />
          <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
          <link
            rel="search"
            title="priorg"
            type="application/opensearchdescription+xml"
            href="/opensearch.xml"
          />
          <link rel="icon" href="/images/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="shadowed-goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  result="blur"
                  stdDeviation="10"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                <feColorMatrix
                  in="shadow"
                  mode="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
                  result="shadow"
                />
                <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                <feBlend in2="shadow" in="goo" result="goo" />
                <feBlend in2="goo" in="SourceGraphic" result="mix" />
              </filter>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  result="blur"
                  stdDeviation="10"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feBlend in2="goo" in="SourceGraphic" result="mix" />
              </filter>
            </defs>
          </svg>
        </body>
      </Html>
    );
  }
}

TwDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  // Fix for https://github.com/mui-org/material-ui/issues/15073
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  };
};

export default TwDocument; // eslint-disable-line import/no-default-export
