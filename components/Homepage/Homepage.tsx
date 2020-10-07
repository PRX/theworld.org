/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import React, { useContext } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Container } from '@material-ui/core';
import { LandingPage } from '@components/LandingPage';
import { ContentContext } from '@contexts/ContentContext';
import { fetchApiHomepage } from '@lib/fetch';

export const Homepage = () => {
  const { data } = useContext(ContentContext);
  const { links } = data;

  console.log(data);

  return (
    <>
      <Head>
        <title>The World</title>
      </Head>
      <LandingPage container>
        <LandingPage main>
          <h1>Hello, The World!</h1>
          <p>Homepage coming soon...</p>
        </LandingPage>
        <LandingPage sidebar>
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
