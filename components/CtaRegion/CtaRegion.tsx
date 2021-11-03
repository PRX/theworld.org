/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import { NoSsr, ThemeProvider } from '@material-ui/core';
import { ICtaRegionProps } from '@interfaces/cta';
import { getShownMessage } from '@lib/cta';
import { ctaRegionTheme } from './CtaRegion.styles';
import { ctaTypeComponentMap } from './components';

export const CtaRegion = ({ data }: ICtaRegionProps) => {
  const shownMessage = getShownMessage(data, true);
  const { type } = shownMessage;
  const CtaMessageComponent = ctaTypeComponentMap[type] || null;

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
