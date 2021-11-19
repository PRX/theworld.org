/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import crypto from 'crypto';
import { Homepage } from '@components/pages/Homepage';
import { wrapper } from '@store/configureStore';
import { fetchHomepageData } from '@store/actions/fetchHomepageData';

const IndexPage = () => {
  return <Homepage />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    const data = await store.dispatch<any>(fetchHomepageData());

    return {
      props: {
        dataHash: crypto
          .createHash('sha256')
          .update(JSON.stringify(data))
          .digest('hex')
      }
    };
  }
);

export default IndexPage;
