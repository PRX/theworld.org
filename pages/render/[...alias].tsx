/**
 * @file index.tsx
 * Exports the Home component.
 */

import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { GetStaticPropsResult } from 'next';
import dynamic from 'next/dynamic';
import { Url } from 'url';
import {
  IPriApiCollectionResponse,
  IPriApiResource,
  IPriApiResourceResponse
} from 'pri-api-library/types';
import { IContentComponentProxyProps } from '@interfaces/content';
import { RootState } from '@interfaces/state';
import { fetchAliasData } from '@store/actions/fetchAliasData';
import { fetchAppData } from '@store/actions/fetchAppData';
import { wrapper } from '@store';
import { fetchApp, fetchHomepage, fetchTeam } from '@lib/fetch';
import { generateLinkHrefForContent } from '@lib/routing';
import { getResourceFetchData } from '@lib/import/fetchData';
import { fetchCtaData } from '@store/actions/fetchCtaData';

// Define dynamic component imports.
const DynamicAudio = dynamic(() => import('@components/pages/Audio'));
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

export const getStaticProps = wrapper.getStaticProps(
  store => async ({
    params: { alias }
  }): Promise<GetStaticPropsResult<any>> => {
    let resourceId: string;
    let resourceType: string = 'homepage';
    let redirect: string;
    const aliasPath = (alias as string[]).join('/');

    switch (aliasPath) {
      case 'programs/the-world/team':
        resourceId = 'the_world';
        resourceType = 'team';
        break;

      default: {
        const aliasData = await store.dispatch<any>(fetchAliasData(aliasPath));

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
        await Promise.all([
          // Fetch App data (latest stories, menus, etc.)
          store.dispatch<any>(fetchAppData()),
          // Use resources fetch func to fetch its data.
          store.dispatch(fetchData(resourceId))
        ]);

        return { props: { type: resourceType, id: resourceId } };
      }
    }

    return { notFound: true };
  }
);

export const getStaticPaths = async () => {
  const [homepage, app, team] = await Promise.all([
    fetchHomepage().then((resp: IPriApiResourceResponse) => resp && resp.data),
    fetchApp(),
    fetchTeam('the_world').then(
      (resp: IPriApiCollectionResponse) => resp && resp.data
    )
  ]);
  const {
    featuredStory,
    featuredStories,
    stories,
    episodes,
    latestStories,
    ...program
  } = homepage;
  const { latestStories: latestAppStories, menus } = app;
  const resources = [
    program,
    featuredStory,
    ...featuredStories,
    ...stories.data,
    ...episodes.data,
    ...episodes.data.reduce(
      (acc: any, { audio }) => [
        ...acc,
        ...(audio?.segments ? [...audio.segments] : [])
      ],
      [] as any[]
    ),
    ...latestStories.data,
    ...latestAppStories.data,
    ...team,
    ...[featuredStory, ...featuredStories, ...stories.data]
      .map(story => story.primaryCategory)
      .filter(v => !!v)
  ];
  const paths = [
    ...resources.map(resource => ({
      params: {
        alias: generateLinkHrefForContent(resource)
          ?.pathname.slice(1)
          .split('/')
      }
    })),
    ...Object.values(menus)
      // Gather all memus' url's into one array.
      .reduce((a, m) => [...a, ...m.map(({ url }) => url)], [] as Url[])
      // Filter out any external url's.
      .filter(
        ({ hostname }) =>
          !hostname || /^(www\.)?(pri|theworld)\.org$/.test(hostname)
      )
      .map(({ pathname }) => ({
        params: {
          alias: pathname.slice(1).split('/')
        }
      }))
  ].filter(({ params: { alias } }) => !!alias.filter(s => !!s.length).length);

  return { paths, fallback: 'blocking' };
};

export default ContentProxy;
