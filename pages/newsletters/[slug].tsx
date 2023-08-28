/**
 * @file pages/newsletters/[slug].tsx
 *
 * Newsletter page.
 */

import { Newsletter } from '@components/pages/Newsletter';
import { IContentComponentProxyProps } from '@interfaces';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchNewsletterData } from '@store/actions/fetchNewsletterData';
import { GetServerSideProps } from 'next';

const NewsletterPage = ({ data }: IContentComponentProxyProps) => (
  <Newsletter data={data} />
);

export const getServerSideProps: GetServerSideProps<
  IContentComponentProxyProps
> = async ({ req, params }) => {
  const slug =
    params?.slug &&
    (typeof params.slug === 'string' ? params.slug : params.slug[0]);

  if (slug) {
    const [data, appData] = await Promise.all([
      fetchNewsletterData(slug, 'SLUG'),
      fetchAppData()
    ]);

    if (data) {
      return {
        props: {
          type: 'post--newsletter',
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

export default NewsletterPage;
