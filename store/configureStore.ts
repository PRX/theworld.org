/**
 * @file configureStore.ts
 */

import { createStore, applyMiddleware, Store } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { reducers } from './reducers';

const { NODE_ENV } = process.env;
const makeStore: MakeStore<Store<RootState>> = () =>
  NODE_ENV === 'development'
    ? createStore(
        reducers,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
      )
    : createStore(reducers, applyMiddleware(thunkMiddleware));

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: false
});
