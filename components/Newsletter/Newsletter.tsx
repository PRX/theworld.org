/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext, useState } from 'react';
import { IncomingMessage } from 'http';
import classNames from 'classnames/bind';
import Head from 'next/head';
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
import { ContentContext } from '@contexts/ContentContext';
import { IContentContextData } from '@interfaces/content';
import { IPriApiNewsletter } from '@interfaces/newsletter';
import { fetchApiNewsletter } from '@lib/fetch';
import { parseNewsletterOptions } from '@lib/parse/cta';
import { newsletterTheme, newsletterStyles } from './Newsletter.styles';

export const Newsletter = () => {
  const [subscribed, setSubscribed] = useState(false);
  const {
    data,
    data: { title, body, buttonLabel, summary, image }
  } = useContext(ContentContext);
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

Newsletter.fetchData = async (
  id: string | number,
  req: IncomingMessage
): Promise<IContentContextData> => fetchApiNewsletter(id, req);
