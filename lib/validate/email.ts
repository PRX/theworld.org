/**
 * @file email.ts
 * Helper functions to validate email addresses.
 */

/**
 * Check if string is a email address pattern.
 *
 * @param emailAddress Email address to validate.
 */
export const validateEmailAddress = (emailAddress: string) =>
  !!emailAddress?.match(/^\S+@\S+(?:\.\S+)+$/);
