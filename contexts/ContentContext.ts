/**
 * @file ContentContext.js
 * Creates context for content data.
 */

import React from 'react';
import { IContentContext } from '@interfaces/content';

export const ContentContext = React.createContext({
  data: {}
} as IContentContext);
