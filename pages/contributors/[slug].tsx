/**
 * @file pages/contributors/[slug].tsx
 *
 * Contributor page.
 */

import { Bio } from '@components/pages/Bio';
import { IContentComponentProxyProps } from '@interfaces';
import { wrapper } from '@store';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchContributorData } from '@store/actions/fetchContributorData';
import { GetServerSideProps } from 'next';

const ContributorPage = ({ data }: IContentComponentProxyProps) => (
  <Bio data={data} />
);

export const getServerSideProps: GetServerSideProps<IContentComponentProxyProps> =
  wrapper.getServerSideProps((store) => async ({ req, params }) => {
    const slug =
      params?.slug &&
      (typeof params.slug === 'string' ? params.slug : params.slug[0]);

    if (slug) {
      const dataResponse = fetchContributorData(slug, 'SLUG');
      const [data] = await Promise.all([
        store.dispatch<any>(dataResponse),
        store.dispatch<any>(fetchAppData(req.cookies))
      ]);

      if (data) {
        return {
          props: {
            type: 'term--contributor',
            id: data.id,
            data
          }
        };
      }
    }

    return { notFound: true };
  });

export default ContributorPage;
