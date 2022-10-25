/**
 * @file filterCtaMessages.ts
 */

import { ICtaFilterProps, ICtaMessage } from '@interfaces/cta';

/**
 * Determine if a message should be used based on filterProps.
 *
 * @param filterProps - Properties to compare to for filter targeting.
 *
 * @return {object|null} - Returns array filter callback to filter CTA message.
 */
export const filterCtaMessages = (filterProps: ICtaFilterProps) => (
  message: ICtaMessage
) => {
  const { targetContent, targetCategories, targetProgram } = message;
  const isTargeted = targetContent || targetCategories || targetProgram;
  let contentMatched = false;
  let categoriesMatched = false;
  let programMatched = false;

  // Always use messages that are not target.
  if (!isTargeted) return true;

  // Check Content Targets.
  if (targetContent?.length) {
    contentMatched =
      !!filterProps?.id && targetContent.includes(filterProps.id);
  }

  // Check Category Targets.
  if (targetCategories?.length) {
    const filterPropsCategories = filterProps?.categories || [];
    const combinedCategories = new Set([
      ...targetCategories,
      ...filterPropsCategories
    ]);

    categoriesMatched =
      [...combinedCategories].length !==
      targetCategories.length + filterPropsCategories.length;
  }

  // Check Program Target.
  if (targetProgram) {
    programMatched = targetProgram === filterProps?.program;
  }

  // Use message if any of the targeting matched.
  return contentMatched || categoriesMatched || programMatched;
};
