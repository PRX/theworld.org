/**
 * @file configureStore.ts
 */

import { createStore, applyMiddleware, Store } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { RootState } from '@interfaces/state';
import { reducers } from './reducers';

const makeStore: MakeStore<Store<RootState>> = () =>
  createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: false
});
