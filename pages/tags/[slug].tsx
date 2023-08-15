/**
 * @file pages/tags/[slug].tsx
 *
 * Tag page.
 */

import { Term } from '@components/pages/Term';
import { IContentComponentProxyProps } from '@interfaces';
import { wrapper } from '@store';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchTagData } from '@store/actions/fetchTagData';
import { GetServerSideProps } from 'next';

const TagPage = ({ data }: IContentComponentProxyProps) => <Term data={data} />;

export const getServerSideProps: GetServerSideProps<IContentComponentProxyProps> =
  wrapper.getServerSideProps((store) => async ({ req, params }) => {
    const slug =
      params?.slug &&
      (typeof params.slug === 'string' ? params.slug : params.slug[0]);

    if (slug) {
      const dataResponse = fetchTagData(slug, 'SLUG');
      const [data, appData] = await Promise.all([
        store.dispatch<any>(dataResponse),
        fetchAppData()
      ]);

      if (data) {
        return {
          props: {
            type: 'term--tag',
            id: data.id,
            cookies: req.cookies,
            data,
            appData
          }
        };
      }
    }

    return { notFound: true };
  });

export default TagPage;