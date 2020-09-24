/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import { NextPageContext } from 'next';
import Error from 'next/error';

import { IPriApiResource } from 'pri-api-library/types';
import { IContentComponentProxyProps } from '@interfaces/content';
import { fetchApiQueryAlias } from '@lib/fetch/api';
import { ContentContext } from '@contexts/ContentContext';
import { importComponent, preloadComponent } from '@lib/import/component';

const ContentProxy = (props: IContentComponentProxyProps) => {
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
    query: { alias }
  } = ctx;
  let resourceId: string | number;
  let resourceType: string = 'homepage';

  // Get data for alias.
  if (alias) {
    const apiResp = await fetchApiQueryAlias(alias as string, req);

    // Update resource id and type.
    if (apiResp?.id) {
      const { id, type } = apiResp as IPriApiResource;
      resourceId = id;
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
      const data = await ContentComponent.fetchData(resourceId, req);

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

export const config = { amp: 'hybrid' };
export default ContentProxy; // eslint-disable-line import/no-default-export
