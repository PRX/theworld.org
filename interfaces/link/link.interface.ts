/**
import { PriApiResource } from 'pri-api-library/types';
 * @file interfaces/link/link.interface.tsx
 * Interfaces for link.
 */

import { IPriApiResource } from 'pri-api-library/types';

export interface ILinkHtmlAttributes {
  class?: string[],
  title?: string,
  name?: string,
  id?: string,
  url?: string,
  attributes?: ILinkHtmlAttributes
}

export interface ILink extends IPriApiResource {
  id: string | number,
  name: string,
  url: string,
  attributes: ILinkHtmlAttributes,
  children?: ILink[]
}
