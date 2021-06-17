/**
 * @file StoryCard.tsx
 * Component for story card links.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parse } from 'url';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  LinearProgress,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentLink } from '@components/ContentLink';
import { Image } from '@components/Image';
import { ILink } from '@interfaces/link';
import { generateLinkHrefForContent } from '@lib/routing';
import { storyCardStyles, storyCardTheme } from './StoryCard.styles';

export interface StoryCardProps {
  data: IPriApiResource;
  feature?: boolean;
}

export const StoryCard = ({ data, feature }: StoryCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { teaser, title, image, primaryCategory, crossLinks } = data;
  const { pathname } = generateLinkHrefForContent(data);
  const classes = storyCardStyles({ isLoading });
  const cx = classNames.bind(classes);
  const imageWidth = {
    xs: '100vw',
    md: '568px',
    xl: '808px'
  };

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
          [classes.isLoading]: isLoading
        })}
      >
        <CardActionArea classes={{ root: classes.MuiCardActionAreaRoot }}>
          {image && (
            <CardMedia classes={{ root: classes.MuiCardMediaRoot }}>
              <Image
                data={image}
                width={imageWidth}
                wrapperClassName={classes.imageWrapper}
              />
              <LinearProgress
                className={classes.loadingBar}
                color="secondary"
                aria-label="Progress Bar"
              />
            </CardMedia>
          )}
          <CardContent classes={{ root: classes.MuiCardContentRoot }}>
            {primaryCategory && (
              <Typography variant="overline" gutterBottom>
                <ContentLink data={primaryCategory}>
                  {primaryCategory.title}
                </ContentLink>
              </Typography>
            )}
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className={classes.title}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="textSecondary"
              className={classes.teaser}
            >
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
