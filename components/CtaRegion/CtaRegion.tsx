/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { ICtaMessage } from '@interfaces/cta';
import { CtaRegionContext } from '@contexts/CtaRegion.context';
import { ctaRegionStyles } from './CtaRegion.styles';

export interface ICtaRegionProps {
  data: ICtaMessage;
}

export const CtaRegion = ({ data }: ICtaRegionProps) => {
  const classes = ctaRegionStyles({});
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(true);
  }, []);

  console.log('CtaRegion > data', data);

  return (
    canRender && (
      <CtaRegionContext.Provider value={{ data }}>
        <Box
          component="aside"
          className="stretch"
          bgcolor="text.hint"
          color="background.paper"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height={300}
        >
          <Typography variant="h5">{data.heading}</Typography>
        </Box>
      </CtaRegionContext.Provider>
    )
  );
};
