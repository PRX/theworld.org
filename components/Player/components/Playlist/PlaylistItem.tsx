/**
 * @file PlaylistItem.tsx
 * Component to display track info in a playlist.
 */

import React, { useContext } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Box, BoxProps, Typography } from '@material-ui/core';
import { DragHandleSharp } from '@material-ui/icons';
import { ContentLink } from '@components/ContentLink';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import { IAudioData } from '@components/Player/types';
import { usePlaylistItemStyles } from './PlaylistItem.styles';
import { PlayAudioButton } from '../PlayAudioButton';

export interface IPlaylistItemProps extends BoxProps {
  audio: IAudioData;
}

export const PlaylistItem = ({
  audio,
  className,
  onPointerDown,
  ...other
}: IPlaylistItemProps) => {
  const { state } = useContext(PlayerContext);
  const { tracks, currentTrackIndex } = state;
  const currentTrack = tracks?.[currentTrackIndex];
  const { guid: currentTrackGuid } = currentTrack || {};
  const { guid, title, imageUrl, info, linkResource } = audio;
  const isCurrentTrack = currentTrackGuid === guid;
  const thumbnailAspectRatio = 16 / 9;
  const thumbnailHeight = 48;
  const thumbnailWidth = thumbnailHeight * thumbnailAspectRatio;
  const styles = usePlaylistItemStyles({
    isCurrentTrack,
    hasLink: !!linkResource
  });
  const rootClassNames = clsx(className, styles.root);

  return (
    <Box {...other} className={rootClassNames}>
      <Box className={styles.handle} onPointerDown={onPointerDown}>
        <DragHandleSharp />
      </Box>
      <Box className={styles.layout}>
        {imageUrl ? (
          <Image
            className={styles.image}
            src={imageUrl}
            width={thumbnailWidth}
            height={thumbnailHeight}
            layout="fixed"
            alt={`Thumbnail for "${title}"`}
          />
        ) : (
          <div className={styles.image} />
        )}
        <Box className={styles.text}>
          <Typography className={styles.title} variant="h2" component="span">
            {title}
          </Typography>
          {info?.length ? (
            <Typography
              className={styles.info}
              variant="subtitle1"
              component="span"
            >
              {info
                .filter(t => !!t)
                .map(text => (
                  <span className={styles.infoItem} key={text}>
                    {text}
                  </span>
                ))}
            </Typography>
          ) : null}
        </Box>
        {linkResource ? (
          <ContentLink data={linkResource} className={clsx(styles.link)} />
        ) : null}
      </Box>
      <Box className={styles.controls}>
        <PlayAudioButton audio={audio} />
      </Box>
    </Box>
  );
};
