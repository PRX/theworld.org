/**
 * @file fetchHomepageData.ts
 *
 * Actions to fetch data for homepage.
 */
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { fetchApiTeam } from '@lib/fetch/api';
import { getCollectionData } from '@store/reducers';
import { appendResourceCollection } from './appendResourceCollection';

export const fetchTeamData = (
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
): Promise<void> => {
  const state = getState();
  const type = 'team';
  const id = 'the_world';
  const dataCheck = getCollectionData(state, type, id, 'members');

  if (!dataCheck) {
    dispatch({
      type: 'FETCH_TEAM_DATA_REQUEST'
    });

    const apiResp = await fetchApiTeam(req);
    const { teamMembers } = apiResp;

    dispatch(appendResourceCollection(teamMembers, type, id, 'members'));

    dispatch({
      type: 'FETCH_TEAM_DATA_SUCCESS'
    });
  }
};
