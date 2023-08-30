/**
 * @file pages/episodes/[year]/[month]/[day]/[slug].tsx
 *
 * Episode page.
 */

import { Episode } from '@components/pages/Episode';
import { IContentComponentProxyProps } from '@interfaces';
import { wrapper } from '@store/configureStore';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchEpisodeData } from '@store/actions/fetchEpisodeData';

const EpisodePage = ({ data }: IContentComponentProxyProps) => (
  <Episode data={data} />
);

export const getServerSideProps =
  wrapper.getServerSideProps<IContentComponentProxyProps>(
    (store) =>
      async ({ req, params }) => {
        const slug =
          params?.slug &&
          (typeof params.slug === 'string' ? params.slug : params.slug[0]);

        if (slug) {
          const [data] = await Promise.all([
            fetchEpisodeData(slug, 'SLUG'),
            store.dispatch<any>(fetchAppData(req.cookies))
          ]);

          if (data) {
            return {
              props: {
                type: 'post--episode',
                id: data.id,
                data
              }
            };
          }
        }

        return { notFound: true };
      }
  );

export default EpisodePage;
