/**
 * @file pages/stories/[year]/[month]/[day]/[slug].tsx
 *
 * Segment page.
 */

import { Segment } from '@components/pages/Segment';
import { IContentComponentProxyProps } from '@interfaces';
import { wrapper } from '@store/configureStore';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchSegmentData } from '@store/actions/fetchSegmentData';

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
            fetchSegmentData(slug, 'SLUG'),
            store.dispatch<any>(fetchAppData(req.cookies))
          ]);

          if (data) {
            return {
              props: {
                type: 'post--segment',
                id: data.id,
                data
              }
            };
          }
        }

        return { notFound: true };
      }
  );

export default SegmentPage;
