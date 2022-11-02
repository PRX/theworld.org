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

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ({ res }) => {
    const data = await store.dispatch<any>(fetchHomepageData());

    await store.dispatch<any>(fetchAppData());

    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 5}`
    );

    return {
      props: {
        type: 'homepage',
        dataHash: crypto
          .createHash('sha256')
          .update(JSON.stringify(data))
          .digest('hex')
      }
    };
  }
);

export default IndexPage;
