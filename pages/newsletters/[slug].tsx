/**
 * @file pages/newsletters/[slug].tsx
 *
 * Newsletter page.
 */

import { Newsletter } from '@components/pages/Newsletter';
import { IContentComponentProxyProps } from '@interfaces';
import { wrapper } from '@store/configureStore';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchNewsletterData } from '@store/actions/fetchNewsletterData';

const NewsletterPage = ({ data }: IContentComponentProxyProps) => (
  <Newsletter data={data} />
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
            fetchNewsletterData(slug, 'SLUG'),
            store.dispatch<any>(fetchAppData(req.cookies))
          ]);

          if (data) {
            return {
              props: {
                type: 'post--newsletter',
                id: data.id,
                data
              }
            };
          }
        }

        return { notFound: true };
      }
  );

export default NewsletterPage;
