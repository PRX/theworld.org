/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import { connect } from 'react-redux';
import { NextPageContext } from 'next';
import Error from 'next/error';
import { IncomingMessage } from 'http';
import { IPriApiResource } from 'pri-api-library/types';
import { IContentComponentProxyProps } from '@interfaces/content';
import { importComponent, preloadComponent } from '@lib/import/component';
import { RootState } from '@interfaces/state';
import { fetchAliasData } from '@store/actions';

interface DispatchProps {
  fetchAliasData: (alias: string, req: IncomingMessage) => void;
}

interface StateProps extends RootState {}

type Props = StateProps & DispatchProps & IContentComponentProxyProps;

const ContentProxy = (props: Props) => {
  const { errorCode } = props;
  let output: JSX.Element;

  if (errorCode) {
    // Render error page.
    output = <Error statusCode={errorCode} />;
  } else {
    // Render content component.
    const { type, id } = props;
    const ContentComponent = importComponent(type);

    output = <ContentComponent id={id} />;
  }

  return output;
};

ContentProxy.getInitialProps = async (
  ctx: NextPageContext
): Promise<IContentComponentProxyProps> => {
  const {
    res,
    req,
    store,
    query: { alias }
  } = ctx;
  let resourceId: string;
  let resourceType: string = 'homepage';
  // let state = store.getState() as RootState;

  // Get data for alias.
  if (alias) {
    const aliasData = await store.dispatch<any>(
      fetchAliasData(alias as string, req)
    );

    // Update resource id and type.
    if (aliasData?.id) {
      const { id, type } = aliasData as IPriApiResource;
      resourceId = id as string;
      resourceType = type;
    } else {
      resourceType = null;
    }
  }

  // Preload content component.
  if (resourceType) {
    const ContentComponent = await preloadComponent(resourceType);

    // Use content component to fetch its data.
    if (ContentComponent) {
      // Dispatch action returned from content component fetchData.
      await store.dispatch<any>(ContentComponent.fetchData(resourceId, req));
      return { type: resourceType, id: resourceId };
    }
  }

  // There was a problem locating components or data.
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
)(ContentProxy); // eslint-disable-line import/no-default-export
