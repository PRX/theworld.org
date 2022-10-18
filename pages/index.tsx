/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import crypto from 'crypto';
import { Homepage } from '@components/pages/Homepage';
import { wrapper } from '@store/configureStore';
import { fetchHomepageData } from '@store/actions/fetchHomepageData';
import { fetchAppData } from '@store/actions/fetchAppData';

const IndexPage = () => {
  return <Homepage />;
};

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const data = await store.dispatch<any>(fetchHomepageData());

  await store.dispatch<any>(fetchAppData());

  return {
    props: {
      dataHash: crypto
        .createHash('sha256')
        .update(JSON.stringify(data))
        .digest('hex')
    },
    revalidate: parseInt(process.env.ISR_REVALIDATE || '1', 10)
  };
});

export default IndexPage;
