/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import React, { ComponentClass } from 'react';
import { IPriApiResource } from 'pri-api-library/types';

export interface FetchDataFunc {
  (id: number|string): Promise<IPriApiResource>
}

export interface IContentComponent extends ComponentClass {
  fetchData: FetchDataFunc
}
