/**
 * @file Newsletter.tsx
 * Component for Newsletter.
 */

import type {
  IContentComponentProps,
  Newsletter as NewsletterType
} from '@interfaces';
import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { Box, Container, Grid, ThemeProvider, Typography } from '@mui/material';
import { CheckCircleOutlineSharp } from '@mui/icons-material';
import { HtmlContent } from '@components/HtmlContent';
import { MetaTags } from '@components/MetaTags';
import { NewsletterForm } from '@components/NewsletterForm';
import { Plausible, PlausibleEventArgs } from '@components/Plausible';
import { parseNewsletterOptions } from '@lib/parse/cta';
import { newsletterTheme, newsletterStyles } from './Newsletter.styles';

export const Newsletter = ({
  data
}: IContentComponentProps<NewsletterType>) => {
  const [subscribed, setSubscribed] = useState(false);
  const { id, seo, title, content, excerpt, featuredImage, newsletterOptions } =
    data;
  const image = featuredImage?.node;
  const imageSrc = image?.sourceUrl || image?.mediaItemUrl;
  const hasImage = !!imageSrc;
  const { buttonLabel } = newsletterOptions || {};
  const options = parseNewsletterOptions(data, 'newsletter-page');
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

  return (
    <>
      <MetaTags data={{ ...seo }} />
      <Plausible
        events={plausibleEvents}
        subject={{ type: 'post--newsletter', id }}
      />
      <ThemeProvider theme={newsletterTheme}>
        <Container disableGutters={!!image} maxWidth={false}>
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              sm={hasImage ? 12 : 9}
              className={cx(classes.header, {
                [classes.withImage]: hasImage
              })}
            >
              {hasImage && (
                <Box className={classes.imageWrapper}>
                  <Image
                    alt={image.altText || ''}
                    className={classes.image}
                    src={imageSrc}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </Box>
              )}
              <div className={classes.content}>
                <h1 className={classes.title}>{title}</h1>
                {excerpt && (
                  <div className={classes.summary}>
                    <HtmlContent html={excerpt} />
                  </div>
                )}
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
                          gap={2}
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
            {content && (
              <Container fixed>
                <Box className={classes.body} my={2}>
                  <HtmlContent html={content} />
                </Box>
              </Container>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
