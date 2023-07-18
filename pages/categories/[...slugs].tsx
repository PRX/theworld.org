/**
 * @file pages/categories/[slug].tsx
 *
 * Category page.
 */

import { Category } from '@components/pages/Category';
import { IContentComponentProxyProps } from '@interfaces';
import { wrapper } from '@store';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchCategoryData } from '@store/actions/fetchCategoryData';
import { GetServerSideProps } from 'next';

const CategoryPage = ({ data }: IContentComponentProxyProps) => (
  <Category data={data} />
);

export const getServerSideProps: GetServerSideProps<IContentComponentProxyProps> =
  wrapper.getServerSideProps((store) => async ({ req, params }) => {
    const slug =
      params?.slugs &&
      (typeof params.slugs === 'string' ? params.slugs : params.slugs.pop());

    if (slug) {
      const dataResponse = fetchCategoryData(slug, 'SLUG');
      const [data, appData] = await Promise.all([
        store.dispatch<any>(dataResponse),
        fetchAppData()
      ]);

      if (data) {
        return {
          props: {
            type: 'term--category',
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

export default CategoryPage;
