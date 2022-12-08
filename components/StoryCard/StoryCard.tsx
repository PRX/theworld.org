/**
 * @file StoryCard.tsx
 * Component for story card links.
 */

import React, { useEffect, useState } from 'react';
import 'moment-timezone';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { parse, UrlWithParsedQuery } from 'url';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import { Label } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentLink } from '@components/ContentLink';
import { IAudioControlsProps } from '@components/Player/components';
import { IAudioData } from '@components/Player/types';
import { ILink } from '@interfaces';
import { generateLinkHrefForContent } from '@lib/routing';
import { useStoryCardStyles, storyCardTheme } from './StoryCard.styles';

const Moment = dynamic(() => import('react-moment')) as any;

const AudioControls = dynamic(() =>
  import('@components/Player/components').then((mod) => mod.AudioControls)
) as React.FC<IAudioControlsProps>;

export interface StoryCardProps {
  data: IPriApiResource;
  feature?: boolean;
  short?: boolean;
  priority?: boolean;
}

export const StoryCard = ({
  data,
  feature,
  short,
  priority
}: StoryCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    title,
    teaser,
    image,
    primaryCategory,
    crossLinks,
    dateBroadcast,
    datePublished,
    audio
  } = data;
  const audioProps = {
    title,
    queuedFrom: 'Card Controls',
    ...(image && { imageUrl: image.url }),
    linkResource: data
  } as Partial<IAudioData>;
  const { pathname } = generateLinkHrefForContent(
    data,
    true
  ) as UrlWithParsedQuery;
  const classes = useStoryCardStyles({ isLoading });
  const cx = classNames.bind(classes);
  const imageWidth = [
    ['max-width: 600px', '100vw'],
    ['max-width: 960px', '552px'],
    ['max-width: 1280px', '600px'],
    [null, '820px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  const renderLink = ({ title: linkTitle, url }: ILink) => {
    const oUrl = parse(url, true, true);
    const LinkComponent = oUrl.host ? MuiLink : ContentLink;
    const other = oUrl.host
      ? {
          href: url
        }
      : {
          data: {
            metatags: { canonical: `/${url}` }
          }
        };

    return (
      <ListItem button component={LinkComponent} key={url} {...other}>
        <ListItemText>{linkTitle}</ListItemText>
      </ListItem>
    );
  };

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
    <ThemeProvider theme={storyCardTheme}>
      <Card
        square
        elevation={1}
        className={cx({
          [classes.feature]: feature || !image,
          [classes.short]: short,
          [classes.isLoading]: isLoading
        })}
      >
        <CardActionArea
          classes={{ root: classes.MuiCardActionAreaRoot }}
          component="div"
        >
          <CardMedia classes={{ root: classes.MuiCardMediaRoot }}>
            {image && (
              <Image
                src={image.url}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                sizes={sizes}
                priority={priority}
              />
            )}
            <LinearProgress
              className={classes.loadingBar}
              color="secondary"
              aria-label="Progress Bar"
            />
          </CardMedia>
          <CardContent classes={{ root: classes.MuiCardContentRoot }}>
            <Box className={classes.heading}>
              <Box>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  className={classes.title}
                >
                  {title}
                </Typography>
                <Grid
                  container
                  justify="flex-start"
                  spacing={1}
                  style={{ marginBottom: 0 }}
                >
                  <Grid item xs="auto" zeroMinWidth>
                    <Typography component="span">
                      <Moment format="MMMM D, YYYY" tz="America/New_York" unix>
                        {dateBroadcast || datePublished}
                      </Moment>
                    </Typography>
                  </Grid>
                  {primaryCategory && (
                    <Grid item xs="auto" zeroMinWidth>
                      <Typography variant="overline" noWrap>
                        <Label color="secondary" className={cx('labelIcon')} />
                        <ContentLink data={primaryCategory}>
                          {primaryCategory.title}
                        </ContentLink>
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
              {audio && (
                <Box className={classes.audio}>
                  <AudioControls id={audio.id} fallbackProps={audioProps} />
                </Box>
              )}
            </Box>
            <Typography variant="body1" component="p" color="textSecondary">
              {teaser}
            </Typography>
          </CardContent>
          <ContentLink data={data} className={cx('link')} />
        </CardActionArea>
        {feature && !!(crossLinks && crossLinks.length) && (
          <CardActions>
            <List>{crossLinks.map((link: ILink) => renderLink(link))}</List>
          </CardActions>
        )}
      </Card>
    </ThemeProvider>
  );
};
