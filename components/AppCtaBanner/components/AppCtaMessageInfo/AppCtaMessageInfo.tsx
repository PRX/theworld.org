/**
 * @file AppCtaMessageInfo.tsx
 * Component for links to content page.
 */

import React from 'react';
import {
  Box,
  Button,
  Toolbar,
  Typography,
  ButtonProps
} from '@material-ui/core';
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
  const handleActionClick = () => {
    onClose();
  };
  const handleDismissClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Box textAlign="center">
      {heading && <Typography variant="h3">{heading}</Typography>}
      {message && (
        <Typography
          variant="body1"
          /* eslint-disable-next-line */
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {hasActions && (
        <Toolbar>
          {action && (
            <Button
              {...actionAttrs}
              href={action.url.href}
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
  );
};
