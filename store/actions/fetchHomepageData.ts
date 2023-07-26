/**
 * @file fetchHomepageData.ts
 *
 * Actions to fetch data for homepage.
 */
import type { AnyAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { RootState } from '@interfaces/state';
import {
  fetchGqlHomepage,
  fetchGqlProgramEpisodes,
  fetchGqlProgramPosts
} from '@lib/fetch';
import { getCollectionData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchHomepageData =
  (): ThunkAction<void, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ) => {
    const type = 'homepage';
    const homepage = await fetchGqlHomepage();

    if (homepage) {
      const state = getState();

      // Get first page of stories.
      const storiesCollection = getCollectionData(
        state,
        type,
        undefined,
        'stories'
      );

      if (!storiesCollection) {
        const exclude = homepage.landingPage?.featuredPosts?.reduce(
          (a, post) => (post ? [...a, post.id] : a),
          []
        );
        const options = {
          ...(exclude && { exclude })
        };
        const posts = await fetchGqlProgramPosts(homepage.id, options);

        if (posts) {
          dispatch(
            appendResourceCollection(posts, type, undefined, 'stories', options)
          );
        }
      }

      // Get first page of episodes.
      const episodesCollection = getCollectionData(
        state,
        type,
        undefined,
        'episodes'
      );

      if (!episodesCollection) {
        const episodes = await fetchGqlProgramEpisodes(homepage.id);

        if (episodes) {
          dispatch(
            appendResourceCollection(episodes, type, undefined, 'episodes')
          );
        }
      }

      return homepage;
    }

    return undefined;
  };
