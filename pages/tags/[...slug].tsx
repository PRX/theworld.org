/**
 * @file pages/tags/[taxonomySlug]/[tagSlug].tsx
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

const taxonomySlugToSingularName = new Map<string, string>();
taxonomySlugToSingularName.set('cities', 'city');
taxonomySlugToSingularName.set('continents', 'continent');
taxonomySlugToSingularName.set('countries', 'country');
taxonomySlugToSingularName.set('people', 'person');
taxonomySlugToSingularName.set('provinces_or_states', 'provinceOrState');
taxonomySlugToSingularName.set('regions', 'region');
taxonomySlugToSingularName.set('social_tags', 'socialTag');

export const getServerSideProps: GetServerSideProps<IContentComponentProxyProps> =
  wrapper.getServerSideProps((store) => async ({ req, params }) => {
    const [taxonomySlug, slug] =
      (params?.slug &&
        (typeof params.slug === 'string'
          ? [undefined, params.slug]
          : params.slug)) ||
      [];
    const taxonomySingleName =
      taxonomySlug && taxonomySlugToSingularName.get(taxonomySlug);

    if (slug) {
      const dataResponse = fetchTagData(slug, 'SLUG', taxonomySingleName);
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
