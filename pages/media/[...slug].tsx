/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import { GetServerSidePropsResult } from 'next';
import dynamic from 'next/dynamic';
import { IPriApiResource } from 'pri-api-library/types';
import { IContentComponentProxyProps } from '@interfaces/content';
import { RootState } from '@interfaces/state';
import { fetchAliasData } from '@store/actions/fetchAliasData';
import { wrapper } from '@store';
import { getResourceFetchData } from '@lib/import/fetchData';
import { fetchAppData } from '@store/actions/fetchAppData';

// Define dynamic component imports.
const DynamicAudio = dynamic(() => import('@components/pages/Audio'));
const DynamicImage = dynamic(() => import('@components/pages/Image'));
const DynamicVideo = dynamic(() => import('@components/pages/Video'));

interface StateProps extends RootState {}

type Props = StateProps & IContentComponentProxyProps;

const ContentProxy = ({ type }: Props) => {
  switch (type) {
    case 'file--audio':
      return <DynamicAudio />;

    case 'file--images':
      return <DynamicImage />;

    case 'file--videos':
      return <DynamicVideo />;

    default:
      return null;
  }
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ res, req, params }): Promise<GetServerSidePropsResult<any>> => {
      const { slug } = params || {};
      let resourceId: string | null | undefined;
      let resourceType: string | null = 'homepage';
      let redirect: string | undefined;
      const aliasPath = ['media', ...(slug as string[])];

      let aliasData = await store.dispatch<any>(
        fetchAliasData(aliasPath.join('/'))
      );

      if (!aliasData?.type) {
        aliasPath[0] = 'file';
        aliasData = await store.dispatch<any>(
          fetchAliasData(aliasPath.join('/'))
        );
        if (aliasData) {
          // Update media alias with file alias data.
          store.dispatch<any>({
            type: 'FETCH_ALIAS_DATA_SUCCESS',
            alias: `media/${aliasPath.slice(1)}`,
            data: aliasData
          });
        }
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
          const [data] = await Promise.all([
            store.dispatch(fetchData(resourceId, res)),
            store.dispatch<any>(fetchAppData(req.cookies))
          ]);

          return {
            props: {
              type: resourceType,
              id: resourceId,
              data
            }
          };
        }
      }

      return { notFound: true };
    }
);

export default ContentProxy;
