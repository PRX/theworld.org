/**
 * @file AppFooter.tsx
 * Component for links to content page.
 */

import React from 'react';
import { useStore } from 'react-redux';
import classNames from 'classnames/bind';
import { Box, Breadcrumbs, Container, Divider, Link } from '@material-ui/core';
import { isLocalUrl } from '@lib/parse/url';
import { handleButtonClick } from '@lib/routing';
import { getMenusData } from '@store/reducers';
import { ReactComponent as TwLogo } from '@svg/tw-white.svg';
import { ReactComponent as PrxLogo } from '@svg/PRX-Logo-Horizontal-Color.svg';
import { ReactComponent as WGBHLogo } from '@svg/WGBH-Logo.svg';
import { appFooterStyles } from './AppFooter.styles';

export const AppFooter = () => {
  const store = useStore();
  const footerNav = getMenusData(store.getState(), 'footerNav');
  const copyrightDate = new Date().getFullYear();
  const classes = appFooterStyles({});
  const cx = classNames.bind(classes);
  const producedByLogoClasses = cx({ logo: true, producedByLogo: true });

  return (
    <footer className={classes.root}>
      <Divider />
      <Container className={classes.container}>
        <TwLogo className={classes.twLogo} />
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
            <Link href="https://prx.org/" aria-label="PRX">
              <PrxLogo className={producedByLogoClasses} />
            </Link>
            <Link href="https://gbh.org/" aria-label="PRX">
              <WGBHLogo className={producedByLogoClasses} />
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
            <a className={classes.logoLink} href="https://www.carnegie.org/" title="Carnegie Corporation of New York">
              <img
                className={classes.logo}
                alt="Carnegie Corporation of New York"
                title="Carnegie Corporation of New York"
                src="https://media.pri.org/s3fs-public/styles/original_image/public/images/2018/09/carnegie.jpg"
                width="376"
                height="131"
              />
            </a>
            <a className={classes.logoLink} href="https://www.macfound.org/" title="MacArthur Foundation">
              <img
                className={classes.logo}
                alt="MacArthur Foundation"
                title="MacArthur Foundation"
                src="https://media.pri.org/s3fs-public/logo-macarthur-color.jpg"
                width="149"
                height="52"
              />
            </a>
            <a
              className={classes.logoLink}
              href="https://www.fordfoundation.org/"
              title="Ford Foundation"
            >
              <img
                className={classes.logo}
                alt="Ford Foundation"
                title="Ford Foundation"
                src="https://media.pri.org/s3fs-public/styles/original_image/public/images/2018/09/ford.jpg"
                width="149"
                height="52"
              />
            </a>
            <a className={classes.logoLink} href="https://cpb.org/" title="Corporation for Public Broadcasting">
              <img
                className={classes.logo}
                alt="Corporation for Public Broadcasting"
                title="Corporation for Public Broadcasting"
                src="https://media.pri.org/s3fs-public/images/2020/01/cpb-logo.png"
                width="304"
                height="104"
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
            {footerNav.map(({ name, url, key, attributes }) =>
              isLocalUrl(url.href) ? (
                <Link
                  href={url.pathname}
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
