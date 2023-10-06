/**
 * @file pages/stories/[year]/[month]/[day]/[slug].tsx
 *
 * Story page.
 */

import { PostIdType, type IContentComponentProxyProps } from '@interfaces';
import { Story } from '@components/pages/Story';
import { fetchAppData } from '@store/actions/fetchAppData';
import { wrapper } from '@store/configureStore';
import { fetchStoryData } from '@store/actions/fetchStoryData';
import { generateShareLinks } from '@lib/generate/social';

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
            fetchStoryData(slug, PostIdType.Slug),
            store.dispatch<any>(fetchAppData(req.cookies))
          ]);

          if (data) {
            const { link, title } = data;
            const shareLinks =
              link != null ? generateShareLinks(link, title) : undefined;

            return {
              props: {
                type: 'post--story',
                id: data.id,
                ...(shareLinks && { shareLinks }),
                data
              }
            };
          }
        }

        return { notFound: true };
      }
  );

export default StoryPage;
