/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import { FunctionComponent } from 'react';
import { IncomingMessage } from 'http';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IPriApiResource } from 'pri-api-library/types';

export interface FetchDataFunc {
  // eslint-disable-next-line no-unused-vars
  (id: string, req: IncomingMessage): ThunkAction<void, {}, {}, AnyAction>;
}

export interface IContentComponent extends FunctionComponent {
  fetchData: FetchDataFunc;
}

export interface IContentComponentProps {
  id: string;
  data?: IPriApiResource;
}

export interface IContentComponentProxyProps {
  type?: string;
  id?: string;
  errorCode?: number;
  redirect?: string;
}

export interface IContentContext {
  type: string;
  id?: string;
}
