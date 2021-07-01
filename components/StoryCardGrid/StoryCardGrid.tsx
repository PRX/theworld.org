/**
 * @file StoryCardGrid.default.ts
 * Component for story card links grid.
 */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { parse } from 'url';
import classNames from 'classnames/bind';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Box,
  BoxProps,
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
import { ILink } from '@interfaces/link';
import {
  storyCardStyles,
  storyCardTheme
} from '@components/StoryCard/StoryCard.styles';
import { generateLinkHrefForContent } from '@lib/routing';
import {
  storyCardGridStyles,
  storyCardGridTheme
} from './StoryCardGrid.styles';

export interface StoryCardGridProps extends BoxProps {
  data: IPriApiResource[];
}

export const StoryCardGrid = ({ data, ...other }: StoryCardGridProps) => {
  const router = useRouter();
  const [loadingUrl, setLoadingUrl] = useState(null);
  const classes = storyCardGridStyles({});
  const cardClasses = storyCardStyles({});
  const cx = classNames.bind(classes);
  const cxCard = classNames.bind(cardClasses);
  const imageWidth = [
    ['max-width: 600px', '100px'],
    ['max-width: 960px', '50vw'],
    ['max-width: 1280px', '300px'],
    [null, '400px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  const renderLink = ({ title: linkTitle, url }: ILink) => {
    const oUrl = parse(url, true, true);
    const LinkComponent = oUrl.host ? MuiLink : ContentLink;
    const attrs = oUrl.host
      ? {
          href: url
        }
      : {
          data: {
            metatags: { canonical: `/${url}` }
          }
        };

    return (
      <ListItem button component={LinkComponent} key={url} {...attrs}>
        <ListItemText>{linkTitle}</ListItemText>
      </ListItem>
    );
  };

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      setLoadingUrl(url);
    };
    const handleRouteChangeEnd = () => {
      setLoadingUrl(null);
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
      <ThemeProvider theme={storyCardGridTheme}>
        <Box className={cx('root')} {...other}>
          {data.map(item => {
            const { id, title, image, primaryCategory, crossLinks } = item;
            const { pathname } = generateLinkHrefForContent(item);
            const isLoading = pathname === loadingUrl;
            return (
              <Card square elevation={1} key={id}>
                <CardActionArea>
                  {image && (
                    <CardMedia>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        layout="responsive"
                        width={image.metadata.width}
                        height={image.metadata.width * (9 / 16)}
                        objectFit="cover"
                        sizes={sizes}
                      />
                      <LinearProgress
                        className={cx(classes.loadingBar, {
                          isLoading
                        })}
                        color="secondary"
                      />
                    </CardMedia>
                  )}
                  <CardContent>
                    {primaryCategory && (
                      <Typography variant="overline" gutterBottom>
                        <ContentLink data={primaryCategory}>
                          {primaryCategory.title}
                        </ContentLink>
                      </Typography>
                    )}
                    <Typography variant="h5" component="h2" gutterBottom>
                      {title}
                    </Typography>
                    <ContentLink data={item} className={cxCard('link')} />
                  </CardContent>
                </CardActionArea>
                {!!(crossLinks && crossLinks.length) && (
                  <CardActions>
                    <List>
                      {crossLinks.map((link: ILink) => renderLink(link))}
                    </List>
                  </CardActions>
                )}
              </Card>
            );
          })}
        </Box>
      </ThemeProvider>
    </ThemeProvider>
  );
};
