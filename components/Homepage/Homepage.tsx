/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import React, { Component } from 'react';
import Link from 'next/link';
import ContentContext from '@contexts/ContentContext';

class Homepage extends Component {
  render() {
    const {
      data: { links }
    } = this.context;

    return (
      <>
        <h1>Hello, The World!</h1>
        <p>Homepage coming soon...</p>
        {links && (
          <ul>
            {links.map(({ href, label }) => (
              <li key={ label }>
                <Link href={href} as={href.query.alias}><a>{label}</a></Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

Homepage.contextType = ContentContext;

export default Homepage;
