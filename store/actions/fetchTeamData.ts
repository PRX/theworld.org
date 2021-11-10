/**
 * @file fetchHomepageData.ts
 *
 * Actions to fetch data for homepage.
 */

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPriApiCollectionResponse } from 'pri-api-library/types';
import { RootState } from '@interfaces/state';
import { fetchApiTeam, fetchTeam } from '@lib/fetch';
import { getCollectionData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchTeamData = (): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<any> => {
  const state = getState();
  const type = 'team';
  const id = 'the_world';
  const isOnServer = typeof window === 'undefined';
  const dataCheck = getCollectionData(state, type, id, 'members');

  if (!dataCheck || isOnServer) {
    dispatch({
      type: 'FETCH_TEAM_DATA_REQUEST'
    });

    const teamMembers = await (isOnServer
      ? fetchTeam(id)
      : fetchApiTeam()
    ).then((resp: IPriApiCollectionResponse) => resp);

    dispatch(appendResourceCollection(teamMembers, type, id, 'members'));

    dispatch({
      type: 'FETCH_TEAM_DATA_SUCCESS'
    });

    return { ...teamMembers };
  }

  return { ...dataCheck };
};
