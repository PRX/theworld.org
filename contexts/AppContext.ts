/**
 * @file AppContext.js
 * Creates context for app data.
 */

import React from 'react';

export interface IAppContext {
  page?: {
    resource?: {
      type?: string;
      id?: string;
    };
  };
  copyrightDate?: string | number;
}

export const AppContext = React.createContext({
  copyrightDate: new Date().getFullYear()
} as IAppContext);
