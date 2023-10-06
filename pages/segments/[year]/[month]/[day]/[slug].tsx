/**
 * @file pages/stories/[year]/[month]/[day]/[slug].tsx
 *
 * Segment page.
 */

import { Segment } from '@components/pages/Segment';
import { IContentComponentProxyProps, SegmentIdType } from '@interfaces';
import { wrapper } from '@store/configureStore';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchSegmentData } from '@store/actions/fetchSegmentData';
import { generateShareLinks } from '@lib/generate/social';

const SegmentPage = ({ data }: IContentComponentProxyProps) => (
  <Segment data={data} />
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
            fetchSegmentData(slug, SegmentIdType.Slug),
            store.dispatch<any>(fetchAppData(req.cookies))
          ]);

          if (data) {
            const { link, title } = data;
            const shareLinks =
              link != null ? generateShareLinks(link, title) : undefined;

            return {
              props: {
                type: 'post--segment',
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

export default SegmentPage;
