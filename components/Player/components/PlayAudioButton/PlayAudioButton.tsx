/**
 * @file PlayAudioButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames/bind';
import { PlayArrowSharp } from '@material-ui/icons';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import IconButton from '@material-ui/core/IconButton';
import { IAudioData } from '../../types';
import { playAudioButtonStyles } from './PlayAudioButton.styles';

const PauseSharp = dynamic(() => import('@material-ui/icons/PauseSharp'), {
  loading: () => <PlayArrowSharp />
});

export interface IPlayAudioButtonProps {
  className?: string;
  audio: IAudioData;
}

export const PlayAudioButton = ({
  className,
  audio
}: IPlayAudioButtonProps) => {
  const { state, playAudio, togglePlayPause } = useContext(PlayerContext);
  const { playing, currentTrackIndex, tracks } = state;
  const currentTrack = tracks?.[currentTrackIndex];
  const audioIsPlaying = playing && currentTrack?.guid === audio.guid;
  const classes = playAudioButtonStyles({
    playing
  });
  const cx = classNames.bind(classes);
  const playBtnClasses = cx(className, {
    playBtn: true
  });
  const iconClasses = {
    root: classes.iconRoot
  };

  const handleClick = () => {
    if (audio && audio.guid !== currentTrack?.guid) {
      playAudio(audio);
    } else {
      togglePlayPause();
    }
  };

  return audio ? (
    <IconButton className={playBtnClasses} onClick={handleClick} disableRipple>
      {!audioIsPlaying && (
        <PlayArrowSharp titleAccess="Play" classes={iconClasses} />
      )}
      {audioIsPlaying && (
        <PauseSharp titleAccess="Pause" classes={iconClasses} />
      )}
    </IconButton>
  ) : null;
};
