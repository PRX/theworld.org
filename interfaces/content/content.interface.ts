/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import { FunctionComponent } from 'react';
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface FetchDataFunc {
  // eslint-disable-next-line no-unused-vars
  (id: number, req: IncomingMessage): ThunkAction<void, {}, {}, AnyAction>;
}

export interface IContentComponent extends FunctionComponent {
  fetchData: FetchDataFunc;
}

export interface IContentComponentProps<D> {
  data: D;
}

export interface IContentComponentProxyProps {
  type?: string;
  id?: string | number;
  errorCode?: number;
  redirect?: string;
  data?: any;
  cookies?: any;
}

export interface IContentContext {
  type: string;
  id?: number;
}

export interface IContent {
  id: number;
  type: string;
  link: string;
  [k: string]: any;
}
