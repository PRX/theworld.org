/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import type { ICtaRegionProps } from '@interfaces/cta';
import { Box } from '@mui/material';
import { getShownMessage } from '@lib/cta';
import { useSidebarCtaStyles } from './CtaRegion.styles';
import { ctaTypeComponentMap } from './components';

export const CtaRegion = ({ data }: ICtaRegionProps) => {
  const shownMessage = getShownMessage(data);
  const { type } = shownMessage || {};
  const CtaMessageComponent = ctaTypeComponentMap.get(type);
  const { classes } = useSidebarCtaStyles();

  return (
    data &&
    CtaMessageComponent && (
      <Box className={classes.root}>
        <CtaMessageComponent data={{ ...shownMessage }} />
      </Box>
    )
  );
};
