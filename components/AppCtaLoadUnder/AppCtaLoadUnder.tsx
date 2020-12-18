/**
 * @file AppCtaLoadUnder.tsx
 * Component for CTA load-under region.
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
import {
  appCtaLoadUnderStyles,
  appCtaLoadUnderTheme
} from './AppCtaLoadUnder.styles';
import { ctaTypeComponentMap } from './components';

export const AppCtaLoadUnder = () => {
  const { ctaRegions } = useContext(AppContext);
  const { banner } = ctaRegions || {};
  const shownMessage = getShownMessage(banner);
  const { type } = shownMessage || {};
  const CtaMessageComponent = ctaTypeComponentMap[type] || null;
  const [closed, setClosed] = useState(false);
  const classes = appCtaLoadUnderStyles({});
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
        <ThemeProvider theme={appCtaLoadUnderTheme}>
          <Box
            component="aside"
            className={cx('root')}
            position="fixed"
            bottom={0}
            width="100%"
            px={4}
          >
            <Container className={cx('container')} maxWidth="lg">
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
