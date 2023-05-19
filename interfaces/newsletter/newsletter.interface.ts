/**
 * @file interfaces/link/link.interface.tsx
 * Interfaces for link.
 */

import { IPriApiResource } from 'pri-api-library/types';

export interface IPriApiNewsletter extends IPriApiResource {
  listId: string;
  title: string;
  body?: string;
  buttonLabel?: string;
  image?: IPriApiResource;
  optIn?: string;
  summary?: string;
}

export interface ICMApiCustomField {
  Key: string;
  Value: string;
}

export interface INewsletterCustomFields {
  [k: string]: string;
}

export interface INewsletterOptions {
  listId?: string;
  customFields?: INewsletterCustomFields;
}

export interface INewsletterData {
  emailAddress?: string;
}
