/**
 * @file index.tsx
 * Exports the Home component.
 */

import React, { Component, ComponentType } from 'react';
import { NextPageContext } from 'next';
import { useAmp } from 'next/amp';
import Error from 'next/error';

import { IPriApiResource, PriApiResourceResponse } from 'pri-api-library/types';
import { fetchPriApiQueryAlias, fetchPriApiItem } from '@lib/fetch';
import ContentContext from '@contexts/ContentContext';
import importResourceComponent from '@lib/import/component';

interface IContentProxyProps {
  data?: IPriApiResource,
  ContentComponent?: ComponentType,
  errorCode?: number
}

const ContentProxy = (props: IContentProxyProps) => {
  const { data, data: { type }, errorCode } = props;
  const isAmp = useAmp();

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  else {
    const ContentComponent = importResourceComponent(type);

    return (
      <ContentContext.Provider value={{ data, isAmp }}>
        <ContentComponent/>
      </ContentContext.Provider>
    );
  }
};

ContentProxy.getInitialProps = async (ctx: NextPageContext) => {
  const { query: { alias } } = ctx;

  if (alias) {
    const apiResp = await fetchPriApiQueryAlias(
      alias as string,
      { fields: ['id'] }
    );

    if (apiResp) {
      const { id, type } = apiResp as IPriApiResource;
      const data = await fetchPriApiItem(type, id);

      return { data };
    }
  }
  else {
    // TODO: Get Homepage data.
    return {
      data: {
        type: 'homepage',
        links: [
          {
            label: 'These Chilean women joined thousands suing for discriminatory health insurance. Can reforms fix it?',
            href: {
              pathname: '/',
              query: {
                alias: '/stories/2019-08-28/thousands-chilean-women-sued-discriminatory-health-insurance-can-reforms-fix-it'
              }
            }
          },
          {
            label: 'In lead-up to Colombian elections, woman mayoral candidate is latest assassination victim',
            href: {
              pathname: '/',
              query: {
                alias: '/stories/2019-09-06/lead-colombian-elections-woman-mayoral-candidate-latest-assassination-victim'
              }
            }
          },
          {
            label: 'Folk trio The Young\'uns uses music to question British patriotism',
            href: {
              pathname: '/',
              query: {
                alias: '/stories/2019-09-06/folk-trio-younguns-uses-music-question-british-patriotism'
              }
            }
          }
        ]
      }
    };
  }

  // There was a problem locating components or data.
  return {
    errorCode: 404
  };

};

export const config = { amp: 'hybrid' }
export default ContentProxy;
