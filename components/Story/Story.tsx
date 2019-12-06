/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { Component } from 'react';
import { useAmp } from 'next/amp';
import Head from 'next/head';
import Link from 'next/link';
import ContentContext from '@contexts/ContentContext';

class Story extends Component {

  render() {
    const { data: { title, id, teaser } } = this.context;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Link href="/">
          <a href="/">Home</a>
        </Link>
        <h1>{title}</h1>
        <dl>
          <dt>Story Id</dt>
          <dd>{id}</dd>

          <dt>Teaser</dt>
          <dd>{teaser}</dd>
        </dl>
      </>
    );
  }
}

Story.contextType = ContentContext;

export default Story;
