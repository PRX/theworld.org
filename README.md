# theworld.org
React/Next.js Frontend for theworld.org.

## Gettings Started

Make sure you have __node__, __NPM__, __yarn__, and __now__ installed and/or updated. Tested and required versions:
- `node` 12.0.0+ - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- `npm` 6.9.0+ - CLI used to manage node pages.
- `yarn` 1.17.3+ - Wrapper CLI for __npm__ that streamlines package retreival and management.
- `now` 17.0.0+ - CLI that provides tools for development server.

### Install node and NPM using NVM
It is recommended to install and update using _Node Version Manager_ (__nvm__). Follow [Installation and Update](https://github.com/nvm-sh/nvm/blob/master/README.md#installation-and-update) instructions to get started.

Once __nvm__ has been installed, use it to install the latest LTS release of __node__ and __nvm__ by running the following command in your terminal:
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

## Routing

Next.js [dynamically creates app routes](https://nextjs.org/docs/routing/introduction) based on the files in `./pages` directory. This is great if this were a new site delivering new content. We have a __huge__ amount of existing content, from a mutitude of source, with inconsitent URL's that don't contain the information needed to look up the content to be displayed, which we have to continue to support for SEO and analytics reasons. Setting up a `./pages/stories/[id].tsx` component file is not going to work. (Trust me. It was the first thing I tried.)




