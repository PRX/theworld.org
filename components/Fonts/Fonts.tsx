/**
 * @file Fonts.tsx
 * Component for loading web fonts.
 */

import React from 'react';

export const Fonts = () => (
  <>
    <link
      rel="preload"
      href="/fonts/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNG9hU4-6qlkySFrt19.woff"
      as="font"
      crossOrigin=""
    />
    <link
      rel="preload"
      href="/fonts/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlbgv5qhmSOnqsV8_9Q.woff"
      as="font"
      crossOrigin=""
    />
    <link
      rel="preload"
      href="/fonts/6xK1dSBYKcSV-LCoeQqfX1RYOo3qPZ7nsDJB9cme.woff2"
      as="font"
      crossOrigin=""
    />
    <link
      rel="preload"
      href="/fonts/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNq7lujVj9_mf.woff2"
      as="font"
      crossOrigin=""
    />
    <link
      rel="preload"
      href="/fonts/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2"
      as="font"
      crossOrigin=""
    />
    <link
      rel="preload"
      href="/fonts/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwlxdu3cOWxw.woff2"
      as="font"
      crossOrigin=""
    />
    <link
      rel="preload"
      href="/fonts/JTURjIg1_i6t8kCHKm45_dJE3gnD_vx3rCs.woff2"
      as="font"
      crossOrigin=""
    />
    <link
      rel="preload"
      href="/fonts/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2"
      as="font"
      crossOrigin=""
    />
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
    /* latin */
    @font-face {
      font-family: 'Alegreya';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(/fonts/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNG9hU4-6qlkySFrt19.woff) format('woff');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* latin */
    @font-face {
      font-family: 'Alegreya';
      font-style: italic;
      font-weight: 400;
      font-display: swap;
      src: url(/fonts/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlbgv5qhmSOnqsV8_9Q.woff) format('woff');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* latin */
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: italic;
      font-weight: 400;
      font-display: swap;
      src: url(/fonts/6xK1dSBYKcSV-LCoeQqfX1RYOo3qPZ7nsDJB9cme.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* latin-ext */
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(/fonts/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNq7lujVj9_mf.woff2) format('woff2');
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(/fonts/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* latin */
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(/fonts/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwlxdu3cOWxw.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* latin */
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(/fonts/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* latin */
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(/fonts/JTURjIg1_i6t8kCHKm45_dJE3gnD_vx3rCs.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    `
      }}
    />
  </>
);
