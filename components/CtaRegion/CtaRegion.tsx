/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React from 'react';
import { ThemeProvider } from '@mui/material';
import { ICtaRegionProps } from '@interfaces/cta';
import { getShownMessage } from '@lib/cta';
import { ctaRegionTheme } from './CtaRegion.styles';
import { ctaTypeComponentMap } from './components';

export const CtaRegion = ({ data }: ICtaRegionProps) => {
  const shownMessage = getShownMessage(data);
  const { type } = shownMessage || {};
  const CtaMessageComponent = ctaTypeComponentMap.get(type);

  return (
    data &&
    CtaMessageComponent && (
      <ThemeProvider theme={ctaRegionTheme}>
        <CtaMessageComponent data={{ ...shownMessage }} />
      </ThemeProvider>
    )
  );
};
