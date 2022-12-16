/**
 * @file index.tsx
 * Exports the Home component.
 */

import React from 'react';
import { GetServerSidePropsResult } from 'next';
import dynamic from 'next/dynamic';
import crypto from 'crypto';
import { IPriApiResource } from 'pri-api-library/types';
import { IContentComponentProxyProps } from '@interfaces/content';
import { RootState } from '@interfaces/state';
import { fetchAliasData } from '@store/actions/fetchAliasData';
import { wrapper } from '@store';
import { getResourceFetchData } from '@lib/import/fetchData';
import { fetchCtaRegionGroupData } from '@store/actions/fetchCtaRegionGroupData';
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
    async ({
      res,
      req,
      params: { slug }
    }): Promise<GetServerSidePropsResult<any>> => {
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
          store.dispatch<any>({
            type: 'SET_COOKIES',
            payload: {
              cookies: req.cookies
            }
          });

          const data = await store.dispatch(fetchData(resourceId, res));

          await store.dispatch<any>(fetchAppData());

          await store.dispatch<any>(
            fetchCtaRegionGroupData('tw_cta_regions_site')
          );

          res.setHeader(
            'Cache-Control',
            `public, s-maxage=${60 * 60 * 24}, stale-while-revalidate=${60 * 5}`
          );

          return {
            props: {
              type: resourceType,
              id: resourceId,
              dataHash: crypto
                .createHash('sha256')
                .update(JSON.stringify(data))
                .digest('hex')
            }
          };
        }
      }

      return { notFound: true };
    }
);

export default ContentProxy;
