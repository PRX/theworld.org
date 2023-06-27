/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import { IApp } from "@interfaces/app";

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
  appData?: IApp
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
