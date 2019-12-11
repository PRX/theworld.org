/**
 * @file Story.default.tsx
 * Component for default Story layout.
 */

import { useContext } from 'react';
import Link from 'next/link';
import ContentContext from '@contexts/ContentContext';


const StoryDefault = () => {
  const { data: { title, id, teaser } } = useContext(ContentContext);

  return (
    <>
      <Link href="/">
        <a href="/">Home</a>
      </Link>
      <h1>{title}</h1>
      <dl>
        <dt>Story Id</dt>
        <dd>{id}</dd>

        <dt>Teaser</dt>
        <dd>{teaser}</dd>
      </dl>
    </>
  );
}

export default StoryDefault;
