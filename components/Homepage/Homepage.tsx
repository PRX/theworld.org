/**
 * @file Homepage.tsx
 * Component for Homepage.
 */
import React, { useContext } from 'react';
import Link from 'next/link';
import ContentContext from '@contexts/ContentContext';

const Homepage = () => {
  const {
    data: { links }
  } = useContext(ContentContext);

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
};

// Homepage.fetchData = async () => {
//   return {};
// }

export default Homepage;
