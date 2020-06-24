/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import { Component } from 'react';
import { IPriApiResource } from 'pri-api-library/types';

export interface IPageComponent extends Component {
  data: IPriApiResource;
}
