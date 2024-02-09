/**
 * @file AppFooter.tsx
 * Component for links to content page.
 */

import type { IButtonWithUrl, RootState } from '@interfaces';
import { useStore } from 'react-redux';
import Image from 'next/legacy/image';
import { Box, Breadcrumbs, Container, Divider, Link } from '@mui/material';
import { ContentLink } from '@components/ContentLink';
import { isLocalUrl } from '@lib/parse/url';
import TwLogo from '@svg/tw-white.svg';
import PrxLogo from '@svg/PRX-Logo-Horizontal-Color.svg';
import GBHLogo from '@svg/GBH-Logo-Purple.svg';
import { getAppDataMenu } from '@store/reducers';
import { appFooterStyles } from './AppFooter.styles';

export const AppFooter = () => {
  const store = useStore<RootState>();
  const state = store.getState();
  const footerNav = getAppDataMenu(state, 'footerNav');
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
        <Box className={cx(classes.logos, classes.producedBy)}>
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
            <Link href="https://gbh.org/" aria-label="GBH">
              <GBHLogo className={producedByLogoClasses} />
            </Link>
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
                src="https://media.pri.org/s3fs-public/styles/original_image/public/images/2018/09/carnegie.jpg"
                width="376"
                height="131"
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
                src="https://media.pri.org/s3fs-public/logo-macarthur-color.jpg"
                width="149"
                height="52"
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
                src="https://media.pri.org/s3fs-public/styles/original_image/public/images/2018/09/ford.jpg"
                width="149"
                height="52"
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
            {footerNav
              .filter((v): v is IButtonWithUrl => !!v.url)
              .map(({ name, url, key, attributes }) =>
                isLocalUrl(url) ? (
                  <ContentLink
                    url={url}
                    key={key}
                    className={classes.link}
                    {...attributes}
                  >
                    {name}
                  </ContentLink>
                ) : (
                  <a
                    href={url}
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
