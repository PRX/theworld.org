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
const DynamicBio = dynamic(() => import('@components/pages/Bio'));
const DynamicCategory = dynamic(() => import('@components/pages/Category'));
const DynamicEpisode = dynamic(() => import('@components/pages/Episode'));
const DynamicNewsletter = dynamic(() => import('@components/pages/Newsletter'));
const DynamicPage = dynamic(() => import('@components/pages/Page'));
const DynamicProgram = dynamic(() => import('@components/pages/Program'));
const DynamicStory = dynamic(() => import('@components/pages/Story'));
const DynamicTeam = dynamic(() => import('@components/pages/Team'));
const DynamicTerm = dynamic(() => import('@components/pages/Term'));

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

    case 'node--episodes':
      return <DynamicEpisode />;

    case 'node--newsletter_sign_ups':
      return <DynamicNewsletter />;

    case 'node--pages':
      return <DynamicPage />;

    case 'node--people':
      return <DynamicBio />;

    case 'node--programs':
      return <DynamicProgram />;

    case 'node--stories':
      return <DynamicStory />;

    case 'taxonomy_term--categories':
      return <DynamicCategory />;

    case 'taxonomy_term--terms':
      return <DynamicTerm />;

    case 'team':
      return <DynamicTeam />;

    default:
      return <></>;
  }
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ({
    res,
    params: { alias }
  }): Promise<GetServerSidePropsResult<any>> => {
    let resourceId: string;
    let resourceType: string = 'homepage';
    let redirect: string;
    const aliasPath = (alias as string[]).join('/');
    const rgxFileExt = /\.\w+$/;

    if (!rgxFileExt.test(aliasPath)) {
      switch (aliasPath) {
        case 'programs/the-world/team':
          resourceId = 'the_world';
          resourceType = 'team';
          break;

        default: {
          const aliasData = await store.dispatch<any>(
            fetchAliasData(aliasPath)
          );

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
          const data = await store.dispatch(fetchData(resourceId, res));

          await store.dispatch<any>(fetchAppData());

          await store.dispatch<any>(
            fetchCtaRegionGroupData('tw_cta_regions_site')
          );

          res.setHeader(
            'Cache-Control',
            `public, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 5}`
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
    }

    return { notFound: true };
  }
);

export default ContentProxy;
