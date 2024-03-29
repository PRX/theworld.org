/**
 * @file TeamHeader.ts
 * Component for ream header.
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { teamHeaderStyles } from './TeamHeader.styles';

interface Props {
  title: string;
}

export const TeamHeader = ({ title }: Props) => {
  const { classes } = teamHeaderStyles();

  return (
    <Box className={classes.root} mt={4} mb={2}>
      <Box mb={3}>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};
