/**
 * @file CtaMessageDonation.tsx
 * Component for donation CTA messages.
 */

import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  ButtonProps,
  Typography,
  ThemeProvider
} from '@mui/material';
import { HtmlContent } from '@components/HtmlContent';
import { ICtaMessageProps } from '@interfaces/cta';
import { handleButtonClick } from '@lib/routing';
import { ctaMessageDonationTheme } from './CtaMessageDonation.styles';

export const CtaMessageDonation = ({ data }: ICtaMessageProps) => {
  const { heading, message, action, dismiss } = data;
  const hasActions = !!(action || dismiss);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'secondary',
    size: 'large',
    disableElevation: true
  };

  return (
    <ThemeProvider theme={ctaMessageDonationTheme}>
      <Card elevation={0}>
        {heading && <CardHeader title={heading} />}
        {message && (
          <CardContent>
            <Typography component="div" variant="body1">
              <HtmlContent html={message} />
            </Typography>
          </CardContent>
        )}
        {hasActions && (
          <CardActions>
            {action && (
              <Button {...actionAttrs} onClick={handleButtonClick(action.url)}>
                {action.name}
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </ThemeProvider>
  );
};
