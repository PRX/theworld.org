/**
 * @file MediaCard.tsx
 * Component for story card links.
 */

import React, { useEffect, useState } from 'react';
import 'moment-timezone';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import PlayCircleOutlineRounded from '@material-ui/icons/PlayCircleOutlineRounded';
import ImageRounded from '@material-ui/icons/ImageRounded';
import VideocamRounded from '@material-ui/icons/VideocamRounded';
import { ContentLink } from '@components/ContentLink';
import { generateLinkHrefForContent } from '@lib/routing';
import { mediaCardStyles, mediaCardTheme } from './MediaCard.styles';

const Moment = dynamic(() => import('react-moment')) as any;

export interface MediaCardProps {
  data: IPriApiResource;
}

export const MediaCard = ({ data }: MediaCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { title, audioTitle, metatags, type, date, broadcastDate } = data;
  const cardDate = broadcastDate || date;
  const cardTitle = audioTitle || title || metatags['og:title'];
  const CardIcon = ((mt: string) => {
    const iconMap = new Map();
    iconMap.set('file--audio', PlayCircleOutlineRounded);
    iconMap.set('file--images', ImageRounded);
    iconMap.set('file--videos', VideocamRounded);

    return iconMap.get(mt);
  })(type);
  const { pathname } = generateLinkHrefForContent(data);
  const classes = mediaCardStyles({ isLoading });
  const cx = classNames.bind(classes);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      setIsLoading(url === pathname);
    };
    const handleRouteChangeEnd = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, []);

  return (
    <ThemeProvider theme={mediaCardTheme}>
      <Card
        square
        elevation={1}
        className={cx({
          [classes.isLoading]: isLoading
        })}
      >
        <CardActionArea classes={{ root: classes.MuiCardActionAreaRoot }}>
          {CardIcon && (
            <CardMedia classes={{ root: classes.MuiCardMediaRoot }}>
              <CardIcon style={{ fontSize: '5rem' }} />
              <LinearProgress
                className={classes.loadingBar}
                color="secondary"
                aria-label="Progress Bar"
              />
            </CardMedia>
          )}
          <CardContent classes={{ root: classes.MuiCardContentRoot }}>
            {cardDate && (
              <Grid
                container
                justify="space-between"
                spacing={1}
                style={{ marginBottom: 0 }}
              >
                <Grid item xs="auto" zeroMinWidth>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    color="textSecondary"
                    noWrap
                  >
                    <Moment format="MMMM D, YYYY" tz="America/New_York" unix>
                      {cardDate}
                    </Moment>
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className={classes.title}
            >
              {cardTitle}
            </Typography>
          </CardContent>
          <ContentLink data={data} className={cx('link')} />
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
};
