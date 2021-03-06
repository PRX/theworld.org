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
  Paper,
  ThemeProvider
} from '@material-ui/core';
import { IAppCtaMessageProps } from '../AppCtaMessage.interface';
import { appCtaMessageOptInTheme } from './AppCtaMessageOptIn.styles';

export const AppCtaMessageOptIn = ({ data, onClose }: IAppCtaMessageProps) => {
  const { heading, message, optinLabel, action, dismiss } = data;
  const hasActions = !!(action || dismiss);
  const [optedIn, setOptedIn] = useState(false);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    disabled: !optedIn
  };
  const dismissAttrs: ButtonProps = !action
    ? actionAttrs
    : {
        variant: 'outlined',
        color: 'primary'
      };
  const handleActionClick = () => {
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
    <ThemeProvider theme={appCtaMessageOptInTheme}>
      <Box textAlign="center">
        {heading && <Typography variant="h3">{heading}</Typography>}
        {message && (
          <Typography
            component="div"
            variant="body1"
            /* eslint-disable-next-line */
            dangerouslySetInnerHTML={{ __html: message }}
          />
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
            label={optinLabel}
          />
        </Paper>
        {hasActions && (
          <Toolbar>
            {action && (
              <Button
                {...actionAttrs}
                href={action.url && action.url.href}
                onClick={handleActionClick}
              >
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
    </ThemeProvider>
  );
};
