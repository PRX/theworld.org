/**
 * @file interfaces/content/content.interface.tsx
 * Interfaces for content.
 */

import React, { Component } from 'react';
import { IPriApiResource } from 'pri-api-library/types';

export interface IContentComponent extends Component {
  data: IPriApiResource
}
