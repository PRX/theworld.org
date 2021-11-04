/**
 * @file index.tsx
 * Exports the Home component.
 */

import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { GetStaticPropsResult } from 'next';
import dynamic from 'next/dynamic';
import {
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { IContentComponentProxyProps } from '@interfaces/content';
import { RootState } from '@interfaces/state';
import { fetchAliasData } from '@store/actions/fetchAliasData';
import { fetchAppData } from '@store/actions/fetchAppData';
import { wrapper } from '@store';
import { fetchHomepage } from '@lib/fetch';
import { generateLinkHrefForContent } from '@lib/routing';
import { getResourceFetchData } from '@lib/import/fetchData';
import { fetchCtaData } from '@store/actions/fetchCtaData';

// Define dynamic component imports.
const DynamicAudio = dynamic(() => import('@components/pages/Audio'));

interface StateProps extends RootState {}

type Props = StateProps & IContentComponentProxyProps;

const ContentProxy = ({ type, id }: Props) => {
  const store = useStore();

  useEffect(() => {
    // Fetch CTA messages for this resource.
    (async () => {
      await store.dispatch<any>(fetchCtaData(type, id));
    })();
  }, [type, id]);

  switch (type) {
    case 'file--audio':
      return <DynamicAudio />;

    default:
      return <></>;
  }
};

export const getStaticProps = wrapper.getStaticProps(
  store => async ({ params: { slug } }): Promise<GetStaticPropsResult<any>> => {
    let resourceId: string;
    let resourceType: string = 'homepage';
    let redirect: string;
    const aliasPath = ['file', ...(slug as string[])].join('/');

    const aliasData = await store.dispatch<any>(fetchAliasData(aliasPath));

    // Update resource id, type. or redirect.
    if (aliasData?.type === 'redirect--external') {
      redirect = aliasData.url;
    } else if (aliasData?.id) {
      const { id, type } = aliasData as IPriApiResource;
      resourceId = id as string;
      resourceType = type;
    } else {
      resourceType = null;
    }

    // Return object with redirect url.
    if (redirect) {
      return {
        redirect: {
          permanent: false,
          destination: redirect
        }
      };
    }

    // Fetch resource data.
    if (resourceType) {
      const fetchData = getResourceFetchData(resourceType);

      if (fetchData) {
        await Promise.all([
          // Fetch App data (latest stories, menus, etc.)
          store.dispatch<any>(fetchAppData()),
          // Use resources fetch func to fetch its data.
          store.dispatch(fetchData(resourceId))
        ]);

        return {
          props: { type: resourceType, id: resourceId },
          revalidate: 10
        };
      }
    }

    return { notFound: true };
  }
);

export const getStaticPaths = async () => {
  const [homepage] = await Promise.all([
    fetchHomepage().then((resp: IPriApiResourceResponse) => resp && resp.data)
  ]);
  const { episodes } = homepage;
  const resources = [
    ...episodes.data
      .reduce(
        (acc: IPriApiResource[], { audio }) => [
          ...acc,
          ...((audio?.segments ? [...audio.segments] : []) as IPriApiResource[])
        ],
        [] as IPriApiResource[]
      )
      .filter((item: IPriApiResource) => item.type === 'file--audio')
  ];
  const paths = [
    ...resources.map(resource => ({
      params: {
        slug: generateLinkHrefForContent(resource)
          ?.pathname.replace(/^\/?file\//, '')
          .split('/')
      }
    }))
  ].filter(({ params: { slug } }) => !!slug?.join('/').length);

  return { paths, fallback: 'blocking' };
};

export default ContentProxy;
