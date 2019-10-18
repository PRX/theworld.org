/**
 * @file stories/[id].js
 * Page component for StoryPage.
 */
import React, { Component } from 'react';
import PropTypes from'prop-types';
import Head from 'next/head';
import Link from 'next/link';

import { fetchPriApiItem } from '../../lib/fetch';

class StoryPage extends Component {

  /* istanbul ignore next */
  static async getInitialProps(ctx) {
    const { query: { id } } = ctx;
    const data = await fetchPriApiItem('node--stories', id);

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

StoryPage.propTypes = {
  data: PropTypes.shape()
};

StoryPage.defaultProps = {
  data: {}
};

export default StoryPage;
