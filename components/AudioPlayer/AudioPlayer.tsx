/**
 * @file AudioPlayer.tsx
 * Component for audio player.
 */

import React, { useEffect, useReducer, useRef } from 'react';
import dynamic from 'next/dynamic';
import ReactPlayer, { FileConfig, FilePlayerProps } from 'react-player/file';
import { Box, IconButton, NoSsr } from '@material-ui/core';
import { GetAppSharp, PlayArrowSharp } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import { IDurationProps } from '@components/Duration';
import { formatDuration } from '@lib/parse/time';
import { generateAudioDownloadFilename } from '@lib/parse/audio';
import TwGlobeLogo from '@svg/tw-globe.svg';
import { AudioPlayerActionTypes as ActionTypes } from './AudioPlayer.actions';
import { IAudioPlayerProps, IProgressState } from './AudioPlayer.interfaces';
import {
  audioPlayerStateReducer,
  audioPlayerInitialState
} from './AudioPlayer.reducer';
import { audioPlayerStyles, audioPlayerTheme } from './AudioPlayer.styles';
import { IEmbedCodeProps } from './EmbedCode';
import { ISliderValueLabelProps } from './SliderValueLabel';
import { NoJsPlayer } from './NoJsPlayer';
import { ReactPlayerProps } from 'react-player';

const Duration = dynamic(() =>
  import('@components/Duration').then((mod) => mod.Duration)
) as React.FC<IDurationProps>;

const EmbedCode = dynamic(() =>
  import('./EmbedCode').then((mod) => mod.EmbedCode)
) as React.FC<IEmbedCodeProps>;

const Slider = dynamic(() => import('@material-ui/core/Slider'));

const SliderValueLabel = dynamic(() =>
  import('./SliderValueLabel').then((mod) => mod.SliderValueLabel)
) as React.FC<ISliderValueLabelProps>;

const CloseSharp = dynamic(() => import('@material-ui/icons/CloseSharp'));

const CodeSharp = dynamic(() => import('@material-ui/icons/CodeSharp'));

const PauseSharp = dynamic(() => import('@material-ui/icons/PauseSharp'), {
  loading: () => <PlayArrowSharp />
});

const VolumeUpSharp = dynamic(() => import('@material-ui/icons/VolumeUpSharp'));

const VolumeDownSharp = dynamic(
  () => import('@material-ui/icons/VolumeDownSharp'),
  {
    loading: () => <VolumeUpSharp />
  }
);

const VolumeMuteSharp = dynamic(
  () => import('@material-ui/icons/VolumeMuteSharp'),
  {
    loading: () => <VolumeDownSharp />
  }
);

const VolumeOffSharp = dynamic(
  () => import('@material-ui/icons/VolumeOffSharp'),
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
  const { url } = data;
  const audioDownloadFilename =
    downloadFilename || generateAudioDownloadFilename(data);
  const playerElm = useRef(null);
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

  const classes = audioPlayerStyles({ loaded, playing, hasPlayed, stuck });
  const cx = classNames.bind(classes);
  const rootClasses = cx(className, classes.root);

  const playBtnClasses = cx({
    playBtn: true,
    loading: !loaded
  });

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
      rail: classes.progressRail
    },
    max: 1,
    step: 0.001,
    value: seeking || played,
    // valueLabelDisplay: 'auto',
    valueLabelFormat: (seek: number) => formatDuration(duration * seek),
    onChangeCommitted: () => {
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
    },
    ValueLabelComponent: SliderValueLabel
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
    const { top } = rootElm.current.getBoundingClientRect();

    dispatch({ type: ActionTypes.AUDIO_PLAYER_UPDATE_STUCK, payload: top });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NoSsr defer fallback={<NoJsPlayer url={url} />}>
      <ThemeProvider theme={audioPlayerTheme}>
        <ReactPlayer {...playerAttrs} />
        <div ref={rootElm} className={rootClasses} {...other}>
          <IconButton
            className={playBtnClasses}
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
                  seconds={playedSeconds}
                />
                <Box className={classes.progress}>
                  <Box
                    className={classes.loaded}
                    style={{ width: `${loaded * 100}%` }}
                  />
                  <Slider {...seekAttr} valueLabelDisplay="auto" />
                </Box>
                <Duration
                  className={cx(classes.duration, classes.total)}
                  seconds={duration}
                />
              </Box>
              <Box className={classes.volumeControls}>
                <IconButton
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
          {embedCodeShown && <EmbedCode src={embeddedPlayerUrl} />}
          <Box className={classes.menu}>
            {!!embeddedPlayerUrl && (
              <IconButton
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
              component="a"
              href={url}
              download={audioDownloadFilename}
              title="Download Audio"
              disableRipple
            >
              <GetAppSharp />
            </IconButton>
            {!!popoutPlayerUrl && (
              <IconButton
                className={classes.popoutBtn}
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
      </ThemeProvider>
    </NoSsr>
  );
};
