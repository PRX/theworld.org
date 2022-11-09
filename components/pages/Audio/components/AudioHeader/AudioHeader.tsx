/**
 * @file StoryHeader.ts
 * Component for default story header.
 */

import React from 'react';
import dynamic from 'next/dynamic';
import { IPriApiResource } from 'pri-api-library/types';
import { Box, Typography } from '@material-ui/core';
import { ContentLink } from '@components/ContentLink';
import { IAudioControlsProps } from '@components/Player/components';
import { IAudioData } from '@components/Player/types';
import { audioHeaderStyles } from './AudioHeader.styles';

const Moment = dynamic(() => {
  import('moment-timezone');
  return import('react-moment');
}) as any;

const AudioControls = dynamic(() =>
  import('@components/Player/components').then(mod => mod.AudioControls)
) as React.FC<IAudioControlsProps>;

interface Props {
  data: IPriApiResource;
}

export const AudioHeader = ({ data }: Props) => {
  const { audioAuthor, audioTitle, broadcastDate, program, title, id } = data;
  const audioProps = {
    title: audioTitle || title,
    linkResource: data
  } as Partial<IAudioData>;
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
          {broadcastDate && (
            <Moment
              className={classes.date}
              format="MMM. D, YYYY · h:mm A z"
              tz="America/New_York"
              unix
            >
              {broadcastDate}
            </Moment>
          )}
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
        <Box className={classes.audio}>
          <AudioControls id={id as string} fallbackProps={audioProps} />
        </Box>
      </Box>
    </Box>
  );
};
