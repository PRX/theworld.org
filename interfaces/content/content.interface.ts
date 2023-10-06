/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import { ISocialLink } from '@interfaces/social';

export interface IContentComponentProps<D> {
  data: D;
}

export interface IContentComponentProxyProps {
  type?: string;
  id?: string;
  errorCode?: number;
  redirect?: string;
  data?: any;
  cookies?: any;
  shareLinks?: ISocialLink[];
}

export interface IContentContext {
  type: string;
  id?: string;
}

export interface IContent {
  id: number;
  type: string;
  link: string;
  [k: string]: any;
}
