/**
 * @file index.tsx
 * Exports the Home component.
 */

import React, { Component, ReactFragment } from 'react';
import Link from 'next/link';

class Home extends Component {
  /* istanbul ignore next */
  static async getInitialProps() {
    // TODO: Get home page content fom API.
    return {};
  }

  render() {
    return (
      <>
        <h1>Hello, The World!</h1>
        <p>Homepage coming soon...</p>
        <ul>
          <li>
            <Link href="/stories/[id]" as="/stories/183368?alias=/stories/2019-08-28/thousands-chilean-women-sued-discriminatory-health-insurance-can-reforms-fix-it">
              <a href="/stories/2019-08-28/thousands-chilean-women-sued-discriminatory-health-insurance-can-reforms-fix-it">Story 1</a>
            </Link>
          </li>
          <li>
            <Link href="/stories/[id]" as="/stories/183449?alias=/stories/2019-09-06/lead-colombian-elections-woman-mayoral-candidate-latest-assassination-victim">
              <a href="/stories/2019-09-06/lead-colombian-elections-woman-mayoral-candidate-latest-assassination-victim">Story 2</a>
            </Link>
          </li>
          <li>
            <Link href="/stories/[id]" as="/stories/183446?alias=/stories/2019-09-06/folk-trio-younguns-uses-music-question-british-patriotism">
              <a href="/stories/2019-09-06/folk-trio-younguns-uses-music-question-british-patriotism">Story 3</a>
            </Link>
          </li>
        </ul>
      </>
    );
  }
}

export default Home;
