/**
 * @file AppCtaBanner.tsx
 * Component for CTA banner region.
 */

import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { getShownMessage, setCtaCookie } from '@lib/cta';
// Material Components
import { Box, Container, IconButton, NoSsr } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { CloseSharp } from '@material-ui/icons';
// Contexts
import { AppContext } from '@contexts/AppContext';
// Module
import { appCtaBannerStyles, appCtaBannerTheme } from './AppCtaBanner.styles';
import { ctaTypeComponentMap } from './components';

export const AppCtaBanner = () => {
  const { ctaRegions } = useContext(AppContext);
  const { banner } = ctaRegions || {};
  const shownMessage = getShownMessage(banner);
  const { type } = shownMessage || {};
  const CtaMessageComponent = ctaTypeComponentMap[type] || null;
  const [closed, setClosed] = useState(false);
  const classes = appCtaBannerStyles({});
  const cx = classNames.bind(classes);

  const handleClose = () => {
    // Check if cookies allowed.

    // Prompt if saving cookie is ok.

    const { name, hash, cookieLifespan } = shownMessage;
    // Set cookie for region message.
    setCtaCookie(name, hash, +cookieLifespan);
    // Close prompt.
    setClosed(true);
  };

  return (
    CtaMessageComponent &&
    shownMessage &&
    !closed && (
      <NoSsr>
        <ThemeProvider theme={appCtaBannerTheme}>
          <Box
            component="aside"
            className={cx('root')}
            display="flex"
            alignItems="center"
            minHeight={300}
            px={4}
            py={3}
          >
            <Container maxWidth="md">
              <CtaMessageComponent data={shownMessage} onClose={handleClose} />
            </Container>
            <Box position="absolute" top={0} right={0}>
              <IconButton color="inherit" disableRipple onClick={handleClose}>
                <CloseSharp />
              </IconButton>
            </Box>
          </Box>
        </ThemeProvider>
      </NoSsr>
    )
  );
};
