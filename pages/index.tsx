/**
 * @file index.tsx
 * Exports the Home component.
 */

import type {
  Homepage as HomepageType,
  IContentComponentProps
} from '@interfaces';
import { Homepage } from '@components/pages/Homepage';
import { wrapper } from '@store/configureStore';
import { fetchHomepageData } from '@store/actions/fetchHomepageData';
import { fetchAppData } from '@store/actions/fetchAppData';

const IndexPage = ({ data }: IContentComponentProps<HomepageType>) => (
  <Homepage data={data} />
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const [data] = await Promise.all([
        store.dispatch<any>(fetchHomepageData()),
        store.dispatch<any>(fetchAppData(req.cookies))
      ]);

      return {
        props: {
          type: 'homepage',
          data
        }
      };
    }
);

export default IndexPage;
