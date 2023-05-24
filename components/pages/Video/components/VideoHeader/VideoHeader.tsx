/**
 * @file StoryHeader.ts
 * Component for default story header.
 */

import React from 'react';
import 'moment-timezone';
import Moment from 'react-moment';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Typography } from '@mui/material';
import { videoHeaderStyles } from './VideoHeader.styles';

interface Props {
  data: IPriApiResource;
}

export const VideoHeader = ({ data }: Props) => {
  const { title, date } = data;
  const { classes } = videoHeaderStyles();

  return (
    <Box className={classes.root} mt={4} mb={2}>
      <Box mb={3}>
        <Typography variant="h1">{title}</Typography>
      </Box>
      <Box className={classes.info} mb={2}>
        {date && (
          <Moment
            className={classes.date}
            format="MMM. D, YYYY · h:mm A z"
            tz="America/New_York"
            unix
          >
            {date}
          </Moment>
        )}
      </Box>
    </Box>
  );
};
