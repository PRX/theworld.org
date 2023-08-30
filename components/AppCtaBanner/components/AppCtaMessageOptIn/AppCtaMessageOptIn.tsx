/**
 * @file AppCtaMessageOptIn.tsx
 * Component for app banner info CTA messages.
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Toolbar,
  Typography,
  ButtonProps,
  FormControlLabel,
  Paper
} from '@mui/material';
import { HtmlContent } from '@components/HtmlContent';
import { IAppCtaMessageProps } from '../AppCtaMessage.interface';
import { appCtaMessageOptInStyles } from './AppCtaMessageOptIn.styles';

export const AppCtaMessageOptIn = ({ data, onClose }: IAppCtaMessageProps) => {
  const { heading, message, optinLabel, action, dismiss } = data;
  const [optedIn, setOptedIn] = useState(false);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    disabled: !optedIn
  };
  const dismissAttrs: ButtonProps = {
    variant: 'outlined',
    color: 'primary',
    size: 'large'
  };
  const { classes } = appCtaMessageOptInStyles();

  const handleActionClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    // TODO: Store user setting for optin in local storage or account settings.

    onClose();
  };
  const handleDismissClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onClose();
  };
  const handleOptInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptedIn(event.target.checked);
  };

  return (
    <Box className={classes.root} textAlign="center" display="grid" gap={2}>
      {heading && <Typography variant="h2">{heading}</Typography>}
      {message && (
        <Typography component="div" variant="body1">
          <HtmlContent html={message} />
        </Typography>
      )}
      <Paper>
        <FormControlLabel
          control={
            <Checkbox
              checked={optedIn}
              onChange={handleOptInChange}
              name="optIn"
            />
          }
          label={<HtmlContent html={optinLabel} />}
        />
      </Paper>
      <Toolbar>
        <Button {...actionAttrs} onClick={handleActionClick}>
          {action?.name || 'Accept'}
        </Button>
        <Button {...dismissAttrs} onClick={handleDismissClick}>
          {dismiss?.name || 'No Thanks'}
        </Button>
      </Toolbar>
    </Box>
  );
};
