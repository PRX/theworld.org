/**
 * @file CtaMessageNewsletter.tsx
 * Component for newsletter CTA messages.
 */

import React, { useState } from 'react';
import {
  Box,
  ButtonProps,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Typography,
  ThemeProvider
} from '@material-ui/core';
import { CheckCircleOutlineSharp } from '@material-ui/icons';
import { NewsletterForm } from '@components/NewsletterForm';
import { ICtaMessageProps } from '@interfaces/cta';
import { ctaMessageNewsletterTheme } from './CtaMessageNewsletter.styles';

export const CtaMessageNewsletter = ({ data }: ICtaMessageProps) => {
  const [subscribed, setSubscribed] = useState(false);
  const {
    heading,
    message,
    action = {
      name: 'Subscribe'
    },
    newsletterOptions
  } = data;
  const hasActions = !!action;
  const actionAttrs: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    disableElevation: true
  };

  const handleSubscribed = () => {
    setSubscribed(true);
  };

  return (
    <ThemeProvider theme={ctaMessageNewsletterTheme}>
      <Card elevation={0}>
        {heading && <CardHeader title={heading} />}
        {message && (
          <CardContent>
            <Typography
              component="div"
              variant="body1"
              /* eslint-disable-next-line */
              dangerouslySetInnerHTML={{ __html: message }}
            />
          </CardContent>
        )}
        {hasActions && (
          <>
            <Divider />
            <CardActions>
              {!subscribed && (
                <NewsletterForm
                  label={action && action.name}
                  options={newsletterOptions}
                  onSubscribed={handleSubscribed}
                />
              )}
              {subscribed && (
                <Grid
                  container
                  spacing={4}
                  justify="center"
                  alignContent="center"
                >
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
            </CardActions>
          </>
        )}
      </Card>
    </ThemeProvider>
  );
};
