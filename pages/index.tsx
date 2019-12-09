/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import { NextPageContext } from 'next';
import { useAmp } from 'next/amp';
import Error from 'next/error';

import { IPriApiResource } from 'pri-api-library/types';
import { fetchPriApiQueryAlias } from '@lib/fetch/api';
import ContentContext from '@contexts/ContentContext';
import importComponent from '@lib/import/component';

interface IContentProxyProps {
  data?: IPriApiResource,
  errorCode?: number
}

const ContentProxy = (props: IContentProxyProps) => {
  const { errorCode } = props;

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  else {
    const { data, data: { type } } = props;
    const ContentComponent = importComponent(type);
    const isAmp = useAmp();

    return (
      <ContentContext.Provider value={{ data, isAmp }}>
        <ContentComponent/>
      </ContentContext.Provider>
    );
  }
};

ContentProxy.getInitialProps = async (ctx: NextPageContext) => {
  const { req, query: { alias } } = ctx;

  if (alias) {
    const apiResp = await fetchPriApiQueryAlias(
      alias as string,
      { fields: ['id'] }
    );

    if (apiResp) {
      const { id, type } = apiResp as IPriApiResource;
      const ContentComponent = (await importComponent(type).render.preload()).default;
      const data = await ContentComponent.fetchData(id);

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
