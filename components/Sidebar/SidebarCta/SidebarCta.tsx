/**
 * @file SidebarCta.tsx
 * Component for sidebar CTA elements.
 */

import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { ICtaRegionProps } from '@interfaces/cta';
import { getShownMessage } from '@lib/cta';
import { sidebarCtaTheme } from './SidebarCta.styles';
import { ctaTypeComponentMap } from './components';

export const SidebarCta = ({ data }: ICtaRegionProps) => {
  const shownMessage = getShownMessage(data);
  const { type } = shownMessage;
  const CtaMessageComponent = ctaTypeComponentMap[type] || null;

  return (
    data &&
    CtaMessageComponent && (
      <ThemeProvider theme={sidebarCtaTheme}>
        <CtaMessageComponent data={{ ...shownMessage }} />
      </ThemeProvider>
    )
  );
};
