/**
 * @file StoryHeader.ts
 * Component for default story header.
 */

import React from 'react';
import 'moment-timezone';
import Moment from 'react-moment';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Typography } from '@material-ui/core';
import { ContentLink } from '@components/ContentLink';
import { episodeHeaderStyles } from './EpisodeHeader.styles';

interface Props {
  data: IPriApiResource;
}

export const EpisodeHeader = ({ data }: Props) => {
  const { dateBroadcast, datePublished, program, title } = data;
  const classes = episodeHeaderStyles({});

  return (
    <Box component="header" className={classes.root} mt={4} mb={2}>
      <Box mb={3}>
        <Typography variant="h1">{title}</Typography>
      </Box>
      <Box className={classes.meta} mb={2}>
        <Box className={classes.info}>
          {program && (
            <ContentLink data={program} className={classes.programLink} />
          )}
          <Moment
            className={classes.date}
            format="MMM. D, YYYY · h:mm A z"
            tz="America/New_York"
            unix
          >
            {dateBroadcast || datePublished}
          </Moment>
        </Box>
      </Box>
    </Box>
  );
};
