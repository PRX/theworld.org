/**
 * @file AudioPlayer.tsx
 * Component for audio player.
 */

import React, { useEffect, useReducer, useRef } from 'react';
import dynamic from 'next/dynamic';
import ReactPlayer, { type FilePlayerProps } from 'react-player/file';
import { Box, IconButton, NoSsr } from '@mui/material';
import { GetAppSharp, PlayArrowSharp } from '@mui/icons-material';
import { type IDurationProps } from '@components/Duration';
import { formatDuration } from '@lib/parse/time';
import TwGlobeLogo from '@svg/tw-globe.svg';
import { AudioPlayerActionTypes as ActionTypes } from './AudioPlayer.actions';
import type {
  IAudioPlayerProps,
  IProgressState
} from './AudioPlayer.interfaces';
import {
  audioPlayerStateReducer,
  audioPlayerInitialState
} from './AudioPlayer.reducer';
import { audioPlayerStyles } from './AudioPlayer.styles';
import type { IEmbedCodeProps } from './EmbedCode';
import { NoJsPlayer } from './NoJsPlayer';

const Duration = dynamic(() =>
  import('@components/Duration').then((mod) => mod.Duration)
) as React.FC<IDurationProps>;

const EmbedCode = dynamic(() =>
  import('./EmbedCode').then((mod) => mod.EmbedCode)
) as React.FC<IEmbedCodeProps>;

const Slider = dynamic(() => import('@mui/material/Slider'));

const CloseSharp = dynamic(() => import('@mui/icons-material/CloseSharp'));

const CodeSharp = dynamic(() => import('@mui/icons-material/CodeSharp'));

const PauseSharp = dynamic(() => import('@mui/icons-material/PauseSharp'), {
  loading: () => <PlayArrowSharp />
});

const VolumeUpSharp = dynamic(
  () => import('@mui/icons-material/VolumeUpSharp')
);

const VolumeDownSharp = dynamic(
  () => import('@mui/icons-material/VolumeDownSharp'),
  {
    loading: () => <VolumeUpSharp />
  }
);

const VolumeMuteSharp = dynamic(
  () => import('@mui/icons-material/VolumeMuteSharp'),
  {
    loading: () => <VolumeDownSharp />
  }
);

const VolumeOffSharp = dynamic(
  () => import('@mui/icons-material/VolumeOffSharp'),
  {
    loading: () => <VolumeUpSharp />
  }
);

