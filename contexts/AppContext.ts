/**
 * @file AppContext.js
 * Creates context for app data.
 */

import React from 'react';
import { IPriApiResource } from 'pri-api-library/types';
import { IButton } from '@interfaces/button';

export interface IAppContext {
  copyrightDate?: string | number;
  latestStories: IPriApiResource[];
  menus?: {
    [K: string]: IButton[];
  };
}

export const AppContext = React.createContext({
  copyrightDate: new Date().getFullYear(),
  latestStories: [],
  menus: {}
} as IAppContext);
