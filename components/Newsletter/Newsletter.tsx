/**
 * @file Story.tsx
 * Component for Story.
 */
import React, { useContext } from 'react';
import { IncomingMessage } from 'http';
import classNames from 'classnames/bind';
import Head from 'next/head';
import { Box, Container, Grid, ThemeProvider } from '@material-ui/core';
import { NewsletterForm } from '@components/NewsletterForm';
import { ContentContext } from '@contexts/ContentContext';
import { IContentContextData } from '@interfaces/content';
import { IPriApiNewsletter } from '@interfaces/newsletter';
import { fetchApiNewsletter } from '@lib/fetch';
import { parseNewsletterOptions } from '@lib/parse/cta';
import { newsletterTheme, newsletterStyles } from './Newsletter.styles';

export const Newsletter = () => {
  const {
    data,
    data: { title, body, buttonLabel, summary }
  } = useContext(ContentContext);
  const options = parseNewsletterOptions(
    data as IPriApiNewsletter,
    'newsletter-page'
  );
  const classes = newsletterStyles({});
  const cx = classNames.bind(classes);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider theme={newsletterTheme}>
        <Container>
          <Grid container justify="center">
            <Grid item xs={12} sm={9}>
              <h1 className={cx('title')}>{title}</h1>
              <p className={cx('summary')}>{summary}</p>
              <Box className={cx('form')}>
                <NewsletterForm options={options} label={buttonLabel} />
              </Box>
            </Grid>
            {body && (
              <Grid item xs={12} sm={8}>
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
