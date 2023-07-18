/**
 * @file pages/programs/[slug].tsx
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
      const [data, appData] = await Promise.all([
        store.dispatch<any>(dataResponse),
        fetchAppData()
      ]);

      if (data) {
        return {
          props: {
            type: 'post--program',
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

export default ProgramPage;
