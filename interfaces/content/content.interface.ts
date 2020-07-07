/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import { FunctionComponent } from 'react';
import { IPriApiResource } from 'pri-api-library/types';

export interface IContentComponent extends FunctionComponent {}

export interface IContentComponentProxyProps {
  data?: IPriApiResource;
  errorCode?: number;
}
