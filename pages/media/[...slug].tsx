/**
 * @file index.tsx
 * Exports the Home component.
 */

import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { GetStaticPropsResult } from 'next';
import dynamic from 'next/dynamic';
import crypto from 'crypto';
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
import { getDataByResource } from '@store/reducers';

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
    const aliasPath = ['media', ...(slug as string[])];

    let aliasData = await store.dispatch<any>(
      fetchAliasData(aliasPath.join('/'))
    );

    if (!aliasData?.type) {
      aliasPath[0] = 'file';
      aliasData = await store.dispatch<any>(
        fetchAliasData(aliasPath.join('/'))
      );
    }

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

        const data = getDataByResource(
          store.getState(),
          resourceType,
          resourceId
        );

        return {
          props: {
            type: resourceType,
            id: resourceId,
            dataHash: crypto
              .createHash('sha256')
              .update(JSON.stringify(data))
              .digest('hex')
          },
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
    ...resources
      .map(resource => ({
        params: {
          slug: generateLinkHrefForContent(resource)?.pathname
        }
      }))
      .filter(({ params: { slug } }) => !!slug?.length)
      .map(({ params: { slug } }) => ({
        params: {
          slug: slug?.split('/').slice(1)
        }
      }))
  ];

  return { paths, fallback: 'blocking' };
};

export default ContentProxy;
