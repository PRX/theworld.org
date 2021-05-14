/**
 * @file index.tsx
 * Exports the Home component.
 */

import React, { useEffect } from 'react';
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
  const { errorCode, redirect } = props;
  let output: JSX.Element = <></>;

  if (errorCode) {
    // Render error page.
    output = <Error statusCode={errorCode} />;
  } else if (redirect) {
    useEffect(() => {
      window.location.assign(redirect);
    });
  } else {
    // Render content component.
    const { type, id } = props;
    const ContentComponent = importComponent(type);

    console.log(type, id, ContentComponent);

    output = <ContentComponent id={id} />;
  }

  return !redirect && output;
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
  let redirect: string;

  // Get data for alias.
  if (alias) {
    const aliasPath = (alias as string[]).join('/');

    console.log(alias, aliasPath);

    switch (aliasPath) {
      case '/programs/the-world/team':
        resourceId = 'the_world';
        resourceType = 'team';
        break;

      default: {
        const aliasData = await store.dispatch(fetchAliasData(aliasPath, req));

        console.log(aliasData);

        // Update resource id and type.
        if (aliasData?.type === 'redirect--external') {
          redirect = aliasData.url;
        } else if (aliasData?.id) {
          const { id, type } = aliasData as IPriApiResource;
          resourceId = id as string;
          resourceType = type;
        } else {
          resourceType = null;
        }
        break;
      }
    }
  }

  // Return object with redirect url.
  if (redirect) {
    return { redirect };
  }

  // Preload content component.
  if (resourceType) {
    const ContentComponent = await preloadComponent(resourceType);

    // Use content component to fetch its data.
    if (ContentComponent) {
      // Dispatch action returned from content component fetchData.
      store.dispatch({ type: 'LOADING_CONTENT_DATA' });

      await store.dispatch(ContentComponent.fetchData(resourceId, req));

      store.dispatch({ type: 'LOADING_COMPLETE' });

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

const mapStateToProps = (state: RootState) => state;

export const config = { amp: 'hybrid' };
export default connect<StateProps, DispatchProps, IContentComponentProxyProps>(
  mapStateToProps
)(ContentProxy); // eslint-disable-line import/no-default-export
