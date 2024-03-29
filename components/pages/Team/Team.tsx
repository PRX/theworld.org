/**
 * @file Team.tsx
 * Component for Team.
 */

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { useStore } from 'react-redux';
import { UrlWithParsedQuery } from 'url';
import { IPriApiResource } from 'pri-api-library/types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { ContentLink } from '@components/ContentLink';
import { MetaTags } from '@components/MetaTags';
import { Plausible } from '@components/Plausible';
import { AppContext } from '@contexts/AppContext';
import { generateLinkHrefForContent } from '@lib/routing';
import { getCollectionData } from '@store/reducers';
import { teamStyles, teamTheme } from './Team.styles';
import { TeamHeader } from './components/TeamHeader';

export const Team = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const router = useRouter();
  const [loadingUrl, setLoadingUrl] = useState(null);
  const store = useStore();
  const state = store.getState();
  const { classes, cx } = teamStyles();
  const { items } = getCollectionData(state, type, id, 'members');
  const imageWidth = [
    ['max-width: 600px', '100wv'],
    [null, '300px']
  ];
  const sizes = imageWidth.map(([q, w]) => (q ? `(${q}) ${w}` : w)).join(', ');

  const title = "The World's Team";
  const description = 'Meet the team who brings you The World.';
  const metaUrl = '/programs/the-world/team';
  const image =
    'https://media.pri.org/s3fs-public/images/2020/04/tw-globe-bg-3000.jpg';
  const metatags = {
    title,
    description,
    canonical: metaUrl,
    'og:type': 'website',
    'og:title': title,
    'og:description': description,
    'og:url': metaUrl,
    'og:image': image,
    'og:image:width': '3000',
    'og:image:height': '3000',
    'og:local': 'en_US',
    'twitter:card': 'summary',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:url': metaUrl,
    'twitter:image': image
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
  }, [router.events]);

  return (
    <ThemeProvider theme={teamTheme}>
      <MetaTags data={metatags} />
      <Plausible subject={{ type: 'team', id: 'the_world' }} />
      <Container fixed>
        <TeamHeader title={title} />
        <Grid container spacing={3}>
          {items
            .reduce((a, p) => [...a, ...p], [])
            .map((item: IPriApiResource, index) => {
              const { pathname } = generateLinkHrefForContent(
                item,
                true
              ) as UrlWithParsedQuery;
              const isLoading = loadingUrl === pathname;

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card
                    className={cx({
                      [classes.isLoading]: isLoading
                    })}
                    classes={{
                      root: classes.MuiCardRoot
                    }}
                  >
                    <CardActionArea
                      classes={{
                        root: classes.MuiCardActionAreaRoot
                      }}
                    >
                      {item.image && (
                        <CardMedia
                          classes={{
                            root: classes.MuiCardMediaRoot
                          }}
                        >
                          <Image
                            alt={item.image.alt}
                            src={item.image.url}
                            layout="fill"
                            objectFit="cover"
                            sizes={sizes}
                            priority={index <= 1}
                          />
                        </CardMedia>
                      )}
                      <CardContent
                        classes={{
                          root: classes.MuiCardContentRoot
                        }}
                      >
                        <LinearProgress
                          className={classes.loadingBar}
                          color="secondary"
                          aria-label="Progress Bar"
                        />
                        <Typography variant="h4" className={classes.title}>
                          {item.title}
                        </Typography>
                        <Typography variant="subtitle1">
                          {item.position}
                        </Typography>
                      </CardContent>
                      <ContentLink data={item} className={classes.link} />
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
