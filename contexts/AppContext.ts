/**
 * @file AppContext.js
 * Creates context for app data.
 */

import React from 'react';
import { IAppContext } from '@interfaces/contexts';

export const AppContext = React.createContext({
  copyrightDate: new Date().getFullYear()
} as IAppContext);
