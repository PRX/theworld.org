/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import { connect } from 'react-redux';
import { NextPageContext } from 'next';
import Error from 'next/error';
import { IncomingMessage } from 'http';
import { IContentComponentProxyProps } from '@interfaces/content';
import { importComponent, preloadComponent } from '@lib/import/component';
import { RootState } from '@interfaces/state';

interface DispatchProps {
  fetchAliasData: (alias: string, req: IncomingMessage) => void;
}

interface StateProps extends RootState {}

type Props = StateProps & DispatchProps & IContentComponentProxyProps;

const IndexPage = (props: Props) => {
  const { errorCode } = props;
  let output: JSX.Element = <></>;

  if (errorCode) {
    // Render error page.
    output = <Error statusCode={errorCode} />;
  } else {
    // Render content component.
    const { type } = props;
    const ContentComponent = importComponent(type);

    output = <ContentComponent />;
  }

  return output;
};

IndexPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<IContentComponentProxyProps> => {
  const { res, req, store } = ctx;
  const resourceType: string = 'homepage';
  const ContentComponent = await preloadComponent(resourceType);

  // Use content component to fetch its data.
  if (ContentComponent) {
    // Dispatch action returned from content component fetchData.
    store.dispatch({ type: 'LOADING_CONTENT_DATA' });

    await store.dispatch(ContentComponent.fetchData(undefined, req));

    store.dispatch({ type: 'LOADING_COMPLETE' });
    return { type: resourceType, id: undefined };
  }

  // There was a problem locating components.
  const statusCode = 404;

  if (res) {
    res.statusCode = statusCode;
  }

  return {
    errorCode: statusCode
  };
};

const mapStateToProps = (state: RootState): StateProps => state;

export const config = { amp: 'hybrid' };
export default connect<StateProps, DispatchProps, IContentComponentProxyProps>(
  mapStateToProps
)(IndexPage); // eslint-disable-line import/no-default-export
