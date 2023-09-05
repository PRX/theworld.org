/**
 * @file AppCtaMessageInfo.tsx
 * Component for app banner info CTA messages.
 */

import React from 'react';
import { handleButtonClick } from '@lib/routing';
import {
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
  ButtonProps
} from '@mui/material';
import { HtmlContent } from '@components/HtmlContent';
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
      <Grid container justifyItems="center" alignItems="center">
        <Grid item sm={12} md={hasActions ? 8 : 12} display="grid" gap={1}>
          {heading && <Typography variant="h2">{heading}</Typography>}
          {message && (
            <Typography component="div" variant="body1">
              <HtmlContent html={message} />
            </Typography>
          )}
        </Grid>
        {hasActions && (
          <Grid item sm={12} md={4}>
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
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
