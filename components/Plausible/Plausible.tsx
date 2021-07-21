/**
 * @file Plausible.tsx
 * Component for triggering Plausible events.
 */

import React, { useEffect } from 'react';
import { usePlausible } from 'next-plausible';

declare type Props = Record<string, unknown> | never;
declare type EventOptions<P extends Props> = {
  props: P;
  callback?: VoidFunction;
};
export type PlausibleEventArgs = [string, EventOptions<any>];
export interface IPlausibleProps {
  events: PlausibleEventArgs[];
}

export const Plausible = ({ events }: IPlausibleProps) => {
  const plausible = usePlausible();

  useEffect(() => {
    (events || []).forEach(args => plausible.apply(this, args));
  }, [events]);

  return null;
};
