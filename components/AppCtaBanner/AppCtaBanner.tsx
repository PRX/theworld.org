/**
 * @file AppCtaBanner.tsx
 * Component for CTA banner region.
 */

import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import classNames from 'classnames/bind';
import { getShownMessage, setCtaCookie } from '@lib/cta';
import { Box, Container, IconButton, NoSsr } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { CloseSharp } from '@material-ui/icons';
import { AppContext } from '@contexts/AppContext';
import { getCtaRegionData } from '@store/reducers';
import { appCtaBannerStyles, appCtaBannerTheme } from './AppCtaBanner.styles';
import { ctaTypeComponentMap } from './components';

export const AppCtaBanner = () => {
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const banner = getCtaRegionData(state, type, id, 'tw_cta_region_site_banner');
  const shownMessage = getShownMessage(banner);
  const { type: msgType } = shownMessage || {};
  const CtaMessageComponent = ctaTypeComponentMap[msgType] || null;
  const [closed, setClosed] = useState(false);
  const unsub = store.subscribe(() => {
    setClosed(false);
    setState(store.getState());
  });
  const classes = appCtaBannerStyles({});
  const cx = classNames.bind(classes);

  const handleClose = () => {
    // Check if cookies allowed.

    // Prompt if saving cookie is ok.

    const { name, hash, cookieLifespan } = shownMessage;
    // Set cookie for region message.
    setCtaCookie(name, hash, cookieLifespan);
    // Close prompt.
    setClosed(true);
  };

  useEffect(() => {
    return () => {
      unsub();
    };
  }, []);

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
            minHeight={230}
            px={2}
            py={2}
          >
            <Container maxWidth="md">
              <CtaMessageComponent data={shownMessage} onClose={handleClose} />
            </Container>
            <Box position="absolute" top={0} right={0}>
              <IconButton
                aria-label="close"
                color="inherit"
                disableRipple
                onClick={handleClose}
              >
                <CloseSharp />
              </IconButton>
            </Box>
          </Box>
        </ThemeProvider>
      </NoSsr>
    )
  );
};
