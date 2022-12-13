/**
 * @file StoryHeader.ts
 * Component for default story header.
 */

import React from 'react';

import { IPriApiResource } from 'pri-api-library/types';
import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import { ContentLink } from '@components/ContentLink';
import { IAudioControlsProps } from '@components/Player/components';
import { IAudioData } from '@components/Player/types';
import { episodeHeaderStyles } from './EpisodeHeader.styles';

const Moment = dynamic(() => {
  import('moment-timezone');
  return import('react-moment');
}) as any;

const AudioControls = dynamic(() =>
  import('@components/Player/components').then((mod) => mod.AudioControls)
) as React.FC<IAudioControlsProps>;

interface Props {
  data: IPriApiResource;
}

export const EpisodeHeader = ({ data }: Props) => {
  const { dateBroadcast, datePublished, program, title, image, audio } = data;
  const audioProps = {
    title,
    queuedFrom: 'Page Header Controls',
    ...(image && { imageUrl: image.url })
  } as Partial<IAudioData>;
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
        {audio && (
          <Box className={classes.audio}>
            <AudioControls id={audio.id} fallbackProps={audioProps} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
