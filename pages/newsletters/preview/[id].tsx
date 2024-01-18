/**
 * @file pages/newsletters/[slug].tsx
 *
 * Newsletter page.
 */

import { Newsletter } from '@components/pages/Newsletter';
import { IContentComponentProxyProps, NewsletterIdType } from '@interfaces';
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
        const id =
          params?.id &&
          (typeof params.id === 'string' ? params.id : params.id[0]);
        const { wp_can_preview: authToken, ...cookies } = req?.cookies || {};

        if (id) {
          const [data] = await Promise.all([
            fetchNewsletterData(id, NewsletterIdType.DatabaseId, authToken),
            store.dispatch<any>(fetchAppData(cookies))
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
