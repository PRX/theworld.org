/**
 * @file SidebarCta.tsx
 * Component for sidebar CTA elements.
 */

import React from 'react';
import { Box } from '@mui/material';
import { ICtaRegionProps } from '@interfaces/cta';
import { getShownMessage } from '@lib/cta';
import { useSidebarCtaStyles } from './SidebarCta.styles';
import { ctaTypeComponentMap } from './components';

export const SidebarCta = ({ data }: ICtaRegionProps) => {
  const shownMessage = getShownMessage(data);
  const { type } = shownMessage || {};
  const CtaMessageComponent = (type && ctaTypeComponentMap[type]) || null;
  const { classes } = useSidebarCtaStyles();

  return (
    shownMessage &&
    CtaMessageComponent && (
      <Box className={classes.root}>
        <CtaMessageComponent data={{ ...shownMessage }} />
      </Box>
    )
  );
};
