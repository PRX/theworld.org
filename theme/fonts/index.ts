/**
 * Export font definitions.
 */

import {
  Alegreya,
  Montserrat,
  Open_Sans as OpenSans,
  Source_Sans_3 as SourceSans3
} from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  fallback: [
    '"Helvetica Neue"',
    'Helvetica',
    'Arial',
    '"Nimbus Sans L"',
    'sans-serif'
  ]
});

export const sourceSans3 = SourceSans3({
  subsets: ['latin'],
  fallback: [
    "'Helvetica Neue'",
    'Helvetica',
    'Arial',
    "'Nimbus Sans L'",
    'sans-serif'
  ]
});

export const openSans = OpenSans({
  subsets: ['latin'],
  fallback: [
    "'Helvetica Neue'",
    'Helvetica',
    'Arial',
    "'Nimbus Sans L'",
    'sans-serif'
  ]
});

export const alegreya = Alegreya({
  subsets: ['latin'],
  fallback: ['serif']
});
