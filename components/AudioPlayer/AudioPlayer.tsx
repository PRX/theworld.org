/**
 * @file AudioPlayer.tsx
 * Component for audio player.
 */

import React, { ChangeEvent, useReducer, useRef } from 'react';
import { Box, IconButton, NoSsr, Slider, SliderProps } from '@material-ui/core';
import {
  CloseSharp,
  CodeSharp,
  GetAppSharp,
  OpenInNewSharp,
  PlayArrowSharp,
  PauseSharp,
  VolumeDownSharp,
  VolumeMuteSharp,
  VolumeOffSharp,
  VolumeUpSharp
} from '@material-ui/icons';
import ReactPlayer from 'react-player';
import { ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import { formatDuration } from '@lib/parse/time';
import { generateAudioDownloadFilename } from '@lib/parse/audio';
import { Duration } from '@components/Duration';
import { AudioPlayerActionTypes as ActionTypes } from './AudioPlayer.actions';
import { IAudioPlayerProps, IProgressState } from './AudioPlayer.interfaces';
import {
  audioPlayerStateReducer,
  audioPlayerInitialState
} from './AudioPlayer.reducer';
import { audioPlayerStyles, audioPlayerTheme } from './AudioPlayer.styles';
import { EmbedCode } from './EmbedCode';

export const AudioPlayer = ({
  className,
  data,
  downloadFilename,
  embeddedPlayerUrl,
  message = 'Hear a different voice.',
  popoutPlayerUrl
}: IAudioPlayerProps) => {
  const { url } = data;
  const audioDownloadFilename =
    downloadFilename || generateAudioDownloadFilename(data);
  const [
    {
      hasPlayed,
      playing,
      muted,
      volume,
      played,
      playedSeconds,
      loaded,
      duration,
      seeking,
      embedCodeShown
    },
    dispatch
  ] = useReducer(audioPlayerStateReducer, audioPlayerInitialState);

  const showMessage = !hasPlayed && !embedCodeShown;
  const showControls = hasPlayed && !embedCodeShown;

  const classes = audioPlayerStyles({ loaded, playing, hasPlayed });
  const cx = classNames.bind(classes);
  const rootClasses = cx(className, {
    root: true
  });
  const playerElm = useRef<ReactPlayer>(null);

  const playBtnClasses = cx({
    playBtn: true,
    loading: !loaded
  });

  const playerAttrs = {
    config: {
      file: {
        forceAudio: true,
        attributes: {
          autoPlay: false,
          preload: 'auto'
        }
      }
    },
    ref: playerElm,
    className: classes.player,
    url,
    playing,
    volume,
    muted,
    progressInterval: 500,
    onPlay: () => dispatch({ type: ActionTypes.AUDIO_PLAYER_PLAY }),
    onPause: () => dispatch({ type: ActionTypes.AUDIO_PLAYER_PAUSE }),
    onProgress: (payload: IProgressState) =>
      dispatch({
        type: ActionTypes.AUDIO_PLAYER_UPDATE_PROGRESS,
        payload
      }),
    onDuration: (payload: number) =>
      dispatch({
        type: ActionTypes.AUDIO_PLAYER_UPDATE_DURATION,
        payload
      })
  };

  const seekAttr: SliderProps = {
    className: classes.seek,
    classes: {
      rail: classes.progressRail
    },
    max: 1,
    step: 0.001,
    value: seeking || played,
    valueLabelDisplay: 'auto',
    valueLabelFormat: (seek: number) => formatDuration(duration * seek),
    onChangeCommitted: () => {
      playerElm.current.seekTo(seeking);
      dispatch({
        type: ActionTypes.AUDIO_PLAYER_UPDATE_PROGRESS_TO_SEEKING
      });
    },
    onChange: (e: ChangeEvent<{}>, payload: number) =>
      dispatch({
        type: ActionTypes.AUDIO_PLAYER_UPDATE_SEEKING,
        payload
      })
  };
  const volumeAdjustAttrs = {
    className: classes.volumeControls,
    max: 1,
    step: 0.001,
    value: muted ? 0 : volume,
    onChange: (e: ChangeEvent<{}>, payload: number) =>
      dispatch({
        type: ActionTypes.AUDIO_PLAYER_UPDATE_VOLUME,
        payload
      })
  };
  const VolumeBtnIcon =
    (muted && VolumeOffSharp) ||
    (volume > 0.5 && VolumeUpSharp) ||
    (volume > 0 && VolumeDownSharp) ||
    VolumeMuteSharp;

  return (
    <NoSsr
      defer
      fallback={<audio className={classes.fallbackPlayer} src={url} controls />}
    >
      <ThemeProvider theme={audioPlayerTheme}>
        <ReactPlayer {...playerAttrs} />
        <Box className={rootClasses}>
          <IconButton
            className={playBtnClasses}
            onClick={() =>
              dispatch({ type: ActionTypes.AUDIO_PLAYER_TOGGLE_PLAYING })
            }
            disableRipple
          >
            {!playing && <PlayArrowSharp titleAccess="Play" />}
            {playing && <PauseSharp titleAccess="Pause" />}
          </IconButton>
          {showControls && (
            <Box className={classes.controls}>
              <Box className={classes.progressControls}>
                <Duration
                  className={classes.duration}
                  seconds={playedSeconds}
                />
                <Slider {...seekAttr} />
                <Duration className={classes.duration} seconds={duration} />
              </Box>
              <Box className={classes.volumeControls}>
                <IconButton
                  onClick={() =>
                    dispatch({ type: ActionTypes.AUDIO_PLAYER_TOGGLE_MUTED })
                  }
                  disableRipple
                >
                  <VolumeBtnIcon titleAccess={muted ? 'Unmute' : 'Mute'} />
                </IconButton>
                <Slider {...volumeAdjustAttrs} />
              </Box>
            </Box>
          )}
          {showMessage && <Box className={classes.message}>{message}</Box>}
          {embedCodeShown && <EmbedCode src={embeddedPlayerUrl} />}
          <Box className={classes.menu}>
            {!!embeddedPlayerUrl && (
              <IconButton
                onClick={() =>
                  dispatch({
                    type: ActionTypes.AUDIO_PLAYER_TOGGLE_EMBED_CODE_SHOWN
                  })
                }
                disableRipple
              >
                {!embedCodeShown && <CodeSharp titleAccess="Show embed code" />}
                {embedCodeShown && <CloseSharp titleAccess="Hide embed code" />}
              </IconButton>
            )}
            {!!popoutPlayerUrl && (
              <IconButton
                component="a"
                href={popoutPlayerUrl}
                target="_blank"
                disableRipple
              >
                <OpenInNewSharp titleAccess="Open player in new window" />
              </IconButton>
            )}
            <IconButton
              component="a"
              href={url}
              download={audioDownloadFilename}
              disableRipple
            >
              <GetAppSharp titleAccess="Download audio" />
            </IconButton>
          </Box>
        </Box>
      </ThemeProvider>
    </NoSsr>
  );
};
