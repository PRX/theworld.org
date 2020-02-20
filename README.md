# theworld.org
React/Next.js Frontend for theworld.org.

## Gettings Started

Make sure you have __node__, __NPM__, __yarn__, and __now__ installed and/or updated. Tested and required versions:
- `node` 12.0.0+ - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- `npm` 6.9.0+ - CLI used to manage node pages.
- `yarn` 1.17.3+ - Wrapper CLI for __npm__ that streamlines package retreival and management.
- `now` 17.0.0+ - CLI that provides tools for development server.

### Install Node and NPM using NVM
It is recommended to install and update using _Node Version Manager_ (__nvm__). Follow [Installation and Update](https://github.com/nvm-sh/nvm/blob/master/README.md#installation-and-update) instructions to get started.

Once __nvm__ has been installed, use it to install the latest LTS release of __node__ and __npm__ by running the following command in your terminal:
```bash
nvm install --lts
```

### Install Yarn
To install __yarn__, follow their [Installation](https://yarnpkg.com/lang/en/docs/install/#mac-stable) instructions for your OS. Install the _Stable_ version.

### Install Now CLI
Install __now__ using the following __yarn__ command:
```bash
npm i -g now@latest
```

## Setup Development Environment

Now we are ready to clone this repo and get its packages installed and initialized. The following will create a `PRX` directory in your home directory and clone the repo into `~/PRX/theworld.org`:
```bash
cd ~
mkdir PRX
cd PRX
git clone git@github.com:PRX/theworld.org.git
cd theworld.org
```

> By default, development environments will pull API data from the dev staging environemt. To pull data from the live API, in the `./config` directory, make a copy of `production.json` and rename it to `local.json`.

Now we need to make sure we are using the the version of _node_ need for the app:
```
nvm use
```

Now lets install all the packages required by the app:
```
yarn
```

Finally, lets spin up the development server:
```
now dev
```

Then open the app in your browser at [localhost:3000]().

----

## Typescript and IDE

Yes, We are using typescript. This will require some extra steps to provide explicit types or interfaces for class components, and function parameters and return values. Types and interfaces specific to a component can be exported from the component file. Types and interfaces used by more than one component should be defined in `./interfaces` and organized into its own modeule directory. Module directories should include a `index.ts` that exports the exported entities from that modules interface files. An export should also be added to `./interfaces.index.ts` for the module.

It is highly recommended to use an IDE that either supports typescript or has a plugin for typescript. [Visual Studio Code](https://code.visualstudio.com/) is the preffered IDE at this time as project specific settings are provided for it for linting and formatting for javascript and typescript.

### Importing Module Exports

When importing module exports, do not use relative import paths for exports not local to the importing module. For example, when importing a function from `./lib` in your component in `./components/MyComponent`, use `import myFunction from '@lib/myFunction';` instead of `import myFunction from '../../lib/myFunction';`

#### Available Aliases
`@components` -> `./components`
`@contexts` -> `./contexts`
`@interfaces` -> `./interfaces`
`@lib` -> `./lib`
`@svg` -> `./assets/svg`
`@theme` -> `./theme`

> Additional aliases most be defined in both `./tsconfig.json` and `next.config.js`. Be sure to add the alias path to the `include` array in `./tsconfig.json`.

### Module Exports

Component files should be organized in a module directory in `./components`. The module should include at least the component file and an index file. The component file should export the component as its default. The index file should also export the main component as its default. This would result in the `MyComponent` described above being importable from simply `@components/MyComponent` instead of `components/MyComponent/MyComponent`.

<small>_./components/MyComponent/MyComponent.tsx_</small>
```tsx
export default () => {
  return <h1>Hello World</h1>;
};
```

<small>_./components/MyComponent/index.ts_</small>
```ts
export { default } from './MyComponent';
```

<small>_./components/OtherComponent/OtherComponent.tsx_</small>
```tsx
import MyComponent from '@components/MyComponent'
export default () => {
  return <MyComponent />;
}
```

Component files can include additional exports. Those exports should also be exported from the index file.

<small>_./components/MyComponent/MyComponent.tsx_</small>
```tsx
import { FunctionComponent } from 'react';

export interface IMyComponentProps {
  title: string
}

export default ({ title }): FunctionComponent<IMyComponentProps, {}>  => {
  return <h1>{title}</h1>;
};
```

<small>_./components/MyComponent/index.ts_</small>
```ts
export * from './MyComponent';
export { default } from './MyComponent';
```

<small style="margin-bottom: 0;">_./components/OtherComponent/OtherComponent.tsx_</small>
```tsx
import MyComponent, { IMyComponentProps } from '@components/MyComponent';

export default () => {
  const props: IMyComponentProps = {
    title: 'Hello World'
  };
  return <MyComponent {...props} />;
}
```

Conponent modules can have submodule directories. Submodules directies should follow the same export pattern. Submodule components should only be exported from the index file if they are intended to be used along with the main module component.

Type and interface exports for the main component and submodule components should always by exported by the index file.

----

## Contexts

Application state and data should be passed to components via [Contexts](https://reactjs.org/docs/context.html). Components can export their own local contexts. Contexts used by the application or by multiple components should be defined in `./contexts`.

----

## Routing

### Understanding the problem

NextJs [dynamically creates app routes](https://nextjs.org/docs/routing/introduction) based on the files in `./pages` directory. This is great if this were a new site delivering new content. However, we have a __huge__ amount of existing content, from a mutitude of source, with inconsitent URL's that don't contain the information needed to look up the content to be displayed. We have to continue to support __all__ URL's for SEO and analytics reasons. Setting up a `./pages/stories/[id].tsx` component file is not going to work. Trust me. It was the first thing I tried.

First instinct would be to setup a catch-all route that can lookup content by alias, map that content type to an app page, then rewrite to that page with the content id. Sounds like the job for a custm Express server, right? Unfortunately, no. Now deployments of NextJS application handles endpoints in a serverless pattern, and running a server from a serveless endpoint is not only ironic, but doesn't work as expected.

### The Solution

Let's work with what we have. Now CLI offers a dev env that mirrors deployment behavior, so if it works with that dev env, it should work on deploy. Lets start with routes setup via `./now.json`.

But what routes do we need. None of our content URL's adhere to any one pattern. There is one characteristic of a URL that makes things a little easier: they are _unique_ to the content they deliver from a data perspective. With a few exceptions for local app files and assets, we can assume all other URLs' pathnames are an alias for a page normally found on our Drupal CMS driven site. (This also assumes only requests for relevent front facing pages have been forward to this application. We shouldn't have to worry about admin pages, files, feeds, etc.) Now all we have to do is provide that alias as a query parameter to the one page that always works, `./pages/index.tsx`.

The index page will be our whole app. Instead of routing to another page, it will be a proxy for our content components, dynamically loading and rendering the content component for the data associated with the alias. This will require mapping to get the right content component loaded.

Mapping is handled in `./components/ResourceComponentMap.ts`. Content compnents are loaded using `next/dynamic` so pages don't have to import all pages components, just the one for that resource type. Simply add a dynamic import for your component, then add it to the `ResourceComponentMap` object, using the resource type as the key.

----

## Content Components

Content components are our top level component for a page. It is responsible for defining its render output, and a fetcher for the data it intends to render.

Content components should be written as function components. Lifecylce methods can be implements using [`useEffect` hook](https://reactjs.org/docs/hooks-reference.html#useeffect). It is also much easier to use multiple contexts with the [`useContext` hook](https://reactjs.org/docs/hooks-reference.html#usecontext).

### Content Context

Data fetched during alias resolution will be passed via the `data` property on the `ContentConext`. This allows any submodule components to gain access to the data without coupling via component properties.

### Properties and Methods

- __fetchData__ - _function_ - Fetch and return data the component will render. This will be used by the alias resolver to provide the data via the `data` property on the _ContentContext_. Optional.
  - **Paramater**
    - __id__ - _string | number_ - Identifier of the resource to load data for. Optional.
  - **Return** - Promise that returns the data.

### Example

```typescript
import React, { useContext } from 'react';
import Head from 'next/head';
import ContentContext from '@contexts/ContentContext';
import { fetchPriApiItem } from '@lib/fetch';

const Story = () => {
  const { data: { title } } = useContext(ContentContext);

  return (
    <>
      {/* Use Head component to set meta data. */}
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      {/* Render additional properties... */}
    </>
  );
}

Story.fetchData = async (id: string|number) => {
  return await fetchPriApiItem('node--stories', id, {
    fields: [
      'title'
    ]
  });
}

export default Story;
```

