/**
 * @file pages/stories/[year]/[month]/[day]/[slug].tsx
 *
 * Segment page.
 */

import { Segment } from '@components/pages/Segment';
import { IContentComponentProxyProps } from '@interfaces';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchSegmentData } from '@store/actions/fetchSegmentData';
import { GetServerSideProps } from 'next';

const SegmentPage = ({ data }: IContentComponentProxyProps) => (
  <Segment data={data} />
);

export const getServerSideProps: GetServerSideProps<
  IContentComponentProxyProps
> = async ({ req, params }) => {
  const slug =
    params?.slug &&
    (typeof params.slug === 'string' ? params.slug : params.slug[0]);

  if (slug) {
    const [data, appData] = await Promise.all([
      fetchSegmentData(slug, 'SLUG'),
      fetchAppData()
    ]);

    if (data) {
      return {
        props: {
          type: 'post--segment',
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

export default SegmentPage;
