/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import React, { ComponentType, Component, FunctionComponent } from 'react';

export interface FetchDataFunc {
  (id?: number|string): object
}

export interface IContentComponent extends FunctionComponent {
  fetchData: FetchDataFunc
}
