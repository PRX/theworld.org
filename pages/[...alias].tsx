/**
 * @file index.tsx
 * Exports the Home component.
 */

import type { GetServerSideProps } from 'next';
import type { IContentComponentProxyProps } from '@interfaces';
import dynamic from 'next/dynamic';
import { getResourceFetchData } from '@lib/import/fetchData';
import { fetchTwApiQueryAlias } from '@lib/fetch';
import { fetchAppData } from '@store/actions/fetchAppData';
// import { fetchCtaRegionGroupData } from '@store/actions/fetchCtaRegionGroupData';
// import { fetchAppData } from '@store/actions/fetchAppData';

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
const DynamicSegment = dynamic(() => import('@components/pages/Segment'));
const DynamicStory = dynamic(() => import('@components/pages/Story'));
const DynamicTeam = dynamic(() => import('@components/pages/Team'));
const DynamicTerm = dynamic(() => import('@components/pages/Term'));

type Props = IContentComponentProxyProps;

const ContentProxy = ({ type, data }: Props) => {
  switch (type) {
    case 'file--audio':
      return <DynamicAudio />;

    case 'file--images':
      return <DynamicImage />;

    case 'file--videos':
      return <DynamicVideo />;

    case 'post--episode':
    case 'node--episodes':
      return <DynamicEpisode data={data} />;

    case 'node--newsletter_sign_ups':
      return <DynamicNewsletter />;

    case 'post--page':
    case 'node--pages':
      return <DynamicPage data={data} />;

    case 'term--contributor':
    case 'node--people':
      return <DynamicBio data={data} />;

    case 'term--program':
    case 'node--programs':
      return <DynamicProgram />;

    case 'post--segment':
      return <DynamicSegment data={data} />;

    case 'post--story':
    case 'node--stories':
      return <DynamicStory data={data} />;

    case 'term--category':
    case 'taxonomy_term--categories':
      return <DynamicCategory data={data} />;

    case 'term--tag':
    case 'taxonomy_term--terms':
      return <DynamicTerm />;

    case 'team':
      return <DynamicTeam />;

    default:
      return null;
  }
};

export const getServerSideProps: GetServerSideProps<
  IContentComponentProxyProps
> = async ({ req, params }) => {
  let resourceType: string | undefined = 'homepage';
  let resourceId: string | undefined;
  let redirect: string | undefined;
  const { alias = [] } = params || {};
  const aliasPath = (alias as string[]).join('/');
  const rgxFileExt = /\.\w+$/;

  if (!rgxFileExt.test(aliasPath)) {
    switch (aliasPath) {
      case 'programs/the-world/team':
        resourceId = 'the_world';
        resourceType = 'team';
        break;

      default: {
        const aliasData = await fetchTwApiQueryAlias(aliasPath);

        // Update resource id and type.
        if (aliasData?.url) {
          redirect = aliasData.url;
        } else if (aliasData?.id) {
          const { id, type } = aliasData;
          resourceId = id;
          resourceType = type;
        } else {
          resourceType = undefined;
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

      if (fetchData && resourceId) {
        const [data, appData] = await Promise.all([
          fetchData(resourceId),
          fetchAppData()
        ]);

        // await store.dispatch<any>(fetchAppData());

        // await store.dispatch<any>(
        //   fetchCtaRegionGroupData('tw_cta_regions_site')
        // );

        return {
          props: {
            type: resourceType,
            id: resourceId,
            cookies: req.cookies,
            data,
            appData
          }
        };
      }
    }
  }

  return { notFound: true };
};

export default ContentProxy;
