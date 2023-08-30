/**
 * @file filterCtaMessages.ts
 */

import { ICtaFilterProps, ICtaMessage } from '@interfaces/cta';

/**
 * Determine if a message should be used based on filterProps.
 *
 * @param filterProps - Properties to compare to for filter targeting.
 */
export const filterCtaMessages =
  (filterProps: ICtaFilterProps) => (message: ICtaMessage) => {
    const { targetContent, targetCategories, targetPrograms } = message;
    const isTargeted = targetContent || targetCategories || targetPrograms;
    let contentMatched = false;
    let categoriesMatched = false;
    let programsMatched = false;

    // Always use messages that are not target.
    if (!isTargeted) return true;

    // Check Content Targets.
    if (targetContent?.length) {
      contentMatched =
        !!filterProps?.id &&
        targetContent.map((item) => item.id).includes(filterProps.id);
    }

    // Check Category Targets.
    if (targetCategories?.length) {
      const filterPropsCategories = filterProps?.categories || [];
      const combinedCategories = new Set([
        ...targetCategories.map((item) => item.id),
        ...filterPropsCategories
      ]);

      categoriesMatched =
        [...combinedCategories].length === targetCategories.length;
    }

    // Check Program Target.
    if (targetPrograms) {
      const filterPropsPrograms = filterProps?.programs || [];
      const combinedCategories = new Set([
        ...targetPrograms.map((item) => item.id),
        ...filterPropsPrograms
      ]);

      programsMatched =
        [...combinedCategories].length === targetPrograms.length;
    }

    // Use message if any of the targeting matched.
    return contentMatched || categoriesMatched || programsMatched;
  };
