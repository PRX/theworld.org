/**
 * @file Sidebar.tsx
 * Component for sidebar elements.
 */

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { IPriApiResource } from 'pri-api-library/types';
import cookie from 'react-cookies';
import { ctaRegionStyles } from './CtaRegion.styles';
import { CtaRegionContext } from './CtaRegion.context';

export type CtaRegionVariant = 'banner' | 'load_under' | 'static';
const CtaRegionVariantDefault = 'static' as CtaRegionVariant;

export interface ICtaRegionProps {
  data: IPriApiResource[];
  variant?: CtaRegionVariant;
}

export const cookieKeyPrefix = 'cta_prompt-';

/**
 * Generate cookie key.
 *
 * @param name
 *    CTA region name.
 */
export const getCookieKey = (name: string) => `${cookieKeyPrefix}${name}`;

/**
 * Determine which (if any) of the messages should be shown.
 * Show first message that either:
 * - Cookie does NOT exist for key based on `name` prop.
 * - Cookie exists, but its value does NOT match `hash` prop.
 *
 * @return {object|null} - Message data object that should be rendered.
 */
const getShownMessage = (messages: IPriApiResource[]): IPriApiResource => {
  let message = null;

  if (messages) {
    message = messages.reduce((result, msg) => {
      const { name, hash } = msg;
      const cookieName = getCookieKey(name);
      const hashOld = cookie.load(cookieName);
      if (!result && (!hashOld || hashOld !== hash)) {
        return msg;
      }
      return result;
    }, null);
  }

  return message;
};

export const CtaRegion = ({
  data,
  variant = CtaRegionVariantDefault
}: ICtaRegionProps) => {
  const classes = ctaRegionStyles({});
  const isStatic = variant === CtaRegionVariantDefault;
  const [canRender, setCanRender] = useState(false);

  const shownMessage = (!isStatic
    ? getShownMessage(data)
    : data[0]) as IPriApiResource;

  useEffect(() => {
    setCanRender(true);
  }, []);

  console.log('CtaRegion > shownMessage', shownMessage);

  return (
    canRender && (
      <CtaRegionContext.Provider value={{ data }}>
        <Box
          component="aside"
          className="stretch"
          bgcolor="text.hint"
          color="background.paper"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height={300}
        >
          <Typography variant="overline">{variant}</Typography>
          <Typography variant="h5">{shownMessage.title}</Typography>
        </Box>
      </CtaRegionContext.Provider>
    )
  );
};
