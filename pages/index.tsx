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
import { ContentContext } from '@contexts/ContentContext';
import { importComponent, preloadComponent } from '@lib/import/component';
import { RootState } from '@interfaces/state';
import * as fromActions from '@store/actions/fetchAliasData';

interface DispatchProps {
  fetchAliasData: (alias: string, req: IncomingMessage) => void;
}

interface StateProps extends RootState {}

type Props = StateProps & DispatchProps & IContentComponentProxyProps;

const ContentProxy = (props: Props) => {
  const { errorCode } = props;
  let output: JSX.Element;

  // Render error page.
  if (errorCode) {
    output = <Error statusCode={errorCode} />;
  } else {
    const {
      data,
      data: { type }
    } = props;
    const ContentComponent = importComponent(type);

    output = (
      <ContentContext.Provider value={data}>
        <ContentComponent />
      </ContentContext.Provider>
    );
  }

  return output;
};

ContentProxy.getInitialProps = async (ctx: NextPageContext) => {
  const {
    res,
    req,
    store,
    query: { alias }
  } = ctx;
  let resourceId: string | number;
  let resourceType: string = 'homepage';
  let resourceSignature: string;
  let state = store.getState() as RootState;

  // Get data for alias.
  if (alias) {
    let aliasData = state.byAlias[alias as string];

    if (!aliasData) {
      await store.dispatch<any>(
        fromActions.fetchAliasData(alias as string, req)
      );
      state = store.getState();
      aliasData = state.byAlias[alias as string];
    }

    // Update resource id and type.
    if (aliasData?.id) {
      const { id, type } = aliasData as IPriApiResource;
      resourceId = id;
      resourceType = type;
      resourceSignature = [resourceType, resourceId].join(':');
    } else {
      resourceType = null;
    }
  }

  // Preload content component.
  if (resourceType) {
    const ContentComponent = await preloadComponent(resourceType);

    // Use content component to fetch its data.
    if (ContentComponent) {
      const contentData = state.byResource[resourceSignature];

      // TODO: Thunk that only returns resource data.
      const data = await ContentComponent.fetchData(
        resourceId,
        req,
        contentData
      );

      return { data };
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

const mapStateToProps = (state: RootState): StateProps => ({
  byAlias: state.byAlias,
  byResource: state.byResource
});

export const config = { amp: 'hybrid' };
export default connect<StateProps, DispatchProps, IContentComponentProxyProps>(
  mapStateToProps
)(ContentProxy); // eslint-disable-line import/no-default-export
