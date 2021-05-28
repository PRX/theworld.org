/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import { IContentComponentProxyProps } from '@interfaces/content';
import { importComponent, preloadComponent } from '@lib/import/component';
import { wrapper } from '@store';
import { fetchAppData } from '@store/actions';

const resourceType: string = 'homepage';

type Props = IContentComponentProxyProps;

const IndexPage = ({ type }: Props) => {
  const ContentComponent = importComponent(type);

  return <ContentComponent />;
};

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const ContentComponent = await preloadComponent(resourceType);

  if (ContentComponent) {
    await Promise.all([
      // Fetch App data (latest stories, menus, etc.)
      store.dispatch<any>(fetchAppData()),
      // Use content component to fetch its data.
      store.dispatch(ContentComponent.fetchData())
    ]);

    return { props: { type: resourceType }, revalidate: 10 };
  }

  return { notFound: true };
});

export default IndexPage;
