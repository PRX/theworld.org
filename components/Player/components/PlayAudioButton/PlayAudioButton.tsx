/**
 * @file PlayAudioButton.tsx
 * Play button component to toggle playing state of player.
 */

import { type MouseEventHandler, useContext, useEffect, useState } from 'react';
import { type IPriApiResource } from 'pri-api-library/types';
import type { IAudioResource, RootState } from '@interfaces';
import { type IAudioData } from '@components/Player/types';
import { useStore } from 'react-redux';
import { CircularProgress, NoSsr, Tooltip } from '@mui/material';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import { PauseSharp, PlayArrowSharp, VolumeUpSharp } from '@mui/icons-material';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import { parseAudioData } from '@lib/parse/audio/audioData';
import { fetchAudioData } from '@store/actions/fetchAudioData';
import { fetchEpisodeData } from '@store/actions/fetchEpisodeData';
import { fetchStoryData } from '@store/actions/fetchStoryData';
import { getDataByResource } from '@store/reducers';
import { playAudioButtonStyles } from './PlayAudioButton.styles';

export interface IPlayAudioButtonProps extends IconButtonProps {
  className?: string;
  id?: string;
  audio?: IAudioData;
  fallbackProps?: Partial<IAudioData>;
}

export const PlayAudioButton = ({
  className,
  classes,
  id,
  audio,
  fallbackProps,
  ...other
}: IPlayAudioButtonProps) => {
  const store = useStore<RootState>();
  const [audioResource, setAudio] = useState<IAudioResource>();
  const [audioData, setAudioData] = useState<typeof audio>(audio);
  const [loading, setLoading] = useState(false);

  const {
    state: playerState,
    playAudio,
    togglePlayPause
  } = useContext(PlayerContext);
  const { playing, currentTrackIndex, tracks } = playerState;
  const currentTrack = tracks?.[currentTrackIndex];
  const [audioIsPlaying, setAudioIsPlaying] = useState(
    playing &&
      !!(audio ?? audioData) &&
      currentTrack?.guid === (audio ?? audioData)?.guid
  );
  const tooltipTitle = audioIsPlaying ? 'Pause' : 'Play';
  const { classes: styles, cx } = playAudioButtonStyles({
    audioIsPlaying
  });
  const rootClassNames = cx(styles.root, className);
  const iconButtonClasses = {
    root: styles.iconButtonRoot,
    ...classes
  };
  const iconClasses = {
    root: styles.iconRoot
  };
  const progressClasses = {
    colorPrimary: styles.circularProgressPrimary
  };

  const handlePlayClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const usedAudioData = audio || audioData;
    if (usedAudioData && usedAudioData.guid !== currentTrack?.guid) {
      playAudio(usedAudioData);
    } else {
      togglePlayPause();
    }
  };

  const handleLoadClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (!id) return;

    (async () => {
      setLoading(true);
      const ar = await store.dispatch<any>(fetchAudioData(id));
      let linkResource: IPriApiResource | undefined;

      if (ar.usage?.story) {
        linkResource = await store.dispatch<any>(
          fetchStoryData(ar.usage.story[0].id)
        );
      }

      if (ar.usage?.episode) {
        linkResource = await store.dispatch<any>(
          fetchEpisodeData(ar.usage.episode[0].id)
        );
      }

      setLoading(false);
      setAudio(ar);
      playAudio(
        parseAudioData(
          ar,
          linkResource
            ? {
                ...fallbackProps,
                title: linkResource.title,
                ...(linkResource.image && { imageUrl: linkResource.image.url }),
                linkResource
              }
            : fallbackProps
        )
      );
    })();
  };

  useEffect(() => {
    if (!id) return;

    setAudio(
      getDataByResource(store.getState(), 'file--audio', id) as IAudioResource
    );
  }, [id, store]);

  useEffect(() => {
    setAudioData(() => audio);
  }, [audio]);

  useEffect(() => {
    setAudioData(audioResource && parseAudioData(audioResource, fallbackProps));
  }, [audioResource, fallbackProps]);

  useEffect(() => {
    const usedAudioData = audio || audioData;

    if (currentTrack?.guid === (usedAudioData?.guid || `file--audio:${id}`)) {
      if (!audioData && currentTrack) setAudioData(currentTrack);
      if (!audioData && audio) setAudioData(audio);
      setAudioIsPlaying(playing);
    } else {
      setAudioIsPlaying(false);
    }
  }, [id, playing, audio, audioData, currentTrack]);

  useEffect(() => {
    const track = (tracks || []).find(
      ({ guid }) => guid === `file--audio:${id}`
    );
    if (track && !audioData) setAudioData(track);
  }, [id, tracks, audioData]);

  return (
    <NoSsr>
      <Tooltip title={tooltipTitle} placement="top" arrow>
        {audio || audioData ? (
          <IconButton
            className={rootClassNames}
            classes={iconButtonClasses}
            disableRipple
            {...other}
            onClick={handlePlayClick}
            {...(audioIsPlaying && { 'data-playing': true })}
          >
            {!audioIsPlaying && <PlayArrowSharp classes={iconClasses} />}
            {audioIsPlaying && (
              <>
                <VolumeUpSharp classes={iconClasses} />
                <PauseSharp classes={iconClasses} />
              </>
            )}
          </IconButton>
        ) : (
          <IconButton
            className={rootClassNames}
            classes={iconButtonClasses}
            disableRipple
            {...other}
            onClick={handleLoadClick}
            {...(loading && { 'data-loading': true })}
          >
            {!loading ? (
              <PlayArrowSharp classes={iconClasses} />
            ) : (
              <CircularProgress classes={progressClasses} size="1em" />
            )}
          </IconButton>
        )}
      </Tooltip>
    </NoSsr>
  );
};
