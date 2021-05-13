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
      <Html>
        <Head>
          <html lang="en">
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Sans+Pro:400,700,400italic|Montserrat:400,700|Alegreya:400,400italic|Roboto|Roboto+Slab|Sanchez"
            rel="stylesheet"
            type="text/css"
          />
          <link href="/images/apple-touch-icon.png" rel="apple-touch-icon" />
          <link
            href="/opensearch.xml"
            rel="search"
            title="priorg"
            type="application/opensearchdescription+xml"
          />
          <link href="/images/favicon.png" rel="icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
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
