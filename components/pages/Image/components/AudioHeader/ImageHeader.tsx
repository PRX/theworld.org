/**
 * @file ImageHeader.ts
 * Component for default image header.
 */

import React from 'react';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Typography } from '@mui/material';
import { imageHeaderStyles } from './ImageHeader.styles';

interface Props {
  data: IPriApiResource;
}

export const ImageHeader = ({ data }: Props) => {
  const { title } = data;
  const classes = imageHeaderStyles({});

  return (
    <Box className={classes.root} mt={4} mb={2}>
      <Box mb={3}>
        <Typography variant="h1">{title}</Typography>
      </Box>
    </Box>
  );
};
