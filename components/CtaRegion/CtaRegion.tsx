/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { ICtaRegionProps } from '@interfaces/cta';
import { getShownMessage } from '@lib/cta';
import { ctaRegionTheme } from './CtaRegion.styles';
import { ctaTypeComponentMap } from './components';

export const CtaRegion = ({ data }: ICtaRegionProps) => {
  const shownMessage = getShownMessage(data, true);
  const { type } = shownMessage || {};
  const CtaMessageComponent = ctaTypeComponentMap[type] || null;

  return (
    data &&
    CtaMessageComponent && (
      <ThemeProvider theme={ctaRegionTheme}>
        <CtaMessageComponent data={{ ...shownMessage }} />
      </ThemeProvider>
    )
  );
};
