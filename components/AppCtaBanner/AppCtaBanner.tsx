/**
 * @file AppCtaBanner.tsx
 * Component for links to content page.
 */

import React, { useContext, useState } from 'react';
import { handleButtonClick } from '@lib/routing';
import classNames from 'classnames/bind';
import { getShownMessage, setCtaCookie } from '@lib/cta';
// Material Components
import { Box, Container, Link, Typography, NoSsr } from '@material-ui/core';
// Contexts
import { AppContext } from '@contexts/AppContext';
// Module
import { appCtaBannerStyles } from './AppCtaBanner.styles';

const region = 'banner';

export const AppCtaBanner = () => {
  const {
    ctaRegions: { banner }
  } = useContext(AppContext);
  const shownMessage = getShownMessage(banner, region);
  const [closed, setClosed] = useState(false);
  const classes = appCtaBannerStyles({});
  const cx = classNames.bind(classes);

  const handleClose = () => {
    const { id, contentHash, cookieLifespan } = shownMessage;
    // Set cookie for region message.
    setCtaCookie(region, id, contentHash, +cookieLifespan);
    // Close prompt.
    setClosed(true);
  };

  return (
    !!shownMessage &&
    !closed && (
      <NoSsr>
        <Box
          component="aside"
          className="stretch"
          bgcolor="text.hint"
          color="background.paper"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height={300}
          onClick={handleClose}
        >
          <Typography variant="h5">{shownMessage.title}</Typography>
        </Box>
      </NoSsr>
    )
  );
};
