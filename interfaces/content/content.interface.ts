/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import { FunctionComponent } from 'react';
import { IPriApiResource } from 'pri-api-library/types';

export interface FetchDataFunc {
  (id?: number | string): object;
}

export interface IContentComponent extends FunctionComponent {
  fetchData: FetchDataFunc;
}

export interface IContentComponentProxyProps {
  data?: IPriApiResource;
  context?: string[];
  errorCode?: number;
}
