/**
 * @file AppCtaMessageOptIn.tsx
 * Component for app banner info CTA messages.
 */

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import {
  Box,
  Button,
  Checkbox,
  Toolbar,
  Typography,
  ButtonProps,
  FormControlLabel,
  Paper
} from '@material-ui/core';
import { IAppCtaMessageProps } from '../AppCtaMessage.interface';
import { appCtaMessageOptInStyles } from './AppCtaMessageOptIn.styles';

export const AppCtaMessageOptIn = ({ data, onClose }: IAppCtaMessageProps) => {
  const { heading, message, optinLabel, action, dismiss } = data;
  const hasActions = !!(action || dismiss);
  const [optedIn, setOptedIn] = useState(false);
  const classes = appCtaMessageOptInStyles({});
  const cx = classNames.bind(classes);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
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
      <Box className={cx('controls')}>
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
              label={optinLabel}
            />
          </Paper>
        </Box>
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
    </Box>
  );
};
