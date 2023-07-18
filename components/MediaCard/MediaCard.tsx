/**
 * @file MediaCard.tsx
 * Component for story card links.
 */

import { type UrlWithParsedQuery } from 'url';
import type { MediaItem } from '@interfaces';
import { useEffect, useState } from 'react';
import 'moment-timezone';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography
} from '@mui/material';
import PlayCircleOutlineRounded from '@mui/icons-material/PlayCircleOutlineRounded';
import ImageRounded from '@mui/icons-material/ImageRounded';
import VideocamRounded from '@mui/icons-material/VideocamRounded';
import { ContentLink } from '@components/ContentLink';
import { generateLinkHrefForContent } from '@lib/routing';
import { mediaCardStyles } from './MediaCard.styles';

const Moment = dynamic(() => import('react-moment')) as any;

export interface MediaCardProps {
  data: MediaItem;
}

export const MediaCard = ({ data }: MediaCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { mediaType, link, title, date, audioFields } = data;
  const { audioTitle, broadcastDate } = audioFields || {};
  const cardDate = broadcastDate || date;
  const cardTitle = audioTitle || title;
  const CardIcon =
    mediaType &&
    ((mt: string) => {
      const iconMap = new Map<string, typeof PlayCircleOutlineRounded>();
      iconMap.set('audio', PlayCircleOutlineRounded);
      iconMap.set('image', ImageRounded);
      iconMap.set('video', VideocamRounded);

      return iconMap.get(mt);
    })(mediaType);
  const linkUrl =
    link && (generateLinkHrefForContent(link, true) as UrlWithParsedQuery);
  const { pathname } = linkUrl || {};
  const { classes, cx } = mediaCardStyles({ isLoading });

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
  }, [pathname, router.events]);

  return (
    <Card
      square
      elevation={1}
      className={cx(classes.root, {
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
        <ContentLink url={link} className={classes.link} />
      </CardActionArea>
    </Card>
  );
};
