/**
 * @file Newsletter.tsx
 * Component for newsletter  elements.
 */

import React, { ChangeEvent, FormEvent, useState, HTMLAttributes } from 'react';
import {
  Box,
  Button,
  IconButton,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  ThemeProvider
} from '@mui/material';
import { useAmp } from 'next/amp';
import { SendSharp } from '@mui/icons-material';
import { INewsletterOptions, INewsletterData } from '@interfaces/newsletter';
import { postNewsletterSubscription } from '@lib/fetch/api';
import { validateEmailAddress } from '@lib/validate';
import {
  newsletterFormTheme,
  newsletterFormStyles
} from './NewsletterForm.styles';

export interface INewsletterProps extends HTMLAttributes<{}> {
  label?: string;
  options?: INewsletterOptions;
  onSubscribed?: Function;
  compact?: boolean;
}

export const NewsletterForm = ({
  label,
  onSubscribed,
  options,
  compact,
  className
}: INewsletterProps) => {
  const [data, setData] = useState<INewsletterData>();
  const [error, setError] = useState<{ message: string }>();
  const [optedIn, setOptedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const emailError =
    !!error && !!error.message && !!error.message.match(/\bemail\b/i);
  const readyToSubmit =
    optedIn && data && validateEmailAddress(data.emailAddress);
  const icon = (submitted && (
    <CircularProgress color="inherit" size={20} aria-label="Progress Bar" />
  )) || <SendSharp />;
  const isAmp = useAmp();
  const { classes, cx } = newsletterFormStyles({ compact: !!compact });

  const handleChangeEmailAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      ...(e.target && { emailAddress: e.target.value })
    });
  };

  const handleOptIn = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setOptedIn(checked);
  };

  const handleSubscribe = async () => {
    if (!data) return;

    const resp = await postNewsletterSubscription(data, {
      ...options,
      ...(isAmp &&
        options && { 'source-position': `${options['source-position']}-amp` })
    });
    const { error: err } = resp;

    if (err) {
      setError(err);
    } else {
      setError(undefined);
      if (onSubscribed) {
        onSubscribed();
      }
    }

    setSubmitted(false);
  };

  const handleSubmit = (e: FormEvent) => {
    // Prevent form submission refreshing page.
    e.preventDefault();

    if (!submitted) {
      setSubmitted(true);

      if (optedIn) {
        handleSubscribe();
      }
    }
  };

  return (
    <ThemeProvider theme={newsletterFormTheme}>
      <form
        className={cx(className, classes.root)}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Box className={classes.layout}>
          <Box>
            <TextField
              type="email"
              id="email"
              label="Email Address"
              value={data?.emailAddress}
              onChange={handleChangeEmailAddress}
              error={emailError}
              helperText={emailError && error.message}
              variant="outlined"
              size={compact ? 'small' : 'medium'}
              fullWidth
            />
          </Box>
          <Box>
            {(compact && (
              <IconButton
                color="primary"
                size="small"
                onClick={handleSubmit}
                disabled={!readyToSubmit}
                aria-label={label || 'Sign Up'}
              >
                {icon}
              </IconButton>
            )) || (
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={!readyToSubmit}
                disableElevation={submitted}
                endIcon={icon}
                onClick={handleSubmit}
              >
                {label || 'Sign Up'}
              </Button>
            )}
          </Box>
          <Box className={classes.optin}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={optedIn}
                  onChange={handleOptIn}
                />
              }
              label={
                <em>
                  I have read and agree to your{' '}
                  <a
                    href="https://www.pri.org/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                  .
                </em>
              }
            />
          </Box>
        </Box>
      </form>
    </ThemeProvider>
  );
};
