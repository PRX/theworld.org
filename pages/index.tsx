/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import base64 from 'base-64';
import utf8 from 'utf8';
import { Homepage } from '@components/pages/Homepage';
import { wrapper } from '@store/configureStore';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchHomepageData } from '@store/actions/fetchHomepageData';

const IndexPage = () => {
  return <Homepage />;
};

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const [, data] = await Promise.all([
    // Fetch App data (latest stories, menus, etc.)
    store.dispatch<any>(fetchAppData()),
    // Use content component to fetch its data.
    store.dispatch<any>(fetchHomepageData())
  ]);

  return {
    props: {
      dataHash: base64.encode(utf8.encode(JSON.stringify(data)))
    },
    revalidate: 10
  };
});

export default IndexPage;
