/**
 * @file pages/programs/[slug]/team.tsx
 *
 * Program team page.
 */

import { Team } from '@components/pages/Team';
import { IContentComponentProxyProps } from '@interfaces';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchProgramTeamData } from '@store/actions/fetchProgramTeamData';
import { GetServerSideProps } from 'next';

const ProgramTeamPage = ({ data }: IContentComponentProxyProps) => (
  <Team data={data} />
);

export const getServerSideProps: GetServerSideProps<
  IContentComponentProxyProps
> = async ({ req, params }) => {
  const slug =
    params?.slug &&
    (typeof params.slug === 'string' ? params.slug : params.slug[0]);

  if (slug) {
    const [data, appData] = await Promise.all([
      fetchProgramTeamData(slug, 'SLUG'),
      fetchAppData()
    ]);

    if (data?.programContributors?.team?.length) {
      return {
        props: {
          type: 'term--program-team',
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

export default ProgramTeamPage;
