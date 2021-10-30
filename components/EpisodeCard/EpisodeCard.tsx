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
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core';
import { EqualizerRounded, PlayCircleOutlineRounded } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentLink } from '@components/ContentLink';
import { HtmlContent } from '@components/HtmlContent';
import { SidebarAudioList } from '@components/Sidebar/SidebarAudioList';
import { episodeCardStyles, episodeCardTheme } from './EpisodeCard.styles';

const Moment = dynamic(() => import('react-moment')) as any;

export interface EpisodeCardProps {
  data: IPriApiResource;
  label?: string;
  priority?: boolean;
}

export const EpisodeCard = ({ data, label, priority }: EpisodeCardProps) => {
  const { teaser, title, image, audio, dateBroadcast, datePublished } = data;
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
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={1}
            >
              {label && (
                <Grid item xs="auto" zeroMinWidth>
                  <Typography variant="overline" noWrap>
                    {label}
                  </Typography>
                </Grid>
              )}
              <Grid item xs="auto" zeroMinWidth>
                <Typography
                  variant="subtitle2"
                  component="span"
                  color="textSecondary"
                  gutterBottom
                  noWrap
                >
                  <Moment format="MMMM D, YYYY" tz="America/New_York" unix>
                    {dateBroadcast || datePublished}
                  </Moment>
                </Typography>
              </Grid>
            </Grid>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className={cx('title')}
            >
              <PlayCircleOutlineRounded
                color="primary"
                fontSize="large"
                className={cx('playIcon')}
              />{' '}
              {title}
            </Typography>
            <Typography variant="body1" component="div" color="textSecondary">
              <Box className={cx('body')}>
                <HtmlContent html={teaser} />
              </Box>
            </Typography>
            <ContentLink data={data} className={cx('link')} />
            {segments && (
              <>
                <Box component="header" className={cx('header')}>
                  <Typography variant="h2">
                    <EqualizerRounded /> In this episode:
                  </Typography>
                </Box>
                <SidebarAudioList data={segments} />
              </>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
};
