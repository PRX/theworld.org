/**
 * @file ContentContext.js
 * Creates context for cta region data.
 */

import React from 'react';
import { ICtaMessageComponentContext } from '@interfaces/cta';

export const CtaRegionContext = React.createContext({
  data: null
} as ICtaMessageComponentContext);
