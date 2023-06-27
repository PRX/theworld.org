/**
 * @file Story.tsx
 * Component for Story.
 */

import type { RootState } from '@interfaces';
import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import { useStore } from 'react-redux';
import { Box, Container, Grid, ThemeProvider, Typography } from '@mui/material';
import { CheckCircleOutlineSharp } from '@mui/icons-material';
import { AppContext } from '@contexts/AppContext';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { NewsletterForm } from '@components/NewsletterForm';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { IPriApiNewsletter } from '@interfaces/newsletter';
import { parseNewsletterOptions } from '@lib/parse/cta';
import { getDataByResource } from '@store/reducers';
import { newsletterTheme, newsletterStyles } from './Newsletter.styles';

export const Newsletter = () => {
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const store = useStore<RootState>();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const data = getDataByResource(state, type, id);
  const [subscribed, setSubscribed] = useState(false);
  const { metatags, title, body, buttonLabel, summary, image } = data;
  const options = parseNewsletterOptions(
    data as IPriApiNewsletter,
    'newsletter-page'
  );
  const { classes, cx } = newsletterStyles();

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

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

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
              className={cx(classes.header, {
                [classes.withImage]: !!image
              })}
            >
              {image && (
                <Box className={classes.imageWrapper}>
                  <Image
                    alt={image.alt}
                    className={classes.image}
                    src={image.url}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </Box>
              )}
              <div className={classes.content}>
                <h1 className={classes.title}>{title}</h1>
                <p className={classes.summary}>{summary}</p>
                <Box className={classes.form}>
                  {!subscribed && (
                    <NewsletterForm
                      options={options}
                      label={buttonLabel}
                      onSubscribed={handleSubscribed}
                      className={classes.form}
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
                          gap={16}
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
                <Box className={classes.body} my={2}>
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
