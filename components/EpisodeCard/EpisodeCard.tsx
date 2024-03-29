/**
 * @file SidebarEpisode.tsx
 * Component for story card links.
 */

import React from 'react';
import 'moment-timezone';
import dynamic from 'next/dynamic';
import Image from 'next/legacy/image';
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
} from '@mui/material';
import { EqualizerRounded } from '@mui/icons-material';
import { ThemeProvider } from '@mui/styles';
import { ContentLink } from '@components/ContentLink';
import { HtmlContent } from '@components/HtmlContent';
import { IAudioControlsProps } from '@components/Player/components';
import { IAudioData } from '@components/Player/types';
import { SidebarAudioList } from '@components/Sidebar/SidebarAudioList';
import { episodeCardStyles, episodeCardTheme } from './EpisodeCard.styles';

const Moment = dynamic(() => import('react-moment')) as any;

const AudioControls = dynamic(() =>
  import('@components/Player/components').then((mod) => mod.AudioControls)
) as React.FC<IAudioControlsProps>;

export interface EpisodeCardProps {
  data: IPriApiResource;
  priority?: boolean;
}

export const EpisodeCard = ({ data, priority }: EpisodeCardProps) => {
  const { title, teaser, image, audio, dateBroadcast, datePublished } = data;
  const audioProps = {
    title,
    queuedFrom: 'Card Controls',
    ...(image && { imageUrl: image.url }),
    linkResource: data
  } as Partial<IAudioData>;
  const { segments } = audio || {};
  const { classes } = episodeCardStyles();
  const imageWidth = [
    ['max-width: 600px', '100vw'],
    ['max-width: 960px', '568px'],
    [null, '808px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  return (
    <ThemeProvider theme={episodeCardTheme}>
      <Card square elevation={1} classes={{ root: classes.MuiCardRoot }}>
        <CardActionArea component="div">
          {image && (
            <CardMedia classes={{ root: classes.MuiCardMediaRoot }}>
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
          <CardContent classes={{ root: classes.MuiCardContentRoot }}>
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
                  className={classes.title}
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
              <Box className={classes.body}>
                <HtmlContent html={teaser} />
              </Box>
            </Typography>
            <ContentLink data={data} className={classes.link} />
          </CardContent>
        </CardActionArea>
        {segments && (
          <CardActions classes={{ root: classes.MuiCardActionsRoot }}>
            <SidebarAudioList
              data={segments}
              classes={{
                root: classes.MuiListRoot,
                padding: classes.MuiListPadding
              }}
              subheader={
                <ListSubheader component="header" className={classes.header}>
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
