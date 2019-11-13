/**
 * @file stories/[id].tsx
 * Page component for StoryPage.
 */
import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPageContext } from 'next-server/dist/lib/utils';

import { fetchPriApiItem } from '../../lib/fetch';

// TODO: Move this into PRI API Library/SDK.
interface StoryData {
  id: number | string,
  title: string,
  teaser: string
}

// TODO: Move to ./interfaces
interface StoryState {
  data: StoryData
}

class StoryPage extends Component<StoryState> {

  static async getInitialProps(ctx: NextPageContext) {
    const { query: { id } } = ctx;
    const data = await fetchPriApiItem('node--stories', id as string);

    return { data };
  }

  render() {
    const { data: { title, id, teaser } } = this.props;

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

export default StoryPage;
