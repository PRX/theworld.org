/**
 * Sanitize a string for meta tag content.
 * @param content Content string to sanitize.
 * @returns Sanitized string or undefined.
 */
export const sanitizeContent = (content: string) =>
  content?.replace(/<[^>]+>/g, '');
