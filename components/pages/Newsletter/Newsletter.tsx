/**
 * @file Story.tsx
 * Component for Story.
 */
import { useContext, useState, useEffect, useRef } from 'react';
import { useStore } from 'react-redux';
import classNames from 'classnames/bind';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import Image from 'next/image';
import {
  Box,
  Container,
  Grid,
  ThemeProvider,
  Typography
} from '@material-ui/core';
import { CheckCircleOutlineSharp } from '@material-ui/icons';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { NewsletterForm } from '@components/NewsletterForm';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { IPriApiNewsletter } from '@interfaces/newsletter';
import { RootState } from '@interfaces/state';
import { parseNewsletterOptions } from '@lib/parse/cta';
import { fetchNewsletterData } from '@store/actions/fetchNewsletterData';
import { getDataByResource } from '@store/reducers';
import { newsletterTheme, newsletterStyles } from './Newsletter.styles';

export const Newsletter = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore();
  const state = store.getState();
  let data = useRef(getDataByResource(state, type, id));

  const [subscribed, setSubscribed] = useState(false);
  const {
    complete,
    metatags,
    title,
    body,
    buttonLabel,
    summary,
    image
  } = data.current;
  const options = parseNewsletterOptions(
    data.current as IPriApiNewsletter,
    'newsletter-page'
  );
  const classes = newsletterStyles({});
  const cx = classNames.bind(classes);

  const handleSubscribed = () => {
    setSubscribed(true);
  };

  // Plausible Events.
  const props = {
    Title: title
  };
  const plausibleEvents: PlausibleEventArgs[] = [
    ['Newsletter Sign Up', { props }]
  ];

  useEffect(() => {
    if (!complete) {
      (async () => {
        // Get content data.
        await store.dispatch<any>(fetchNewsletterData(id));
        data.current = getDataByResource(state, type, id);
      })();
    }
  }, [complete, id, state, store, type]);

  return (
    <>
      <MetaTags data={metatags} />
      <Plausible events={plausibleEvents} subject={{ type, id }} />
      <ThemeProvider theme={newsletterTheme}>
        <Container disableGutters={!!image} maxWidth={false}>
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              sm={image ? 12 : 9}
              className={cx('header', {
                withImage: !!image
              })}
            >
              {image && (
                <Image
                  className={cx('image')}
                  src={image.url}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  priority
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
                      justifyContent="center"
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
                              style={{
                                fontSize: '5rem'
                              }}
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
              <Container fixed>
                <Box className={cx('body')} my={2}>
                  <HtmlContent html={body} />
                </Box>
              </Container>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export const fetchData = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => RootState
) => {
  const type = 'node--newsletter_sign_ups';
  const data = getDataByResource(getState(), type, id);

  if (!data) {
    // Get content data.
    await dispatch<any>(fetchNewsletterData(id));
  }
};
