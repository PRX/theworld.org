/**
 * @file pages/stories/[year]/[month]/[day]/[slug].tsx
 *
 * Story page.
 */

import type { IContentComponentProxyProps } from '@interfaces';
import { Story } from '@components/pages/Story';
import { fetchAppData } from '@store/actions/fetchAppData';
import { wrapper } from '@store/configureStore';
import { fetchStoryData } from '@store/actions/fetchStoryData';

const StoryPage = ({ data }: IContentComponentProxyProps) => (
  <Story data={data} />
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
            fetchStoryData(slug, 'SLUG'),
            store.dispatch<any>(fetchAppData(req.cookies))
          ]);

          if (data) {
            return {
              props: {
                type: 'post--story',
                id: data.id,
                data
              }
            };
          }
        }

        return { notFound: true };
      }
  );

export default StoryPage;
