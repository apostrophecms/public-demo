# Apostrophe 3 demo and test project

## Get started

Install dependencies with `npm install`.

If you are doing local development on Apostrophe core and want to use the demo for that you will need to link it to this project. In whatever local directory you keep your dev work in, run:
1. `git clone git@github.com:apostrophecms/apostrophe.git && cd apostrophe`
2. `git fetch && git checkout 3.0` to get on the correct starting branch.
3. Start a new feature branch for your work. The core team convention has been to start 3.0 branch names with `3/`.
4. `npm link` to set Apostrophe up for linking in the project.
5. Back in the `a3-demo` project, link up Apostrophe: `npm link apostrophe`.
6. Add your first user with `node app @apostrophecms/user:add admin admin`.

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode."

## Analyzing bundle size

It is possible to analyze the size of the admin UI webpack bundle:

```
APOS_BUNDLE_ANALYZER=1 node app @apostrophecms/asset:build
```

This will display a visualization in your browser.

As of this writing, we are not optimizing the webpack build for production, so expect to see big numbers.
