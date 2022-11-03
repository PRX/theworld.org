/**
 * @file TrackInfo.tsx
 * Component to display info about the current track.
 */

import React, { useContext } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Box, BoxProps, Typography } from '@material-ui/core';
import { Marquee } from '@components/Marquee';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import { useTrackInfoStyles } from './TrackInfo.styles';

export interface ITrackInfoProps extends BoxProps {
  className?: string;
}

export const TrackInfo = ({ className, ...other }: ITrackInfoProps) => {
  const { state } = useContext(PlayerContext);
  const { tracks, currentTrackIndex } = state;
  const currentTrack = tracks?.[currentTrackIndex];
  const { title, info, imageUrl } = currentTrack || {};
  const thumbnailAspectRatio = 16 / 9;
  const thumbnailHeight = 48;
  const thumbnailWidth = thumbnailHeight * thumbnailAspectRatio;
  const classes = useTrackInfoStyles({});
  const rootClasses = clsx(className, classes.root);

  return currentTrack ? (
    <Box {...other} className={rootClasses}>
      <Image
        src={imageUrl}
        width={thumbnailWidth}
        height={thumbnailHeight}
        layout="fixed"
        alt={`Thumbnail for "${title}"`}
      />
      <Box className={classes.text}>
        <Marquee>
          <Typography className={classes.title} variant="h2" component="span">
            {title}
          </Typography>
        </Marquee>
        {info.length ? (
          <Typography
            className={classes.info}
            variant="subtitle1"
            component="span"
          >
            {info.map(text => (
              <span className={classes.infoItem} key={text}>
                {text}
              </span>
            ))}
          </Typography>
        ) : null}
      </Box>
    </Box>
  ) : null;
};
