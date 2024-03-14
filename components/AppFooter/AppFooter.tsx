/**
 * @file AppFooter.tsx
 * Component for links to content page.
 */

import React from 'react';
import Image from 'next/legacy/image';
import { useStore } from 'react-redux';
import { parse } from 'url';
import { Box, Breadcrumbs, Container, Divider, Link } from '@mui/material';
import { isLocalUrl } from '@lib/parse/url';
import { handleButtonClick } from '@lib/routing';
import { getMenusData } from '@store/reducers';
import TwLogo from '@svg/tw-white.svg';
import PrxLogo from '@svg/PRX-Logo-Horizontal-Color.svg';
import GBHLogo from '@svg/GBH-Logo-Purple.svg';
import { appFooterStyles } from './AppFooter.styles';

export const AppFooter = () => {
  const store = useStore();
  const footerNav = getMenusData(store.getState(), 'footerNav');
  const copyrightDate = new Date().getFullYear();
  const { classes, cx } = appFooterStyles();
  const fundedByLogoClasses = cx(classes.logo);

  return (
    <footer className={classes.root}>
      <Divider />
      <Container className={classes.container}>
        <TwLogo className={classes.twLogo} />
        <p>
          The World is a public radio program that crosses borders and time
          zones to bring home the stories that matter.
        </p>
        <Box className={cx(classes.logos, classes.fundedBy)}>
          <p className={classes.logosTitle}>Produced by</p>
          <ol className={classes.fundedByMuiOl}>
            <li className={classes.fundedByMuiLi}>
              <Link href="https://prx.org/" aria-label="PRX">
                <PrxLogo className={cx(fundedByLogoClasses, classes.prxLogo)} />
              </Link>
            </li>
            <li className={classes.fundedByMuiLi}>
              <Link href="https://gbh.org/" aria-label="GBH">
                <GBHLogo className={cx(fundedByLogoClasses, classes.gbhLogo)} />
              </Link>
            </li>
          </ol>
        </Box>
        <Box className={cx(classes.logos, classes.sponsoredBy)}>
          <p className={classes.logosTitle}>Thanks to our sponsor</p>
          <ol className={classes.sponsoredByMuiOl}>
            <li className={classes.sponsoredByMuiLi}>
              <a
                  className={classes.logoLink}
                  href="https://www.progressive.com/"
                  aria-label="Progressive Insurance"
                >
                  <Image
                    className={classes.logo}
                    alt="Progressive Insurance logo"
                    title="Progressive Insurance"
                    src="https://media.pri.org/s3fs-public/images/2024/03/progressive.png"
                    width="300"
                    height="100"
                  />
                </a>
            </li>
          </ol>
        </Box>
        <Box className={cx(classes.logos, classes.fundedBy)}>
          <p className={classes.logosTitle}>Major funding provided by</p>
          <ol className={classes.fundedByMuiOl}>
            <li className={classes.fundedByMuiLi}>
              <a
                className={classes.logoLink}
                href="https://www.carnegie.org/"
                aria-label="Carnegie Corporation of New York"
              >
                <Image
                  className={classes.logo}
                  alt="Carnegie Corporation of New York"
                  title="Carnegie Corporation of New York"
                  src="https://media.pri.org/s3fs-public/images/2024/03/carnegie_1.png"
                  width="128"
                  height="60"
                />
              </a>
            </li>
            <li className={classes.fundedByMuiLi}>
              <a
                className={classes.logoLink}
                href="https://www.macfound.org/"
                aria-label="MacArthur Foundation"
              >
                <Image
                  className={classes.logo}
                  alt="MacArthur Foundation"
                  title="MacArthur Foundation"
                  src="https://media.pri.org/s3fs-public/images/2024/03/macarthur-foundation-logo-ec538487d4-seeklogo.png"
                  width="171"
                  height="60"
                />
              </a>
            </li>
            <li className={classes.fundedByMuiLi}>
              <a
                className={classes.logoLink}
                href="https://www.fordfoundation.org/"
                aria-label="Ford Foundation"
              >
                <Image
                  className={classes.logo}
                  alt="Ford Foundation"
                  title="Ford Foundation"
                  src="https://media.pri.org/s3fs-public/images/2024/03/logo_of_the_ford_foundation.png"
                  width="270"
                  height="40"
                />
              </a>
            </li>
            <li className={classes.fundedByMuiLi}>
              <a
                className={classes.logoLink}
                href="https://cpb.org/"
                aria-label="Corporation for Public Broadcasting"
              >
                <Image
                  className={classes.logo}
                  alt="Corporation for Public Broadcasting"
                  title="Corporation for Public Broadcasting"
                  src="https://media.pri.org/s3fs-public/images/2024/03/g10.png"
                  width="128"
                  height="60"
                />
              </a>
            </li>
          </ol>
        </Box>
      </Container>
      <Divider />
      <Container className={classes.container}>
        {footerNav && (
          <Breadcrumbs
            separator=" "
            aria-label="Footer Navigation"
            classes={{ ol: classes.footerNavMuiOl }}
          >
            {footerNav
              .map(({ url, ...other }) => ({ ...other, url: parse(url) }))
              .map(({ name, url, key, attributes }) =>
                isLocalUrl(url.href) ? (
                  <Link
                    href={url.path}
                    onClick={handleButtonClick(url)}
                    key={key}
                    className={classes.link}
                    {...attributes}
                  >
                    {name}
                  </Link>
                ) : (
                  <a
                    href={url.href}
                    className={classes.link}
                    key={key}
                    {...attributes}
                  >
                    {name}
                  </a>
                )
              )}
          </Breadcrumbs>
        )}
        <p className={classes.copyright}>
          &copy;{copyrightDate} The World from PRX
        </p>
        <p className={classes.copyright}>
          PRX is a 501(c)(3) organization recognized by the IRS: #263347402.
        </p>
      </Container>
    </footer>
  );
};
