/**
 * @file Team.tsx
 * Component for Team.
 */
import React, { useContext } from 'react';
import { IncomingMessage } from 'http';
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
import { fetchTeamData } from '@store/actions';
import { getCollectionData, getLoading } from '@store/reducers';
import { teamStyles, teamTheme } from './Team.styles';
import { TeamHeader } from './components/TeamHeader';

export const Team = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore();
  const state = store.getState();
  const classes = teamStyles({});
  const cx = classNames.bind(classes);
  const title = 'The World Team';
  const { items } = getCollectionData(state, type, id, 'members');
  const loading = getLoading(state);
  const isLoading = (item: IPriApiResource) =>
    item.id === loading.id && item.type === loading.type;

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
            .map((item: IPriApiResource) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  className={cx({
                    [classes.isLoading]: isLoading(item) || false
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
            ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

Team.fetchData = (
  id: string,
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  await dispatch<any>(fetchTeamData(req));
};
