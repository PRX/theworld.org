/**
 * @file AudioPlayer.tsx
 * Component for audio player.
 */

import React, { HTMLAttributes, useEffect, useState } from 'react';
import {
  Box,
  Slider
} from '@material-ui/core';
import {
  CheckBoxSharp,
  CloseSharp,
  CodeSharp,
  GetAppSharp,
  OpenInNewSharp,
  PlayArrowSharp,
  PauseSharp,
  SelectAllSharp,
  VolumeDownSharp,
  VolumeMuteSharp,
  VolumeOffSharp,
  VolumeUpSharp,
  WarningSharp
} from '@material-ui/icons';
import ReactPlayer from 'react-player';
import { ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import { audioPlayerStyles, audioPlayerTheme } from './AudioPlayer.styles';

export interface IAudioPlayerOptions {
  downloadFilename?: string,
  embedPlayerUrl?: string,
  message?: string,
  popoutPlayerUrl?: string
}

export interface IAudioPlayerProps extends HTMLAttributes<{}> {
  data: IPriApiResource,
  options?: IAudioPlayerOptions
}

export const AudioPlayer = ({ className, data, options }: IAudioPlayerProps) => {
  const { url } = data;
  const {
    downloadFilename = true,
    embedPlayerUrl,
    message,
    popoutPlayerUrl
  } = {
    message: 'Hear a different voice.',
    ...(options || {})
  };
  const [state, setState] = useState({
    hasPlayed: false,
    showEmbedCode: false,
    embedCodeCopySuccess: false,
    embedCodeCopyFailed: false,
    playing: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    seeking: false
  });
  const classes = audioPlayerStyles({});
  const cx = classNames.bind(classes);
  const rootClasses = cx(className, {
    root: true
  });

  return (
    <ThemeProvider theme={audioPlayerTheme}>
      <Box
        className={rootClasses}
        bgcolor="text.hint"
        color="background.paper"
        width="100%"
        height={50}
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={3}
      >
        Audio Player
      </Box>
    </ThemeProvider>
  );
};
