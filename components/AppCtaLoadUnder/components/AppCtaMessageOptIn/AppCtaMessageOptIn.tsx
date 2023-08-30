/**
 * @file AppCtaMessageOptIn.tsx
 * Component for app banner info CTA messages.
 */

import React, { useState } from 'react';
import { handleButtonClick } from '@lib/routing';
import {
  Box,
  Button,
  Checkbox,
  Toolbar,
  Typography,
  ButtonProps,
  FormControlLabel,
  Paper,
  ThemeProvider
} from '@mui/material';
import { HtmlContent } from '@components/HtmlContent';
import { IAppCtaMessageProps } from '../AppCtaMessage.interface';
import {
  appCtaMessageOptInStyles,
  appCtaMessageOptInTheme
} from './AppCtaMessageOptIn.styles';

export const AppCtaMessageOptIn = ({ data, onClose }: IAppCtaMessageProps) => {
  const { heading, message, optinLabel, action, dismiss } = data;
  const hasActions = !!(action || dismiss);
  const [optedIn, setOptedIn] = useState(false);
  const { classes } = appCtaMessageOptInStyles();
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    disabled: !optedIn
  };
  const dismissAttrs: ButtonProps = {
    variant: 'outlined',
    color: 'primary'
  };
  const handleActionClick = handleButtonClick(action?.url, () => {
    onClose();
  });
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
    <ThemeProvider theme={appCtaMessageOptInTheme}>
      <Box textAlign="center">
        {heading && <Typography variant="h2">{heading}</Typography>}
        {message && (
          <Typography component="div" variant="body1">
            <HtmlContent html={message} />
          </Typography>
        )}
        <Box className={classes.controls}>
          <Box>
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
          </Box>
          {hasActions && (
            <Toolbar>
              {action && (
                <Button {...actionAttrs} onClick={handleActionClick}>
                  {action.name}
                </Button>
              )}
              {dismiss && (
                <Button {...dismissAttrs} onClick={handleDismissClick}>
                  {dismiss.name}
                </Button>
              )}
            </Toolbar>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
