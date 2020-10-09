/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import React, { useContext } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import { LandingPage } from '@components/LandingPage';
import { ContentContext } from '@contexts/ContentContext';
import { fetchApiHomepage } from '@lib/fetch';
import { StoryCard } from '@components/StoryCard';

export const Homepage = () => {
  const { data } = useContext(ContentContext);
  const { links, featuredStory, featuredStories } = data;

  console.log(data);

  return (
    <>
      <Head>
        <title>The World</title>
      </Head>
      <LandingPage container>
        <LandingPage main mt={2}>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12}>
              <StoryCard data={featuredStory} size="large" crossLinks />
            </Grid>
            {featuredStories.map(item => (
              <Grid item xs={12} md={6} alignContent="stretch">
                <StoryCard data={item} size="small" crossLinks />
              </Grid>
            ))}
          </Grid>
        </LandingPage>
        <LandingPage sidebar mt={2}>
          {links && (
            <ul>
              {links.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} as={href.query.alias}>
                    <a>{label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </LandingPage>
      </LandingPage>
    </>
  );
};

Homepage.fetchData = async (id: string | number, req: IncomingMessage) =>
  fetchApiHomepage(req);
