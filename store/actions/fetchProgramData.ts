/**
 * @file fetchProgramData.ts
 *
 * Actions to fetch data for program page.
 */
import type { AnyAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { Program, RootState } from '@interfaces';
import { fetchGqlProgram, fetchGqlProgramPosts } from '@lib/fetch';
import { getCollectionData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchProgramData =
  (
    id: string,
    idType?: string
  ): ThunkAction<Promise<Program | undefined>, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ) => {
    const type = 'term--program';
    const program = await fetchGqlProgram(id, idType);

    if (program) {
      const { episodes, ...programData } = program;
      const state = getState();

      // const ctaDataPromise = dispatch<any>(
      //   fetchCtaRegionGroupData('tw_cta_regions_landing')
      // );

      // // Set CTA filter props.
      // dispatch({
      //   type: 'SET_RESOURCE_CTA_FILTER_PROPS',
      //   payload: {
      //     filterProps: {
      //       type,
      //       id,
      //       props: {
      //         program: id
      //       }
      //     }
      //   } as ICtaFilterProps
      // });

      // Get first page of stories.
      // Has to be synchronous so we known what featured posts to exclude.
      const storiesCollection = getCollectionData(
        state,
        type,
        program.id,
        'stories'
      );

      if (!storiesCollection) {
        const exclude = program.landingPage?.featuredPosts?.reduce(
          (a, post) => (post ? [...a, post.id] : a),
          []
        );
        const options = {
          ...(exclude && { exclude })
        };
        const posts = await fetchGqlProgramPosts(program.id, options);

        if (posts) {
          dispatch(
            appendResourceCollection(
              posts,
              type,
              program.id,
              'stories',
              options
            )
          );
        }
      }

      // Add first page of episodes to collections state.
      if (episodes) {
        dispatch(
          appendResourceCollection(episodes, type, program.id, 'episodes')
        );
      }

      // Return everything else as program data.
      return programData;
    }

    return undefined;
  };