export const AudioPlayer = ({
  className,
  data,
  downloadFilename,
  embeddedPlayerUrl,
  message,
  popoutPlayerUrl,
  ...other
}: IAudioPlayerProps) => {
  const url =
    typeof data === 'string' ? data : data?.sourceUrl || data?.mediaItemUrl;
  const playerElm = useRef<ReactPlayer>(null);
  const rootElm = useRef<HTMLDivElement>(null);
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
      embedCodeShown,
      stuck
    },
    dispatch
  ] = useReducer(audioPlayerStateReducer, audioPlayerInitialState);

  const showMessage = !!message?.length && !hasPlayed && !embedCodeShown;
  const showControls = !message?.length || (hasPlayed && !embedCodeShown);

  const { classes, cx } = audioPlayerStyles({ playing, hasPlayed, stuck });
  const rootClasses = cx(classes.root, className);

  const playBtnClassNames = cx(classes.playBtn, {
    loading: !loaded
  });

  const iconButtonClasses = {
    root: classes.MuiIconButtonRoot
  };

  const playerAttrs = {
    config: {
      forceAudio: true,
      attributes: {
        autoPlay: false,
        preload: 'none'
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
  } as FilePlayerProps;

  const seekAttr = {
    className: classes.seek,
    classes: {
      root: classes.MuiSliderRoot,
      rail: classes.progressRail,
      track: classes.MuiSliderTrack,
      thumb: classes.MuiSliderThumb,
      valueLabel: classes.MuiSliderValueLabel,
      valueLabelLabel: classes.MuiSliderValueLabelLabel
    },
    max: 1,
    step: 0.001,
    value: seeking || played || 0,
    // valueLabelDisplay: 'auto',
    valueLabelFormat: (seek: number) => formatDuration((duration || 0) * seek),
    onChangeCommitted: () => {
      if (!seeking || !playerElm.current) return;

      playerElm.current.seekTo(seeking);

      dispatch({
        type: ActionTypes.AUDIO_PLAYER_UPDATE_PROGRESS_TO_SEEKING
      });
    },
    onChange: (e: any, value: number | number[]) => {
      dispatch({
        type: ActionTypes.AUDIO_PLAYER_UPDATE_SEEKING,
        payload: value as number
      });
    }
  };

  const volumeAdjustAttrs = {
    className: classes.volumeControls,
    max: 1,
    step: 0.001,
    value: muted ? 0 : volume,
    onChange: (e: any, value: number | number[]) =>
      dispatch({
        type: ActionTypes.AUDIO_PLAYER_UPDATE_VOLUME,
        payload: value as number
      })
  };
  const VolumeBtnIcon =
    (muted && VolumeOffSharp) ||
    (volume > 0.5 && VolumeUpSharp) ||
    (volume > 0 && VolumeDownSharp) ||
    VolumeMuteSharp;

  const handleScroll = () => {
    const { top } = rootElm.current?.getBoundingClientRect() || {};

    dispatch({ type: ActionTypes.AUDIO_PLAYER_UPDATE_STUCK, payload: top });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!url) return null;

  return (
    <NoSsr defer fallback={<NoJsPlayer url={url} />}>
      <ReactPlayer {...playerAttrs} />
      <div ref={rootElm} className={rootClasses} {...other}>
        <IconButton
          className={playBtnClassNames}
          classes={iconButtonClasses}
          aria-label={playing ? 'Pause' : 'Play'}
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
                className={cx(classes.duration, classes.played)}
                seconds={playedSeconds || 0}
              />
              <Box className={classes.progress}>
                <Box
                  className={classes.loaded}
                  style={{ width: `${(loaded || 0) * 100}%` }}
                />
                <Slider {...seekAttr} valueLabelDisplay="auto" />
              </Box>
              <Duration
                className={cx(classes.duration, classes.total)}
                seconds={duration || 0}
              />
            </Box>
            <Box className={classes.volumeControls}>
              <IconButton
                classes={iconButtonClasses}
                title={muted ? 'Mute' : 'Unmute'}
                onClick={() =>
                  dispatch({ type: ActionTypes.AUDIO_PLAYER_TOGGLE_MUTED })
                }
                disableRipple
              >
                <VolumeBtnIcon />
              </IconButton>
              <Slider {...volumeAdjustAttrs} />
            </Box>
          </Box>
        )}
        {showMessage && <Box className={classes.message}>{message}</Box>}
        {embedCodeShown && embeddedPlayerUrl && (
          <EmbedCode src={embeddedPlayerUrl} />
        )}
        <Box className={classes.menu}>
          {!!embeddedPlayerUrl && (
            <IconButton
              classes={iconButtonClasses}
              className={classes.embedBtn}
              title={embedCodeShown ? 'Hide embed code' : 'Show embed code'}
              onClick={() =>
                dispatch({
                  type: ActionTypes.AUDIO_PLAYER_TOGGLE_EMBED_CODE_SHOWN
                })
              }
              disableRipple
            >
              {!embedCodeShown && <CodeSharp />}
              {embedCodeShown && <CloseSharp />}
            </IconButton>
          )}
          <IconButton
            classes={iconButtonClasses}
            component="a"
            href={url}
            title="Download Audio"
            disableRipple
          >
            <GetAppSharp />
          </IconButton>
          {!!popoutPlayerUrl && (
            <IconButton
              className={classes.popoutBtn}
              classes={iconButtonClasses}
              component="a"
              href={popoutPlayerUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View on TheWorld.org"
              disableRipple
            >
              <TwGlobeLogo />
            </IconButton>
          )}
        </Box>
      </div>
    </NoSsr>
  );
};
