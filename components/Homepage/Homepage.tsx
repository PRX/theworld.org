/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import React, { Component } from 'react';
import Link from 'next/link';
import ContentContext from '@contexts/ContentContext';

class Homepage extends Component {

  render() {
    const { data: { title, id, teaser } } = this.context;

    return (
      <>
        <h1>Hello, The World!</h1>
        <p>Homepage coming soon...</p>
        <ul>
          <li>
            <Link href="/story/[id]" as="/story/183368?alias=/stories/2019-08-28/thousands-chilean-women-sued-discriminatory-health-insurance-can-reforms-fix-it">
              <a href="/stories/2019-08-28/thousands-chilean-women-sued-discriminatory-health-insurance-can-reforms-fix-it">Story 1</a>
            </Link>
          </li>
          <li>
            <Link href="/story/[id]" as="/story/183449?alias=/stories/2019-09-06/lead-colombian-elections-woman-mayoral-candidate-latest-assassination-victim">
              <a href="/stories/2019-09-06/lead-colombian-elections-woman-mayoral-candidate-latest-assassination-victim">Story 2</a>
            </Link>
          </li>
          <li>
            <Link href="/story/[id]" as="/story/183446?alias=/stories/2019-09-06/folk-trio-younguns-uses-music-question-british-patriotism">
              <a href="/stories/2019-09-06/folk-trio-younguns-uses-music-question-british-patriotism">Story 3</a>
            </Link>
          </li>
        </ul>
      </>
    );
  }
}

Homepage.contextType = ContentContext;

export default Homepage;
