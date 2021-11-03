/**
 * @file index.tsx
 * Exports the Home component.
 */

import { Homepage, fetchData } from '@components/pages/Homepage';
import { wrapper } from '@store/configureStore';
import { fetchAppData } from '@store/actions/fetchAppData';

const IndexPage = () => {
  return <Homepage />;
};

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  await Promise.all([
    // Fetch App data (latest stories, menus, etc.)
    store.dispatch<any>(fetchAppData()),
    // Use content component to fetch its data.
    store.dispatch<any>(fetchData())
  ]);

  return { props: {}, revalidate: 10 };
});

export default IndexPage;
