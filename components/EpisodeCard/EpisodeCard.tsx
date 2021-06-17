/**
 * @file SidebarEpisode.tsx
 * Component for story card links.
 */

import React from 'react';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import { EqualizerRounded, PlayCircleOutlineRounded } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentLink } from '@components/ContentLink';
import { HtmlContent } from '@components/HtmlContent';
import { Image } from '@components/Image';
import { SidebarAudioList } from '@components/Sidebar/SidebarAudioList';
import { episodeCardStyles, episodeCardTheme } from './EpisodeCard.styles';

export interface EpisodeCardProps {
  data: IPriApiResource;
  label?: string;
}

export const EpisodeCard = ({ data, label }: EpisodeCardProps) => {
  const { teaser, title, image, audio } = data;
  const { segments } = audio || {};
  const classes = episodeCardStyles({});
  const cx = classNames.bind(classes);
  const imageWidth = {
    xs: '100vw',
    md: '568px',
    xl: '808px'
  };

  return (
    <ThemeProvider theme={episodeCardTheme}>
      <Card square elevation={1}>
        <CardActionArea>
          {image && (
            <CardMedia>
              <Image
                data={image}
                width={imageWidth}
                wrapperClassName={classes.imageWrapper}
              />
            </CardMedia>
          )}
          <CardContent>
            {label && (
              <Typography variant="overline" gutterBottom>
                {label}
              </Typography>
            )}
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
          </CardContent>
        </CardActionArea>
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
      </Card>
    </ThemeProvider>
  );
};
