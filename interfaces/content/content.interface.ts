/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import { FunctionComponent } from 'react';
import { IPriApiResource } from 'pri-api-library/types';
import { ICtaRegions } from '@interfaces/cta';

export interface FetchDataFunc {
  (id?: number | string): IContentContextData;
}

export interface IContentComponent extends FunctionComponent {
  fetchData: FetchDataFunc;
}

export interface IContentContextData {
  type: string;
  data: IPriApiResource;
  context: string[];
  ctaRegions?: ICtaRegions;
  related?: IPriApiResource[];
}

export interface IContentContext extends IContentContextData {
  isAmp: boolean;
}

export interface IContentComponentProxyProps {
  data?: IContentContextData;
  context?: string[];
  errorCode?: number;
}
