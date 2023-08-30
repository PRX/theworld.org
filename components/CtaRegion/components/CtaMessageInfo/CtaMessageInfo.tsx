/**
 * @file CtaMessageInfo.tsx
 * Component for info CTA messages.
 */

import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  ButtonProps,
  Typography
} from '@mui/material';
import { HtmlContent } from '@components/HtmlContent';
import { ICtaMessageProps } from '@interfaces/cta';
import { handleButtonClick } from '@lib/routing';

export const CtaMessageInfo = ({ data }: ICtaMessageProps) => {
  const { heading, message, action, dismiss } = data;
  const hasActions = !!(action || dismiss);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    disableElevation: true
  };

  return (
    <Card elevation={0}>
      {heading && <CardHeader title={heading} />}
      {message && (
        <CardContent sx={{ '&:last-child': { paddingBlockEnd: 0 } }}>
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
  );
};
