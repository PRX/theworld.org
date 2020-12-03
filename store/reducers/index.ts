import { combineReducers } from 'redux';
import * as fromByAlias from './byAlias';
import * as fromByResource from './byResource';

export const reducers = combineReducers({
  byAlias: fromByAlias.byAlias,
  byResource: fromByResource.byResource
});
