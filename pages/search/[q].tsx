/**
 * @file [q].tsx
 * Exports the search page component.
 */

import React from 'react';
import { AppSearch } from '@components/AppSearch';
import { wrapper } from '@store';
import { fetchSearchData } from '@store/actions/fetchSearchData';

const SearchPage = ({ q }: { q: string }) => {
  return <AppSearch static q={q} />;
};

SearchPage.getInitialProps = wrapper.getInitialPageProps(
  store => async ({ query, req }): Promise<any> => {
    const { q } = query;
    await store.dispatch<any>(fetchSearchData(q as string, 'all', req));

    return { q };
  }
);

export default SearchPage;