/**
 * @file Duration.tsx
 * Component for displaying formatted time.
 */

import React, { HTMLAttributes } from 'react';
import { formatDuration } from '@lib/parse/time';

export interface IDuarationProps extends HTMLAttributes<{}> {
  seconds: number;
}

export const Duration = ({ seconds, ...other }: IDuarationProps) => (
  <time dateTime={`P${Math.round(seconds)}S`} {...other}>
    {formatDuration(seconds)}
  </time>
);
