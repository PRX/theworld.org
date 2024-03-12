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
  const producedByLogoClasses = cx(classes.logo, classes.producedByLogo);

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
          <Breadcrumbs
            separator=" "
            aria-label="Footer Navigation"
            classes={{
              ol: classes.fundedByMuiOl,
              li: classes.fundedByMuiLi,
              separator: classes.fundedByMuiSeparator
            }}
          >
            <a
              className={classes.logoLink}
              href="https://www.prx.org"
              aria-label="PRX"
            >
              <Image
                className={classes.logo}
                alt="PRX"
                title="PRX"
                src="https://media.pri.org/s3fs-public/images/2024/03/prx-box.png"
                width="300"
                height="100"
              />
            </a>
            <a
              className={classes.logoLink}
              href="https://gbh.org/"
              aria-label="GBH"
            >
              <Image
                className={classes.logo}
                alt="GBH"
                title="GBH"
                src="https://media.pri.org/s3fs-public/images/2024/03/gbh-box.png"
                width="300"
                height="100"
              />
            </a>
          </Breadcrumbs>
        </Box>
        <Box className={cx(classes.logos, classes.sponsoredBy)}>
          <p className={classes.logosTitle}>Thanks to our Sponsor</p>
          <Breadcrumbs
            separator=" "
            aria-label="Footer Navigation"
            classes={{
              ol: classes.sponsoredByMuiOl,
              li: classes.sponsoredByMuiLi,
              separator: classes.sponsoredByMuiSeparator
            }}
          >
            <a
              className={classes.logoLink}
              href="http://www.progressive.com/"
              aria-label="Progressive Insurance"
            >
              <Image
                className={classes.logo}
                alt="Progressive Insurance logo"
                title="Progressive Insurance"
                src="https://media.pri.org/s3fs-public/images/2024/03/pgr_logo_300x100_blue_2_360_bg.png"
                width="300"
                height="100"
              />
            </a>
          </Breadcrumbs>
        </Box>
        <Box className={cx(classes.logos, classes.fundedBy)}>
          <p className={classes.logosTitle}>Major funding provided by</p>
          <Breadcrumbs
            separator=" "
            aria-label="Footer Navigation"
            classes={{
              ol: classes.fundedByMuiOl,
              li: classes.fundedByMuiLi,
              separator: classes.fundedByMuiSeparator
            }}
          >
            <a
              className={classes.logoLink}
              href="https://www.carnegie.org/"
              aria-label="Carnegie Corporation of New York"
            >
              <Image
                className={classes.logo}
                alt="Carnegie Corporation of New York"
                title="Carnegie Corporation of New York"
                src="https://media.pri.org/s3fs-public/images/2024/03/carnegie.png"
                width="300"
                height="100"
              />
            </a>
            <a
              className={classes.logoLink}
              href="https://www.macfound.org/"
              aria-label="MacArthur Foundation"
            >
              <Image
                className={classes.logo}
                alt="MacArthur Foundation"
                title="MacArthur Foundation"
                src="https://media.pri.org/s3fs-public/images/2024/03/macarthur-foundation.png"
                width="300"
                height="100"
              />
            </a>
            <a
              className={classes.logoLink}
              href="https://www.fordfoundation.org/"
              aria-label="Ford Foundation"
            >
              <Image
                className={classes.logo}
                alt="Ford Foundation"
                title="Ford Foundation"
                src="https://media.pri.org/s3fs-public/images/2024/03/ford-foundation.png"
                width="300"
                height="100"
              />
            </a>
            <a
              className={classes.logoLink}
              href="https://cpb.org/"
              aria-label="Corporation for Public Broadcasting"
            >
              <Image
                className={classes.logo}
                alt="Corporation for Public Broadcasting"
                title="Corporation for Public Broadcasting"
                src="https://media.pri.org/s3fs-public/images/2024/03/cpb.png"
                width="300"
                height="100"
              />
            </a>
          </Breadcrumbs>
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
