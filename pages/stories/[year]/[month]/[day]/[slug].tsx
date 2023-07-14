/**
 * @file pages/stories/[year]/[month]/[day]/[slug].tsx
 *
 * Story page.
 */

import { Story } from '@components/pages/Story';
import { IContentComponentProxyProps } from '@interfaces';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchStoryData } from '@store/actions/fetchStoryData';
import { GetServerSideProps } from 'next';

const StoryPage = ({ data }: IContentComponentProxyProps) => (
  <Story data={data} />
);

export const getServerSideProps: GetServerSideProps<
  IContentComponentProxyProps
> = async ({ req, params }) => {
  const slug =
    params?.slug &&
    (typeof params.slug === 'string' ? params.slug : params.slug[0]);

  if (slug) {
    const [data, appData] = await Promise.all([
      fetchStoryData(slug, 'SLUG'),
      fetchAppData()
    ]);

    if (data) {
      return {
        props: {
          type: 'post--story',
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

export default StoryPage;
