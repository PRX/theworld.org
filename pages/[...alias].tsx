/**
 * @file index.tsx
 * Exports the Home component.
 */

import type { GetServerSideProps, Redirect } from 'next';
import type { IContentComponentProxyProps } from '@interfaces';
import dynamic from 'next/dynamic';
import { getResourceFetchData } from '@lib/import/fetchData';
import { fetchTwApiQueryAlias } from '@lib/fetch';
import { wrapper } from '@store';
import { fetchAppData } from '@store/actions/fetchAppData';

// Define dynamic component imports.
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
    case 'post--episode':
      return <DynamicEpisode data={data} />;

    case 'post--newsletter':
      return <DynamicNewsletter data={data} />;

    case 'post--page':
      return <DynamicPage data={data} />;

    case 'term--contributor':
      return <DynamicBio data={data} />;

    case 'term--program':
      return <DynamicProgram data={data} />;

    case 'post--segment':
      return <DynamicSegment data={data} />;

    case 'post--story':
      return <DynamicStory data={data} />;

    case 'term--category':
      return <DynamicCategory data={data} />;

    case 'term--tag':
      return <DynamicTerm data={data} />;

    case 'team':
      return <DynamicTeam data={data} />;

    default:
      return null;
  }
};

export const getServerSideProps: GetServerSideProps<IContentComponentProxyProps> =
  wrapper.getServerSideProps((store) => async ({ req, params }) => {
    let resourceType: string | undefined = 'homepage';
    let resourceId: string | undefined;
    let redirect: Redirect | undefined;
    const { alias = [] } = params || {};
    const aliasPath = (alias as string[]).join('/');
    const rgxFileExt = /\.\w+$/;

    if (!rgxFileExt.test(aliasPath)) {
      switch (aliasPath) {
        default: {
          const aliasData = await fetchTwApiQueryAlias(aliasPath);

          // Update resource id and type.
          if (aliasData?.redirectUrl) {
            redirect = {
              permanent: aliasData.type === 'redirect--internal',
              destination: aliasData.redirectUrl
            };
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
          redirect
        };
      }

      // Fetch resource data.
      if (resourceType && resourceId) {
        const fetchData = getResourceFetchData(resourceType);

        if (fetchData) {
          const fetchDataResp = fetchData(resourceId);
          const [data] = await Promise.all([
            typeof fetchDataResp !== 'function'
              ? fetchDataResp
              : store.dispatch(fetchDataResp),
            store.dispatch<any>(fetchAppData(req.cookies))
          ]);

          return {
            props: {
              type: resourceType,
              id: data.id,
              data
            }
          };
        }
      }
    }

    await store.dispatch<any>(fetchAppData(req.cookies));

    return { notFound: true };
  });

export default ContentProxy;
