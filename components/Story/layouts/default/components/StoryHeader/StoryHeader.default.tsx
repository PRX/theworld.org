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
import { storyHeaderStyles } from './StoryHeader.default.styles';

interface Props {
  data: IPriApiResource;
}

export const StoryHeader = ({ data }: Props) => {
  const {
    byline,
    dateBroadcast,
    datePublished,
    primaryCategory,
    program,
    title
  } = data;
  const classes = storyHeaderStyles({});

  return (
    <Box className={classes.root} mt={4} mb={2}>
      {primaryCategory && (
        <Box mb={2}>
          <ContentLink
            className={classes.categoryLink}
            data={primaryCategory}
          />
        </Box>
      )}
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
          {byline && (
            <ul className={classes.byline}>
              {byline.map(({ id, creditType: { title: label }, person }) => (
                <li className={classes.bylineItem} key={id}>
                  {label}{' '}
                  <ContentLink className={classes.bylineLink} data={person} />
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
    </Box>
  );
};
