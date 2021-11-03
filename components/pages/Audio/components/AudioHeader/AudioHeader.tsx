/**
 * @file StoryHeader.ts
 * Component for default story header.
 */

import 'moment-timezone';
import Moment from 'react-moment';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Typography } from '@material-ui/core';
import { ContentLink } from '@components/ContentLink';
import { audioHeaderStyles } from './AudioHeader.styles';

interface Props {
  data: IPriApiResource;
}

export const AudioHeader = ({ data }: Props) => {
  const { audioAuthor, audioTitle, broadcastDate, program } = data;
  const classes = audioHeaderStyles({});

  return (
    <Box className={classes.root} mt={4} mb={2}>
      <Box mb={3}>
        <Typography variant="h1">{audioTitle}</Typography>
      </Box>
      <Box className={classes.meta} mb={2}>
        <Box className={classes.info}>
          {program?.metatags && (
            <ContentLink data={program} className={classes.programLink} />
          )}
          <Moment
            className={classes.date}
            format="MMM. D, YYYY · h:mm A z"
            tz="America/New_York"
            unix
          >
            {broadcastDate}
          </Moment>
          {audioAuthor && !!audioAuthor.length && (
            <ul className={classes.byline}>
              {audioAuthor.map(
                (person: IPriApiResource) =>
                  person?.metatags && (
                    <li className={classes.bylineItem} key={person.id}>
                      <ContentLink
                        className={classes.bylineLink}
                        data={person}
                      />
                    </li>
                  )
              )}
            </ul>
          )}
        </Box>
      </Box>
    </Box>
  );
};
