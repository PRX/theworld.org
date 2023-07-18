/**
 * @file pages/stories/[year]/[month]/[day]/[slug].tsx
 *
 * Episode page.
 */

import { Episode } from '@components/pages/Episode';
import { IContentComponentProxyProps } from '@interfaces';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchEpisodeData } from '@store/actions/fetchEpisodeData';
import { GetServerSideProps } from 'next';

const EpisodePage = ({ data }: IContentComponentProxyProps) => (
  <Episode data={data} />
);

export const getServerSideProps: GetServerSideProps<
  IContentComponentProxyProps
> = async ({ req, params }) => {
  const slug =
    params?.slug &&
    (typeof params.slug === 'string' ? params.slug : params.slug[0]);

  if (slug) {
    const [data, appData] = await Promise.all([
      fetchEpisodeData(slug, 'SLUG'),
      fetchAppData()
    ]);

    if (data) {
      return {
        props: {
          type: 'post--episode',
          id: data.id,
          cookies: req.cookies,
          data,
          appData
        }
      };
    }
  }

  return { notFound: true };
};

export default EpisodePage;
