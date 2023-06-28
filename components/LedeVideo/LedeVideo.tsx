/**
 * @file LedeVideo.ts
 * Component for lede video.
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player';
import { Box, Theme, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { ledeVideoStyles } from './LedeVideo.styles';

export interface ILedeVideoProps {
  data: {
    url: string;
    description?: string;
    credit?: string;
  };
}

export const LedeVideo = ({ data }: ILedeVideoProps) => {
  const { description, credit, url } = data;
  const theme = useTheme() as Theme;
  const { classes } = ledeVideoStyles();
  const hasCaption = description && !!description.length;
  const hasCredit = credit && !!credit.length;
  const hasFooter = hasCaption || hasCredit;
  const mdProps = {
    escapeHtml: false
  };
  const playerConfig = {
    youtube: {
      playerVars: {
        controls: 1,
        modestbranding: 0,
        rel: 0
      }
    },
    vimeo: {
      playerOptions: {
        color: theme.palette.secondary.main.slice(1),
        controls: true
      }
    }
  };

  return (
    <figure className={classes.root}>
      <Box className={classes.playerWrapper}>
        <ReactPlayer
          className={classes.player}
          url={url}
          width="100%"
          height="100%"
          config={playerConfig}
        />
      </Box>
      {hasFooter && (
        <Typography
          variant="caption"
          component="figcaption"
          className={classes.footer}
        >
          {hasCaption && (
            <ReactMarkdown {...mdProps} className={classes.caption}>
              {description}
            </ReactMarkdown>
          )}
          {hasCredit && (
            <ReactMarkdown {...mdProps} className={classes.credit}>
              {credit}
            </ReactMarkdown>
          )}
        </Typography>
      )}
    </figure>
  );
};
