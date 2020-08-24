/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React from 'react';
import { NoSsr, ThemeProvider } from '@material-ui/core';
import { ICtaRegionProps } from '@interfaces/cta';
import { getShownMessage } from '@lib/cta';
import { ctaRegionTheme } from './CtaRegion.styles';
import { ctaTypeComponentMap } from './components';

export const CtaRegion = ({ data }: ICtaRegionProps) => {
  const shownMessage = getShownMessage(data);
  const { type } = shownMessage;
  const CtaMessageComponent = ctaTypeComponentMap[type] || null;

  console.log('CtaRegion >> data', data);

  return (
    data &&
    CtaMessageComponent && (
      <NoSsr>
        <ThemeProvider theme={ctaRegionTheme}>
          <CtaMessageComponent data={{ ...shownMessage }} />
        </ThemeProvider>
      </NoSsr>
    )
  );
};
