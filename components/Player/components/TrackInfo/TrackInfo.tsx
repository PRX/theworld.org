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
  const styles = useTrackInfoStyles({ hasLink: !!linkResource });
  const rootClassNames = clsx(className, styles.root);

  return (
    <Box className={rootClassNames}>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          className={styles.layout}
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
            <Marquee>
              <Typography
                className={styles.title}
                variant="h2"
                component="span"
              >
                {title}
              </Typography>
            </Marquee>
            {info?.length ? (
              <Marquee>
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
              </Marquee>
            ) : null}
          </Box>
        </motion.div>
      </AnimatePresence>
      {linkResource ? (
        <ContentLink data={linkResource} className={clsx(styles.link)} />
      ) : null}
    </Box>
  );
};
