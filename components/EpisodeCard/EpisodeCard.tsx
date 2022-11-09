/**
 * @file SidebarEpisode.tsx
 * Component for story card links.
 */

import React from 'react';
import 'moment-timezone';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  ListSubheader,
  Typography
} from '@material-ui/core';
import { EqualizerRounded } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentLink } from '@components/ContentLink';
import { HtmlContent } from '@components/HtmlContent';
import { IAudioControlsProps } from '@components/Player/components';
import { IAudioData } from '@components/Player/types';
import { SidebarAudioList } from '@components/Sidebar/SidebarAudioList';
import { episodeCardStyles, episodeCardTheme } from './EpisodeCard.styles';

const Moment = dynamic(() => import('react-moment')) as any;

const AudioControls = dynamic(() =>
  import('@components/Player/components').then(mod => mod.AudioControls)
) as React.FC<IAudioControlsProps>;

export interface EpisodeCardProps {
  data: IPriApiResource;
  label?: string;
  priority?: boolean;
}

export const EpisodeCard = ({ data, priority }: EpisodeCardProps) => {
  const { title, teaser, image, audio, dateBroadcast, datePublished } = data;
  const audioProps = {
    title,
    ...(image && { imageUrl: image.url }),
    linkResource: data
  } as Partial<IAudioData>;
  const { segments } = audio || {};
  const classes = episodeCardStyles({});
  const cx = classNames.bind(classes);
  const imageWidth = [
    ['max-width: 600px', '100vw'],
    ['max-width: 960px', '568px'],
    [null, '808px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  return (
    <ThemeProvider theme={episodeCardTheme}>
      <Card square elevation={1}>
        <CardActionArea>
          {image && (
            <CardMedia>
              <Image
                src={image.url}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                sizes={sizes}
                priority={priority}
              />
            </CardMedia>
          )}
          <CardContent>
            <Box className={classes.heading}>
              <Box>
                <Typography component="span">
                  <Moment
                    format="dddd, MMMM D, YYYY"
                    tz="America/New_York"
                    unix
                  >
                    {dateBroadcast || datePublished}
                  </Moment>
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  className={cx('title')}
                >
                  {title}
                </Typography>
              </Box>
              {audio && (
                <Box className={classes.audio}>
                  <AudioControls id={audio.id} fallbackProps={audioProps} />
                </Box>
              )}
            </Box>
            <Typography variant="body1" component="div" color="textSecondary">
              <Box className={cx('body')}>
                <HtmlContent html={teaser} />
              </Box>
            </Typography>
            <ContentLink data={data} className={cx('link')} />
          </CardContent>
        </CardActionArea>
        {segments && (
          <CardActions>
            <SidebarAudioList
              data={segments}
              subheader={
                <ListSubheader component="header" className={cx('header')}>
                  <Typography variant="h2">
                    <EqualizerRounded /> In this episode:
                  </Typography>
                </ListSubheader>
              }
            />
          </CardActions>
        )}
      </Card>
    </ThemeProvider>
  );
};
