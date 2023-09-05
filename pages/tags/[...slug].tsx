/**
 * @file pages/tags/[taxonomySlug]/[tagSlug].tsx
 *
 * Tag page.
 */

import { Term } from '@components/pages/Term';
import { IContentComponentProxyProps } from '@interfaces';
import { taxonomySlugToSingularName } from '@lib/map/taxonomy';
import { wrapper } from '@store';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchTagData } from '@store/actions/fetchTagData';
import { GetServerSideProps } from 'next';

const TagPage = ({ data }: IContentComponentProxyProps) => <Term data={data} />;

export const getServerSideProps: GetServerSideProps<IContentComponentProxyProps> =
  wrapper.getServerSideProps((store) => async ({ req, params }) => {
    const slugs =
      (params?.slug &&
        (typeof params.slug === 'string' ? [params.slug] : params.slug)) ||
      undefined;
    const slug = slugs?.pop();
    const taxonomySingleName =
      slugs && taxonomySlugToSingularName.get(slugs.join('/'));

    if (slug) {
      const dataResponse = fetchTagData(slug, 'SLUG', taxonomySingleName);
      const [data] = await Promise.all([
        store.dispatch<any>(dataResponse),
        store.dispatch<any>(fetchAppData(req.cookies))
      ]);

      if (data) {
        return {
          props: {
            type: 'term--tag',
            id: data.id,
            data
          }
        };
      }
    }

    return { notFound: true };
  });

export default TagPage;
