/**
 * @file stories/[id].tsx
 * Page component for StoryPage.
 */
import React, { Component } from 'react';
import { NextPageContext } from 'next';

import { IPageComponent } from '@interfaces/page';
import ContentContext from '@contexts/ContentContext';
import Story from '@components/Story/Story';
import { fetchPriApiItem } from '@lib/fetch';

class StoryPage extends Component<IPageComponent> {

  static async getInitialProps(ctx: NextPageContext) {
    const { query: { id } } = ctx;
    const data = await fetchPriApiItem('node--stories', id as string);

    return { data };
  }

  render() {
    const { data } = this.props;

    return (
      <ContentContext.Provider value={{ data }}>
        <Story/>
      </ContentContext.Provider>
    );
  }
}

export default StoryPage;
