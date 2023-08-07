/**
 * @file fetchContributorData.ts
 *
 * Actions to fetch data for contributor page.
 */
import type { AnyAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { Contributor, RootState } from '@interfaces';
import {
  fetchGqlContributor,
  fetchGqlContributorPosts,
  fetchGqlContributorSegments
} from '@lib/fetch';
import { getCollectionData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchContributorData =
  (
    id: string,
    idType?: string
  ): ThunkAction<Promise<Contributor | undefined>, {}, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ) => {
    const type = 'term--contributor';
    const contributor = await fetchGqlContributor(id, idType);

    if (contributor) {
      const { segments, ...contributorData } = contributor;
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
      //         contributor: id
      //       }
      //     }
      //   } as ICtaFilterProps
      // });

      // Get first page of stories.
      // Has to be synchronous so we known what featured posts to exclude.
      const storiesCollection = getCollectionData(
        state,
        type,
        contributor.id,
        'stories'
      );

      if (!storiesCollection) {
        const exclude = contributor.landingPage?.featuredPosts?.reduce(
          (a, post) => (post ? [...a, post.id] : a),
          []
        );
        const options = {
          ...(exclude && { exclude })
        };
        const posts = await fetchGqlContributorPosts(contributor.id, options);

        if (posts) {
          dispatch(
            appendResourceCollection(
              posts,
              type,
              contributor.id,
              'stories',
              options
            )
          );
        }
      }

      // Add first page of episodes to collections state.
      if (segments) {
        dispatch(
          appendResourceCollection(segments, type, contributor.id, 'segments')
        );

        let { hasNextPage, endCursor } = segments.pageInfo;
        while (hasNextPage && endCursor) {
          // eslint-disable-next-line no-await-in-loop
          const moreSegments = await fetchGqlContributorSegments(
            contributor.id,
            { pageSize: 100, cursor: endCursor }
          );

          if (moreSegments) {
            dispatch(
              appendResourceCollection(
                moreSegments,
                type,
                contributor.id,
                'segments'
              )
            );
          }

          hasNextPage = !!moreSegments?.pageInfo.hasNextPage;
          endCursor = moreSegments?.pageInfo.endCursor;
        }
      }

      // Return everything else as contributor data.
      return contributorData;
    }

    return undefined;
  };
