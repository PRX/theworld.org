/**
 * @file SidebarCta.tsx
 * Component for sidebar CTA elements.
 */

import { NoSsr } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ICtaRegionProps } from '@interfaces/cta';
import { getShownMessage } from '@lib/cta';
import { sidebarCtaTheme } from './SidebarCta.styles';
import { ctaTypeComponentMap } from './components';

export const SidebarCta = ({ data }: ICtaRegionProps) => {
  const shownMessage = getShownMessage(data, true);
  const { type } = shownMessage;
  const CtaMessageComponent = ctaTypeComponentMap[type] || null;

  return (
    data &&
    CtaMessageComponent && (
      <NoSsr>
        <ThemeProvider theme={sidebarCtaTheme}>
          <CtaMessageComponent data={{ ...shownMessage }} />
        </ThemeProvider>
      </NoSsr>
    )
  );
};
