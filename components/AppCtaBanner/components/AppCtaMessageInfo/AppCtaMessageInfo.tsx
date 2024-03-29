/**
 * @file AppCtaMessageInfo.tsx
 * Component for app banner info CTA messages.
 */

import React from 'react';
import {
  Box,
  Button,
  Toolbar,
  Typography,
  ButtonProps
} from '@mui/material';
import { HtmlContent } from '@components/HtmlContent';
import { handleButtonClick } from '@lib/routing';
import { IAppCtaMessageProps } from '../AppCtaMessage.interface';

export const AppCtaMessageInfo = ({ data, onClose }: IAppCtaMessageProps) => {
  const { heading, message, action, dismiss } = data;
  const hasActions = !!(action || dismiss);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large'
  };
  const dismissAttrs: ButtonProps = !action
    ? actionAttrs
    : {
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

  return (
    <Box textAlign="center">
      {heading && <Typography variant="h2">{heading}</Typography>}
      {message && (
        <Typography component="div" variant="body1">
          <HtmlContent html={message} />
        </Typography>
      )}
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
  );
};
