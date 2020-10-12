/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import React, { useContext } from 'react';
import { IncomingMessage } from 'http';
import Head from 'next/head';
import Link from 'next/link';
import { LandingPage } from '@components/LandingPage';
import { ContentContext } from '@contexts/ContentContext';
import { fetchApiHomepage } from '@lib/fetch';
import { CtaRegion } from '@components/CtaRegion';
import { StoryCard } from '@components/StoryCard';
import { StoryCardGrid } from '@components/StoryCardGrid';

export const Homepage = () => {
  const {
    data,
    ctaRegions: { tw_cta_region_landing_inline_01: inlineTop }
  } = useContext(ContentContext);
  const { links, featuredStory, featuredStories } = data;

  console.log(inlineTop);

  return (
    <>
      <Head>
        <title>The World</title>
      </Head>
      <LandingPage container>
        <LandingPage main mt={2}>
          <StoryCard data={featuredStory} feature />
          <StoryCardGrid data={featuredStories} />
          {/* {inlineTop && <CtaRegion data={inlineTop} />} */}
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
