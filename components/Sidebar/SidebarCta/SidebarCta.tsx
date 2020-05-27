/**
 * @file SidebarCta.tsx
 * Component for sidebar CTA elements.
 */

import React from 'react';
import { NoSsr } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ICtaMessage } from '@interfaces/cta';
import { sidebarCtaTheme } from './SidebarCta.styles';
import { ctaTypeComponentMap } from './components';

export interface ICtaRegionProps {
  data: ICtaMessage;
}

export const SidebarCta = ({ data }: ICtaRegionProps) => {
  const { type } = data;
  const CtaMessageComponent = ctaTypeComponentMap[type] || null;

  return (
    data &&
    CtaMessageComponent && (
      <NoSsr>
        <ThemeProvider theme={sidebarCtaTheme}>
          <CtaMessageComponent data={{ ...data }} />
        </ThemeProvider>
      </NoSsr>
    )
  );
};
