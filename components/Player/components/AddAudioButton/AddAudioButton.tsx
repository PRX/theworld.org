/**
 * @file AddAudioButton.tsx
 * Play button component to toggle playing state of player.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import clsx from 'clsx';
import { CircularProgress, NoSsr, Tooltip } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { PlaylistAddSharp, PlaylistAddCheckSharp } from '@mui/icons-material';
import { IPriApiResource } from 'pri-api-library/types';
import { PlayerContext } from '@components/Player/contexts/PlayerContext';
import { IAudioData } from '@components/Player/types';
import { IAudioResource } from '@interfaces';
import { parseAudioData } from '@lib/parse/audio/audioData';
import { fetchAudioData } from '@store/actions/fetchAudioData';
import { fetchEpisodeData } from '@store/actions/fetchEpisodeData';
import { fetchStoryData } from '@store/actions/fetchStoryData';
import { getDataByResource } from '@store/reducers';
import { useAddAudioButtonStyles } from './AddAudioButton.styles';

export interface IAddAudioButtonProps extends IconButtonProps {
  id: string;
  fallbackProps?: Partial<IAudioData>;
}

export const AddAudioButton = ({
  className,
  classes,
  id,
  fallbackProps,
  ...other
}: IAddAudioButtonProps) => {
  const store = useStore();
  const [audio, setAudio] = useState<IAudioResource>();
  const [audioData, setAudioData] = useState<IAudioData>();
  const [loading, setLoading] = useState(false);
  const { state: playerState, addTrack, removeTrack } = useContext(
    PlayerContext
  );
  const { tracks } = playerState;
  const [isQueued, setIsQueued] = useState(false);
  const tooltipTitle = isQueued ? 'Remove From Playlist' : 'Add to Playlist';
  const styles = useAddAudioButtonStyles({
    isQueued,
    loading
  });
  const rootClassNames = clsx(styles.root, className);
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

  const handleAddClick = () => {
    addTrack(audioData);
  };

  const handleRemoveClick = () => {
    removeTrack(audioData);
  };

  const handleLoadClick = () => {
    (async () => {
      setLoading(true);
      const ar = await store.dispatch<any>(fetchAudioData(id));
      let linkResource: IPriApiResource;

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
      addTrack(
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
    setAudio(
      getDataByResource(store.getState(), 'file--audio', id) as IAudioResource
    );
  }, [id]);

  useEffect(() => {
    setAudioData(audio && parseAudioData(audio, fallbackProps));
  }, [audio?.id]);

  useEffect(() => {
    const track = (tracks || []).find(
      ({ guid }) => guid === `file--audio:${id}`
    );
    if (track) {
      if (!audioData) setAudioData(track);
      setIsQueued(true);
    } else {
      setIsQueued(false);
    }
  }, [tracks?.length, id]);

  return (
    <NoSsr>
      {audioData ? (
        <Tooltip title={tooltipTitle} placement="top" arrow>
          {!isQueued ? (
            <IconButton
              className={rootClassNames}
              classes={iconButtonClasses}
              disableRipple
              {...other}
              onClick={handleAddClick}
            >
              <PlaylistAddSharp classes={iconClasses} />
            </IconButton>
          ) : (
            <IconButton
              className={rootClassNames}
              classes={iconButtonClasses}
              disableRipple
              {...other}
              onClick={handleRemoveClick}
              data-queued
            >
              <PlaylistAddCheckSharp classes={iconClasses} />
            </IconButton>
          )}
        </Tooltip>
      ) : (
        <Tooltip title={tooltipTitle} placement="top" arrow>
          <IconButton
            className={rootClassNames}
            classes={iconButtonClasses}
            disableRipple
            {...other}
            onClick={handleLoadClick}
            {...(loading && { 'data-loading': true })}
          >
            {!loading ? (
              <PlaylistAddSharp classes={iconClasses} />
            ) : (
              <CircularProgress classes={progressClasses} size="1em" />
            )}
          </IconButton>
        </Tooltip>
      )}
    </NoSsr>
  );
};
