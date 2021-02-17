# Apostrophe 3 demo and test project

## Get started

Install dependencies with `npm install`.

If you are doing local development on Apostrophe core and want to use the demo for that you will need to link it to this project. In whatever local directory you keep your dev work in, run:
1. `git clone git@github.com:apostrophecms/apostrophe.git && cd apostrophe`
2. `git fetch && git checkout 3.0` to get on the correct starting branch.
3. Start a new feature branch for your work. The core team convention has been to start 3.0 branch names with `3/`.
4. `npm link` to set Apostrophe up for linking in the project.
5. Back in the `a3-demo` project, link up Apostrophe: `npm link apostrophe`.

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode."

## Analyzing bundle size

It is possible to analyze the size of the admin UI webpack bundle:

```
APOS_BUNDLE_ANALYZER=1 node app @apostrophecms/asset:build
```

This will display a visualization in your browser.

As of this writing, we are not optimizing the webpack build for production, so expect to see big numbers.

## Apostrophe Storybook Component Library

### Run the UI Library

To spin up the UI component library (including to work on Apostrophe UI components) run `npm run storybook`. By default, the storybook library will run at http://localhost:9001.

### Deploying to the Static Site

```
$ npm run deploy-storybook
```

This script will run the build to the `.out` directory and trigger a deploy to the `gh-pages` branch.

### Using Vue Dev Tools with Storybook
Storybook operates in a number of layered iframes, obscuring Vue Dev Tools from reading your Vue states. You can use the standalone Electron Vue Dev Tool application to drill into your stories, just

```
$ npm install -g @vue/devtools
======================[100%]==
$ vue-devtools
```

And make sure the port your `vue-devtools` is looking for matches the one specified in Apostrophe core's `modules/@apostrophecms/storybook/template/.storybook/preview-head.html` (currently `http://localhost:8098`).

