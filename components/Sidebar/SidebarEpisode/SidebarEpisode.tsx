/**
 * @file SidebarEpisode.tsx
 * Component for story card links.
 */

import React from 'react';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import Link from 'next/link';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import {
  EqualizerRounded,
  NavigateNext,
  PlayCircleOutlineRounded
} from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentLink } from '@components/ContentLink';
import { Image } from '@components/Image';
import {
  sidebarEpisodeStyles,
  sidebarEpisodeTheme
} from './SidebarEpisode.styles';
import { SidebarHeader } from '../SidebarHeader';
import { SidebarList } from '../SidebarList';
import { SidebarFooter } from '../SidebarFooter';

export interface SidebarEpisodeProps {
  data: IPriApiResource;
  label?: string;
}

export const SidebarEpisode = ({ data, label }: SidebarEpisodeProps) => {
  const {
    teaser,
    title,
    image,
    audio: { segments }
  } = data;
  const classes = sidebarEpisodeStyles({});
  const cx = classNames.bind(classes);
  const imageWidth = {
    xs: '100vw',
    md: '320px',
    xl: '400px'
  };
  const formatTitle = ({ audioTitle: at, title: t }: IPriApiResource) =>
    at || t;
  const linksList =
    segments &&
    segments.map((item: IPriApiResource) =>
      item.usage && item.usage.story ? item.usage.story[0] : item
    );

  return (
    <ThemeProvider theme={sidebarEpisodeTheme}>
      <Card square elevation={1}>
        <CardActionArea>
          <CardMedia>
            <Image
              data={image}
              width={imageWidth}
              wrapperClassName={classes.imageWrapper}
            />
          </CardMedia>
          <CardContent>
            {label && (
              <Typography variant="overline" gutterBottom>
                {label}
              </Typography>
            )}
            <Typography
              variant="h5"
              component="h3"
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
            <Typography variant="body1" component="p" color="textSecondary">
              {teaser}
            </Typography>
            <ContentLink data={data} className={cx('link')} />
          </CardContent>
        </CardActionArea>
        {linksList && (
          <>
            <SidebarHeader>
              <Typography variant="h2">
                <EqualizerRounded /> In this episode:
              </Typography>
            </SidebarHeader>
            <SidebarList
              disablePadding
              data={linksList}
              formatTitle={formatTitle}
            />
          </>
        )}
        <SidebarFooter>
          <Link href="/latest/episodes" passHref>
            <Button
              component="a"
              color="primary"
              variant="contained"
              fullWidth
              disableElevation
            >
              More episodes <NavigateNext />
            </Button>
          </Link>
        </SidebarFooter>
      </Card>
    </ThemeProvider>
  );
};
