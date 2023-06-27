/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

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
