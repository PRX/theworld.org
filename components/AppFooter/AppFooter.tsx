/**
 * @file AppFooter.tsx
 * Component for links to content page.
 */

import React, { useContext } from 'react';
import { handleButtonClick } from '@lib/routing';
import classNames from 'classnames/bind';
// Material Components
import { Box, Breadcrumbs, Container, Divider, Link } from '@material-ui/core';
import { appFooterStyles } from './AppFooter.styles';
// Contexts
import { default as TwAppContext } from '@contexts/AppContext';
// SVG
import TwLogo from '@svg/tw-white.svg';
import PrxLogo from '@svg/PRX-Logo-Horizontal-Color.svg';
import BBCLogo from '@svg/BBC.svg';
import WGBHLogo from '@svg/WGBH-Logo.svg';

export default () => {
  const {
    copyrightDate,
    menus: { footerNav }
  } = useContext(TwAppContext);
  const classes = appFooterStyles({});
  const cx = classNames.bind(classes);

  return (
    <footer className={classes.root}>
      <Divider />
      <Container className={classes.container}>
        <TwLogo className={classes.twLogo} title="The World" />
        <p>
          The World is a public radio program that crosses borders and time
          zones to bring home the stories that matter.
        </p>
        <Box className={cx({ logos: true, producedBy: true })}>
          <p className={classes.logosTitle}>Produced by</p>
          <Breadcrumbs
            separator=" "
            classes={{
              ol: classes.producedByMuiOl,
              li: classes.producedByMuiLi
            }}
          >
            <Link href="https://prx.org/">
              <PrxLogo className={cx({ logo: true, producedByLogo: true })} />
            </Link>
            <Link href="https://www.bbc.co.uk/">
              <BBCLogo className={cx({ logo: true, producedByLogo: true })} />
            </Link>
            <Link href="https://wgbh.org/">
              <WGBHLogo className={cx({ logo: true, producedByLogo: true })} />
            </Link>
          </Breadcrumbs>
        </Box>
        <Box className={cx({ logos: true, fundedBy: true })}>
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
            <a className={classes.logoLink} href="https://www.carnegie.org/">
              <img
                className={classes.logo}
                alt="Carnegie Corporation of New York"
                title="Carnegie Corporation of New York"
                src="https://media.pri.org/s3fs-public/styles/original_image/public/images/2018/09/carnegie.jpg"
              />
            </a>
            <a className={classes.logoLink} href="https://www.macfound.org/">
              <img
                className={classes.logo}
                alt="MacArthur Foundation"
                title="MacArthur Foundation"
                src="https://media.pri.org/s3fs-public/logo-macarthur-color.jpg"
              />
            </a>
            <a className={classes.logoLink} href="https://www.fordfoundation.org/">
              <img
                className={classes.logo}
                alt="Ford Foundation"
                title="Ford Foundation"
                src="https://media.pri.org/s3fs-public/styles/original_image/public/images/2018/09/ford.jpg"
              />
            </a>
            <a className={classes.logoLink} href="https://cpb.org/">
              <img
                className={classes.logo}
                alt="Corporation for Public Broadcasting"
                title="Corporation for Public Broadcasting"
                src="https://media.pri.org/s3fs-public/images/2020/01/cpb-logo.png"
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
            {footerNav.map(({ name, url, key }) => (
              <Link
                href={url.pathname}
                onClick={handleButtonClick(url)}
                key={key}
              >
                {name}
              </Link>
            ))}
          </Breadcrumbs>
        )}
        <p className={classes.copyright}>
          &copy;{copyrightDate} The World from PRX
        </p>
      </Container>
    </footer>
  );
};
