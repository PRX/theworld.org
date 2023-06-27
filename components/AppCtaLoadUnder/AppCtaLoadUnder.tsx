/**
 * @file AppCtaLoadUnder.tsx
 * Component for CTA load-under region.
 */

import type { RootState } from '@interfaces';
import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Box, Container, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { CloseSharp } from '@mui/icons-material';
import { AppContext } from '@contexts/AppContext';
import { getShownMessage, setCtaCookie } from '@lib/cta';
import { getCookies, getCtaRegionData } from '@store/reducers';
import {
  appCtaLoadUnderStyles,
  appCtaLoadUnderTheme
} from './AppCtaLoadUnder.styles';
import { ctaTypeComponentMap } from './components';

export const AppCtaLoadUnder = () => {
  const store = useStore<RootState>();
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
    'tw_cta_region_site_load_under',
    type,
    id
  );
  const cookies = getCookies(state);
  const shownMessage = getShownMessage(banner, cookies);
  const { type: msgType } = shownMessage || {};
  const CtaMessageComponent = ctaTypeComponentMap.get(msgType);
  const [closed, setClosed] = useState(false);
  const { classes } = appCtaLoadUnderStyles();

  const handleClose = () => {
    if (shownMessage) {
      const { name, hash, cookieLifespan } = shownMessage;
      // Set cookie for region message.
      setCtaCookie(name, hash, cookieLifespan);
    }

    // Close prompt.
    setClosed(true);
  };

  useEffect(
    () => () => {
      unsub();
    },
    [unsub]
  );

  return CtaMessageComponent && shownMessage && !closed ? (
    <ThemeProvider theme={appCtaLoadUnderTheme}>
      <Box component="aside" className={classes.root} px={4} height={5}>
        <Container className={classes.container} maxWidth="lg">
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
  ) : null;
};
