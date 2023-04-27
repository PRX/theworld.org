/**
 * @file interfaces/contexts/appContext.interface.ts
 *
 * Interface for app context.
 */

export interface IAppContext {
  page: {
    resource: {
      type: string;
      id?: string;
    };
  };
  copyrightDate?: string | number;
}
