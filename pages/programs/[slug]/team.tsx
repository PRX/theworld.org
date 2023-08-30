/**
 * @file pages/programs/[slug]/team.tsx
 *
 * Program team page.
 */

import { Team } from '@components/pages/Team';
import { IContentComponentProxyProps } from '@interfaces';
import { wrapper } from '@store/configureStore';
import { fetchAppData } from '@store/actions/fetchAppData';
import { fetchProgramTeamData } from '@store/actions/fetchProgramTeamData';

const ProgramTeamPage = ({ data }: IContentComponentProxyProps) => (
  <Team data={data} />
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
            fetchProgramTeamData(slug, 'SLUG'),
            store.dispatch<any>(fetchAppData(req.cookies))
          ]);

          if (data?.programContributors?.team?.length) {
            return {
              props: {
                type: 'term--program-team',
                id: data.id,
                data
              }
            };
          }
        }

        return { notFound: true };
      }
  );

export default ProgramTeamPage;
