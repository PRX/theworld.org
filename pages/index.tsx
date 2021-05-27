/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import { IContentComponentProxyProps } from '@interfaces/content';
import { importComponent, preloadComponent } from '@lib/import/component';
import { wrapper } from '@store';

const resourceType: string = 'homepage';

type Props = IContentComponentProxyProps;

const IndexPage = ({ type }: Props) => {
  const ContentComponent = importComponent(type);

  return <ContentComponent />;
};

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const ContentComponent = await preloadComponent(resourceType);

  // await store.dispatch<any>(fetchAppData());

  // Use content component to fetch its data.
  if (ContentComponent) {
    // Dispatch action returned from content component fetchData.
    store.dispatch({ type: 'LOADING_CONTENT_DATA' });

    await store.dispatch(ContentComponent.fetchData());

    store.dispatch({ type: 'LOADING_COMPLETE' });
    return { props: { type: resourceType }, revalidate: 10 };
  }

  return { notFound: true };
});

// IndexPage.getInitialProps = wrapper.getInitialPageProps(
//   store => async (
//     ctx: NextPageContext
//   ): Promise<IContentComponentProxyProps> => {
//     const { res, req } = ctx;
//     const ContentComponent = await preloadComponent(resourceType);

//     // Use content component to fetch its data.
//     if (ContentComponent) {
//       // Dispatch action returned from content component fetchData.
//       store.dispatch({ type: 'LOADING_CONTENT_DATA' });

//       await store.dispatch(ContentComponent.fetchData(undefined, req));

//       store.dispatch({ type: 'LOADING_COMPLETE' });
//       return { type: resourceType, id: undefined };
//     }

//     // There was a problem locating components.
//     const statusCode = 404;

//     if (res) {
//       res.statusCode = statusCode;
//     }

//     return {
//       errorCode: statusCode
//     };
//   }
// );

export default IndexPage;

// const mapStateToProps = (state: RootState): StateProps => state;

// export const config = { amp: 'hybrid' };
// export default connect<StateProps, DispatchProps, IContentComponentProxyProps>(
//   mapStateToProps
// )(IndexPage); // eslint-disable-line import/no-default-export
