/**
 * @file SidebarCtaMessageOptIn.tsx
 * Component for sidebar info CTA messages.
 */

import React, { useState } from 'react';
import {
  Button,
  ButtonProps,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Checkbox,
  Typography,
  FormControlLabel,
  Paper
} from '@mui/material';
import { HtmlContent } from '@components/HtmlContent';
import { ICtaMessageProps } from '@interfaces/cta';
import { handleButtonClick } from '@lib/routing';

export const SidebarCtaMessageOptIn = ({ data }: ICtaMessageProps) => {
  const { heading, message, optinLabel, action, dismiss } = data;
  const hasActions = !!(action || dismiss);
  const [optedIn, setOptedIn] = useState(false);
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    fullWidth: true,
    disableElevation: true,
    disabled: !optedIn
  };
  const handleOptInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptedIn(event.target.checked);
  };

  return (
    <Card elevation={0}>
      {heading && <CardHeader title={heading} />}
      {message && (
        <CardContent>
          <Typography component="div" variant="body1">
            <HtmlContent html={message} />
          </Typography>
        </CardContent>
      )}
      <CardContent>
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
      </CardContent>
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
