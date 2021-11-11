/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import crypto from 'crypto';
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
      dataHash: crypto
        .createHash('md5')
        .update(JSON.stringify(data))
        .digest('hex')
    },
    revalidate: 10
  };
});

export default IndexPage;
