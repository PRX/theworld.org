/**
 * @file Newsletter.tsx
 * Component for newsletter  elements.
 */

import React, { ChangeEvent, FormEvent, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import {
  Box,
  Button,
  ButtonProps,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  ThemeProvider,
  Typography
} from '@material-ui/core';
import { useAmp } from 'next/amp';
import { CheckCircleOutlineSharp, SendSharp } from '@material-ui/icons';
import { newsletterTheme } from './Newsletter.styles';

export interface INewsletterData {
  emailAddress?: string;
  name?: string;
}

export interface ICustomFields {
  [k: string]: string;
}

export interface INewsletterOptions {
  listId: string;
  [k: string]: string;
}

const defaultOptions: INewsletterOptions = {
  listId: '04472db22d3fa6920bb38f18358b0f72',
  'source-list': 'tw-daily-newsletter',
  'source-placement': 'end-of-story-engagement'
};

export const submitSubscription = (
  { name, emailAddress }: INewsletterData,
  options: INewsletterOptions
) => {
  const { listId, ...other } = {
    ...defaultOptions,
    ...options,
    source: 'website'
  };
  const customFields = Object.entries(other).map(([Key, Value]) => ({
    Key,
    Value
  }));
  const payload = {
    listId,
    name,
    emailAddress,
    customFields
  };
  return fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(r => r.json());
};

export const validateEmailAddress = (emailAddress: string) =>
  !!emailAddress?.match(/^\S+@\S+(?:\.\S+)+$/);

export interface INewsletterProps {
  label?: string;
  options?: INewsletterOptions;
  onSubscribed?: Function;
  buttonProps?: ButtonProps;
}

export const Newsletter = ({
  label,
  onSubscribed,
  options,
  buttonProps = {}
}: INewsletterProps) => {
  const [data, setData] = useState({
    name: '',
    emailAddress: ''
  } as INewsletterData);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [optedIn, setOptedIn] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const emailError = !!error && !!error.message.match(/\bemail\b/i);
  const readyToSubmit = optedIn && validateEmailAddress(data.emailAddress);
  const icon = (submitted && (
    <CircularProgress color="inherit" size={20} />
  )) || <SendSharp />;
  const isAmp = useAmp();

  const handleChangeEmailAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      ...(e.target && { emailAddress: e.target.value })
    });
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      ...(e.target && { name: e.target.value })
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setData({
      name: '',
      emailAddress: ''
    });
    setOpen(false);
    if (subscribed && onSubscribed) {
      onSubscribed();
    }
  };

  const handleOptIn = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setOptedIn(checked);
  };

  const handleSubscribe = async () => {
    const resp = await submitSubscription(data, {
      ...options,
      ...(isAmp && { 'source-position': `${options['source-position']}-amp` })
    });
    const { error: err } = resp;

    if (err) {
      setError(err);
    } else {
      setError(null);
      setSubscribed(true);
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
    <ThemeProvider theme={newsletterTheme}>
      <Button
        {...{
          variant: 'contained',
          color: 'primary',
          ...buttonProps
        }}
        onClick={handleOpen}
      >
        {label || 'Subscribe'}
      </Button>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          {!subscribed && (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Grid
                container
                spacing={4}
                justify="center"
                alignContent="center"
              >
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="subscriber-name"
                    type="text"
                    label="Name"
                    value={data.name}
                    onChange={handleChangeName}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
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
                </Grid>
              </Grid>
            </form>
          )}
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
                      <strong>Thank you{data.name && `, ${data.name}`}!</strong>{' '}
                      You mean the world to us.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {!subscribed && (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!readyToSubmit}
                disableElevation={submitted || subscribed}
                endIcon={icon}
                onClick={handleSubmit}
              >
                Subscribe
              </Button>
            </>
          )}
          {subscribed && (
            <Button variant="contained" color="primary" onClick={handleClose}>
              Done
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
