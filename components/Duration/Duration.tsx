/**
 * @file Duration.tsx
 * Component for displaying formatted time.
 */

import React, { HTMLAttributes } from 'react';
import { formatDuration } from '@lib/parse/time';

export interface IDurationProps extends HTMLAttributes<{}> {
  seconds: number;
}

export const Duration = ({ seconds, ...other }: IDurationProps) => (
  <time dateTime={`P${Math.round(seconds)}S`} {...other}>
    {formatDuration(seconds)}
  </time>
);
