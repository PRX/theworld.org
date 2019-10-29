/**
 * @file _document.tsx
 * Exports the main document.
 */

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class TwDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            key="viewport"
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic|Raleway:400,700|Alegreya:400,400italic|Roboto|Roboto+Slab|Sanchez"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="/static/apple-touch-icon.png"
            rel="apple-touch-icon"
          />
          <link
            href="/opensearch.xml"
            rel="search"
            title="priorg"
            type="application/opensearchdescription+xml"
          />
          <link
            href="/static/favicon.ico"
            rel="icon"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default TwDocument;
