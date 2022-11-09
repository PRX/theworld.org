/**
 * @file TrackInfo.tsx
 * Component to display info about the current track.
 */

import React, { useContext } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Box, Typography } from '@material-ui/core';
import { Marquee } from '@components/Marquee';
import { ContentLink } from '@components/ContentLink';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import { useTrackInfoStyles } from './TrackInfo.styles';

export interface ITrackInfoProps {
  className?: string;
}

export const TrackInfo = ({ className }: ITrackInfoProps) => {
  const { state } = useContext(PlayerContext);
  const { tracks, currentTrackIndex } = state;
  const currentTrack = tracks?.[currentTrackIndex];
  const { title, info, imageUrl, linkResource } = currentTrack || {};
  const thumbnailAspectRatio = 16 / 9;
  const thumbnailHeight = 48;
  const thumbnailWidth = thumbnailHeight * thumbnailAspectRatio;
  const classes = useTrackInfoStyles({});
  const rootClasses = clsx(className, classes.root);

  return (
    <Box className={rootClasses}>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          className={classes.layout}
          key={currentTrack ? currentTrack.guid : 'empty'}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
        >
          {imageUrl ? (
            <Image
              className={classes.image}
              src={imageUrl}
              width={thumbnailWidth}
              height={thumbnailHeight}
              layout="fixed"
              alt={`Thumbnail for "${title}"`}
            />
          ) : (
            <div className={classes.image} />
          )}
          <Box className={classes.text}>
            <Marquee>
              <Typography
                className={classes.title}
                variant="h2"
                component="span"
              >
                {title}
              </Typography>
            </Marquee>
            {info?.length ? (
              <Typography
                className={classes.info}
                variant="subtitle1"
                component="span"
              >
                {info
                  .filter(t => !!t)
                  .map(text => (
                    <span className={classes.infoItem} key={text}>
                      {text}
                    </span>
                  ))}
              </Typography>
            ) : null}
          </Box>
        </motion.div>
      </AnimatePresence>
      {linkResource ? (
        <ContentLink data={linkResource} className={clsx(classes.link)} />
      ) : null}
    </Box>
  );
};
