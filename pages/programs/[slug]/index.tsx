/**
 * @file pages/programs/[slug]/index.tsx
 *
 * Program page.
 */

import { Program } from '@components/pages/Program';
import { IContentComponentProxyProps } from '@interfaces';
import { wrapper } from '@store';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchProgramData } from '@store/actions/fetchProgramData';
import { GetServerSideProps } from 'next';

const ProgramPage = ({ data }: IContentComponentProxyProps) => (
  <Program data={data} />
);

export const getServerSideProps: GetServerSideProps<IContentComponentProxyProps> =
  wrapper.getServerSideProps((store) => async ({ req, params }) => {
    const slug =
      params?.slug &&
      (typeof params.slug === 'string' ? params.slug : params.slug[0]);

    if (slug) {
      const dataResponse = fetchProgramData(slug, 'SLUG');
      const [data] = await Promise.all([
        store.dispatch<any>(dataResponse),
        store.dispatch<any>(fetchAppData(req.cookies))
      ]);

      if (data) {
        return {
          props: {
            type: 'term--program',
            id: data.id,
            data
          }
        };
      }
    }

    return { notFound: true };
  });

export default ProgramPage;
