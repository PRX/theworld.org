# theworld.org

React/Next.js Frontend for theworld.org. A daily world news public media program.

## Gettings Started

Make sure you have **node**, **NPM**, **yarn**, and **now** installed and/or updated. Tested and required versions:

- `node` 20.0.0+ - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- `npm` 10.0.0+ - CLI used to manage node pages.
- `yarn` 1.22.0+ - Wrapper CLI for **npm** that streamlines package retrieval and management.

### Install Node and NPM using NVM

It is recommended to install and update using _asdf_. Follow [Getting Started](https://asdf-vm.com/guide/getting-started.html) guide for installation instructions.

Once **asdf** has been installed, use it to install the configured version of **node** and **npm** by running the following command in your terminal:

```bash
asdf install
```

### Install Yarn

To install **yarn**, follow their [Installation](https://yarnpkg.com/lang/en/docs/install/#mac-stable) instructions for your OS. Install the _Stable_ version.

## Setup Development Environment

Now we are ready to clone this repo and get its packages installed and initialized. The following will create a `PRX` directory in your home directory and clone the repo into `~/PRX/theworld.org`:

```bash
cd ~
mkdir PRX
cd PRX
git clone git@github.com:PRX/theworld.org.git
cd theworld.org
```

> By default, development environments will pull API data from the dev staging environment. To pull data from the live API, in the `./config` directory, make a copy of `production.json` and rename it to `local.json`.

Now we need to make sure we are using the the version of _node_ need for the app:

```
nvm use
```

Now lets install all the packages required by the app:

```
yarn
```

Next we need to setup the environment variables:

```
cp .env.example .env.local
```

Update variable values as needed. Some features, like newsletter subscriptions will not work until a valid key is provided here.

Finally, lets spin up the development server:

```
yarn dev:start
```

Then open the app in your browser at [localhost:3000](http://localhost:3000).

> When you have your local Lando WordPress environment running, and need to develop features that require WordPress authentication cookies, you can use [the-world-wp.lndo.site:3000](http://the-world-wp.lndo.site:3000).

---

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
`@store` -> './store'
`@svg` -> `./assets/svg`
`@theme` -> `./theme`

> Additional aliases must be defined all of the following:
>
> - `./tsconfig.json`
> - `./jsconfig.json`
> - `./next.config.js`
> - `./jest.config.js`

### Module Exports

Component files should be organized in a module directory in `./components`. The module should include at least the component file and an index file. The component file should export the component as a named export.

> [Do not use default exports](https://basarat.gitbook.io/typescript/main-1/defaultisbad).

> **Exception**
> NextJS expects a default export page components in `./pages`. Append `// eslint-disable-line import/no-default-export` to to the export line to make file pass linting.

<small>_./components/MyComponent/MyComponent.tsx_</small>

```tsx
export const MyComponent = () => {
  return <h1>Hello World</h1>;
};
```

<small>_./components/MyComponent/index.ts_</small>

```ts
export * from './MyComponent';
```

<small>_./components/OtherComponent/OtherComponent.tsx_</small>

```tsx
import { MyComponent } from '@components/MyComponent';

export const OtherComponent = () => {
  return <MyComponent />;
};
```

Component files can include additional exports. Those exports should also be exported from the index file.

<small>_./components/MyComponent/MyComponent.tsx_</small>

```tsx
export interface MyComponentProps {
  title: string;
}

export const MyComponent = ({ title }: MyComponentProps) => {
  return <h1>{title}</h1>;
};
```

<small>_./components/MyComponent/index.ts_</small>

```ts
export * from './MyComponent';
```

<small>_./components/OtherComponent/OtherComponent.tsx_</small>

```tsx
import { MyComponent, type MyComponentProps } from '@components/MyComponent';

export const OtherComponent = () => {
  const props: MyComponentProps = {
    title: 'Hello World'
  };

  return <MyComponent {...props} />;
};
```

Component modules can have submodule directories. Submodules directories should follow the same export pattern. Submodule components should only be exported from the index file if they are intended to be used along with the main module component.

Type and interface exports for the main component and submodule components, and any functions or other variables needed for unit tests, should always by exported by the index file.

---

## Contexts

Application state and data can be passed to components via [Contexts](https://reactjs.org/docs/context.html). Components can export their own local contexts. Contexts used by the application or by multiple components should be defined in `./contexts`.

---

## Material UI & Theming

This project uses [Material UI](https://material-ui.com/) as the building blocks for components. When creating a coomponent, first review Material UI Components for something with similar behavior. From there use that components API to customize and theme.

Application level theming can be found in `./theme`. See [Material UI Theming](https://material-ui.com/customization/theming/).

When using a Material UI component not yet used in the application, customize theming of the component at the application level. Component specific theming for addition usage can then be done with a component theme.

Component styling should be done using the [Hook API](https://material-ui.com/styles/basics/#hook-api) for elements that are not Material UI components.

---

## Contributing

The process around contributing to this codebase and the workflow by which code changes are proposed and accepted into this project are documented [here](./.github/CONTRIBUTING.md).
