/**
 * @file AppContext.js
 * Creates context for app data.
 */

import React from 'react';
import { IPriApiResource } from 'pri-api-library/types';
import { IButton } from '@interfaces/button';
import { ICtaMessage } from '@interfaces/cta';

export interface IAppContext {
  copyrightDate?: string | number;
  ctaRegions?: {
    banner?: ICtaMessage[];
    loadUNder?: ICtaMessage[];
  };
  latestStories: IPriApiResource[];
  menus?: {
    [K: string]: IButton[];
  };
}

export const AppContext = React.createContext({
  copyrightDate: new Date().getFullYear(),
  ctaRegions: {},
  latestStories: [],
  menus: {}
} as IAppContext);
