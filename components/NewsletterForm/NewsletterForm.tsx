/**
 * @file Newsletter.tsx
 * Component for newsletter  elements.
 */

import React, { ChangeEvent, FormEvent, useState, HTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import {
  Box,
  Button,
  IconButton,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  ThemeProvider,
  Typography
} from '@material-ui/core';
import { useAmp } from 'next/amp';
import { CheckCircleOutlineSharp, SendSharp } from '@material-ui/icons';
import { INewsletterOptions, INewsletterData } from '@interfaces/newsletter';
import { postNewsletterSubsciption } from '@lib/fetch/api';
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
  const [data, setData] = useState({
    name: '',
    emailAddress: ''
  } as INewsletterData);
  const [error, setError] = useState(null);
  const [optedIn, setOptedIn] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const emailError = !!error && !!error.message.match(/\bemail\b/i);
  const readyToSubmit = optedIn && validateEmailAddress(data.emailAddress);
  const icon = (submitted && (
    <CircularProgress color="inherit" size={20} />
  )) || <SendSharp />;
  const isAmp = useAmp();
  const classes = newsletterFormStyles({ compact });
  const cx = classNames.bind(classes);

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
    const resp = await postNewsletterSubsciption(data, {
      ...options,
      ...(isAmp && { 'source-position': `${options['source-position']}-amp` })
    });
    const { error: err } = resp;

    if (err) {
      setError(err);
    } else {
      setError(null);
      setSubscribed(true);
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
        className={cx(className, 'root')}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Box className={cx('layout')}>
          <Box>
            <TextField
              id="subscriber-emailAddress"
              type="email"
              label="Email Address"
              value={data.emailAddress}
              onChange={handleChangeEmailAddress}
              error={emailError}
              helperText={emailError && error.message}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box>
            {(compact && (
              <IconButton
                color="primary"
                onClick={handleSubmit}
                disabled={!readyToSubmit}
              >
                {icon}
              </IconButton>
            )) || (
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={!readyToSubmit}
                disableElevation={submitted || subscribed}
                endIcon={icon}
                onClick={handleSubmit}
              >
                {label || 'Subscribe'}
              </Button>
            )}
          </Box>
          <Box className={cx('optin')}>
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
      {subscribed && (
        <Grid container spacing={4} justify="center" alignContent="center">
          <Grid item xs={12}>
            <Box
              display="grid"
              gridTemplateColumns="min-content 1fr"
              gridGap={16}
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <CheckCircleOutlineSharp
                  color="primary"
                  style={{ fontSize: '5rem' }}
                />
              </Box>
              <Box>
                <Typography variant="overline">
                  You&apos;re Subscribed
                </Typography>
                <Typography>
                  <strong>Thank you!</strong> You mean the world to us.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
};
