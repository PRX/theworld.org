/**
 * @file Team.tsx
 * Component for Team.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AnyAction } from 'redux';
import { useStore } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import classNames from 'classnames/bind';
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
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Image } from '@components/Image';
import { ContentLink } from '@components/ContentLink';
import { AppContext } from '@contexts/AppContext';
import { generateLinkHrefForContent } from '@lib/routing';
import { fetchTeamData } from '@store/actions';
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
  const classes = teamStyles({});
  const cx = classNames.bind(classes);
  const title = "The World's Team";
  const { items } = getCollectionData(state, type, id, 'members');

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
    <ThemeProvider theme={teamTheme}>
      <Head>
        <title>{title}</title>
        {/* TODO: WIRE UP ANALYTICS */}
      </Head>
      <Container fixed>
        <TeamHeader title={title} />
        <Grid container spacing={3}>
          {items
            .reduce((a, p) => [...a, ...p], [])
            .map((item: IPriApiResource) => {
              const { pathname } = generateLinkHrefForContent(item);
              const isLoading = loadingUrl === pathname;

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card
                    className={cx({
                      [classes.isLoading]: isLoading
                    })}
                  >
                    <CardActionArea>
                      {item.image && (
                        <CardMedia>
                          <Image
                            data={item.image}
                            width={{
                              xl: 290,
                              lg: 290,
                              md: 288,
                              sm: 264,
                              xs: '100vw'
                            }}
                            wrapperClassName={classes.imageWrapper}
                          />
                        </CardMedia>
                      )}
                      <CardContent>
                        <LinearProgress
                          className={classes.loadingBar}
                          color="secondary"
                          aria-label="Progress Bar"
                        />
                        <Typography variant="h4">{item.title}</Typography>
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

export const fetchData = (): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  await dispatch<any>(fetchTeamData());
};
