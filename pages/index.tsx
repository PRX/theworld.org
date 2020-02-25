/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import { NextPageContext } from 'next';
import { useAmp } from 'next/amp';
import Error from 'next/error';

import { IPriApiResource } from 'pri-api-library/types';
import { IContentComponentProxyProps } from '@interfaces/content';
import { fetchPriApiQueryAlias } from '@lib/fetch/api';
import { ContentContext } from '@contexts/ContentContext';
import { importComponent, preloadComponent } from '@lib/import/component';

const ContentProxy = (props: IContentComponentProxyProps) => {
  const { errorCode } = props;
  let output;

  // Render error page.
  if (errorCode) {
    output = <Error statusCode={errorCode} />;
  } else {
    const {
      data,
      data: { type }
    } = props;
    const ContentComponent = importComponent(type);
    const isAmp = useAmp();

    output = (
      <ContentContext.Provider value={{ data, isAmp }}>
        <ContentComponent />
      </ContentContext.Provider>
    );
  }

  return output;
};

ContentProxy.getInitialProps = async (ctx: NextPageContext) => {
  const { query: { alias } } = ctx;
  let resourceId: string | number;
  let resourceType: string = 'homepage';

  // Get data for alias.
  if (alias) {
    const apiResp = await fetchPriApiQueryAlias(alias as string, {
      fields: ['id']
    });

    // Update resource id and type.
    if (apiResp) {
      const { id, type } = apiResp as IPriApiResource;
      resourceId = id;
      resourceType = type;
    }
  }

  // Preload conent compoent.
  const ContentComponent = await preloadComponent(resourceType);

  // Use content comonent to fetch its data.
  if (ContentComponent) {
    const data = await ContentComponent.fetchData(resourceId);

    return { data };
  }

  // There was a problem locating components or data.
  return {
    errorCode: 404
  };
};

export const config = { amp: 'hybrid' };
export default ContentProxy; // eslint-disable-line import/no-default-export

