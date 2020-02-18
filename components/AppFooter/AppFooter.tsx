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

  console.log(footerNav);

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
          <PrxLogo className={classes.logo} />
          <BBCLogo className={classes.logo} />
          <WGBHLogo className={classes.logo} />
        </Box>
      </Container>
      <Divider />
      <Container className={classes.container}>
        {footerNav && (
          <Breadcrumbs separator=" " aria-label="Footer Navigation">
            {footerNav.map(({ name, url, key }) => (
              <Link href={url.pathname} onClick={handleButtonClick(url)} key={key}>
                {name}
              </Link>
            ))}
          </Breadcrumbs>
        )}
        <p className={classes.copyright}>&copy;{copyrightDate} The World from PRX</p>
      </Container>
    </footer>
  );
};
