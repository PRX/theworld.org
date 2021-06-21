/**
 * @file _document.tsx
 * Exports the main document.
 */

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

class TwDocument extends Document {
  render() {
    const googleFontDomain = 'https://fonts.gstatic.com';
    const googleFontsUrl =
      'https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Sans+Pro:400,700,400italic|Montserrat:400,700|Alegreya:400,400italic|Roboto|Roboto+Slab|Sanchez&display=swap';
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href={googleFontDomain} crossOrigin="" />
          <link rel="stylesheet" type="text/css" href={googleFontsUrl} />
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
