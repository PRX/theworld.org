/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React from 'react';
import { NoSsr, ThemeProvider } from '@material-ui/core';
import { ICtaMessage } from '@interfaces/cta';
import { ctaRegionTheme } from './CtaRegion.styles';
import { ctaTypeComponentMap } from './components';

export interface ICtaRegionProps {
  data: ICtaMessage;
}

export const CtaRegion = ({ data }: ICtaRegionProps) => {
  const { type } = data;
  const CtaMessageComponent = ctaTypeComponentMap[type] || null;

  return (
    data &&
    CtaMessageComponent && (
      <NoSsr>
        <ThemeProvider theme={ctaRegionTheme}>
          <CtaMessageComponent data={{ ...data }} />
        </ThemeProvider>
      </NoSsr>
    )
  );
};
