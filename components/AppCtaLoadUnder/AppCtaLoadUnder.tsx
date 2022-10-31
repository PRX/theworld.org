/**
 * @file AppCtaLoadUnder.tsx
 * Component for CTA load-under region.
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
import {
  appCtaLoadUnderStyles,
  appCtaLoadUnderTheme
} from './AppCtaLoadUnder.styles';
import { ctaTypeComponentMap } from './components';

export const AppCtaLoadUnder = () => {
  const store = useStore();
  const [state, setState] = useState(store.getState());
  const unsub = store.subscribe(() => {
    setState(store.getState());
  });
  const {
    page: {
      resource: { type, id }
    }
  } = useContext(AppContext);
  const banner = getCtaRegionData(
    state,
    type,
    id,
    'tw_cta_region_site_load_under'
  );
  const shownMessage = getShownMessage(banner);
  const { type: msgType } = shownMessage || {};
  const CtaMessageComponent = ctaTypeComponentMap[msgType] || null;
  const [closed, setClosed] = useState(false);
  const classes = appCtaLoadUnderStyles({});
  const cx = classNames.bind(classes);

  const handleClose = () => {
    const { name, hash, cookieLifespan } = shownMessage;
    // Set cookie for region message.
    setCtaCookie(name, hash, +cookieLifespan);
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
