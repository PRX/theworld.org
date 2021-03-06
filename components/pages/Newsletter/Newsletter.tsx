/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useState } from 'react';
import { IncomingMessage } from 'http';
import classNames from 'classnames/bind';
import Head from 'next/head';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  Box,
  Container,
  Grid,
  ThemeProvider,
  Typography
} from '@material-ui/core';
import { CheckCircleOutlineSharp } from '@material-ui/icons';
import { Image } from '@components/Image';
import { NewsletterForm } from '@components/NewsletterForm';
import { IContentComponentProps } from '@interfaces/content';
import { IPriApiNewsletter } from '@interfaces/newsletter';
import { RootState } from '@interfaces/state';
import { fetchApiNewsletter } from '@lib/fetch';
import { parseNewsletterOptions } from '@lib/parse/cta';
import { getDataByResource } from '@store/reducers';
import { getContentData } from '@store/reducers/contentData';
import { newsletterTheme, newsletterStyles } from './Newsletter.styles';

interface StateProps extends RootState {}

type Props = StateProps & IContentComponentProps;

export const Newsletter = ({ id, contentData }: Props) => {
  const [subscribed, setSubscribed] = useState(false);
  const data = getContentData(contentData, 'node--newsletter_sign_ups', id);
  const { title, body, buttonLabel, summary, image } = data;
  const options = parseNewsletterOptions(
    data as IPriApiNewsletter,
    'newsletter-page'
  );
  const classes = newsletterStyles({});
  const cx = classNames.bind(classes);

  const handleSubscribed = () => {
    setSubscribed(true);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider theme={newsletterTheme}>
        <Container disableGutters={!!image} maxWidth={false}>
          <Grid container justify="center">
            <Grid
              item
              xs={12}
              sm={image ? 12 : 9}
              className={cx('header', { withImage: !!image })}
            >
              {image && (
                <Image
                  className={cx('image')}
                  wrapperClassName={cx('imageWrapper')}
                  data={image}
                  width={{ xl: '100vw' }}
                />
              )}
              <div className={cx('content')}>
                <h1 className={cx('title')}>{title}</h1>
                <p className={cx('summary')}>{summary}</p>
                <Box className={cx('form')}>
                  {!subscribed && (
                    <NewsletterForm
                      options={options}
                      label={buttonLabel}
                      onSubscribed={handleSubscribed}
                    />
                  )}
                  {subscribed && (
                    <Grid
                      container
                      spacing={4}
                      justify="center"
                      alignContent="center"
                    >
                      <Grid item xs={12}>
                        <Box
                          display="grid"
                          gridTemplateColumns="min-content 1fr"
                          gridGap={16}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box>
                            <CheckCircleOutlineSharp
                              color="primary"
                              style={{ fontSize: '5rem' }}
                            />
                          </Box>
                          <Box>
                            <Typography variant="overline">
                              You&apos;re Subscribed
                            </Typography>
                            <Typography>
                              <strong>Thank you!</strong> You mean the world to
                              us.
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </div>
            </Grid>
            {body && (
              <Grid item xs={10} sm={8}>
                <Box
                  className={cx('body')}
                  my={2}
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

Newsletter.fetchData = (
  id: string,
  req: IncomingMessage
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
) => {
  const state = getState();
  const data = getDataByResource(state, 'node--newsletter_sign_ups', id);

  // Get missing content data.
  if (!data) {
    dispatch({
      type: 'FETCH_CONTENT_DATA_REQUEST',
      payload: {
        type: 'node--newsletter_sign_ups',
        id
      }
    });

    const apiData = await fetchApiNewsletter(id, req);

    dispatch({
      type: 'FETCH_CONTENT_DATA_SUCCESS',
      payload: apiData
    });
  }
};
