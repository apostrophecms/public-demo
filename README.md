# Apostrophe 3 demo and test project

## Get started

1. Install dependencies with `npm install`.
2. Add your first user with `node app @apostrophecms/user:add {MY_USERNAME} admin`.

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode."

## Local development
If you are doing local development on Apostrophe core and want to use the demo for that you will need to link it to this project. In whatever local directory you keep your dev work in, run:
1. `git clone git@github.com:apostrophecms/apostrophe.git && cd apostrophe`
2. Start a new feature branch for your work.
3. `npm link` to set Apostrophe up for linking in the project.
4. Back in the `a3-demo` project, link up Apostrophe: `npm link apostrophe`.
## Analyzing bundle size

It is possible to analyze the size of the admin UI webpack bundle:

```
APOS_BUNDLE_ANALYZER=1 node app @apostrophecms/asset:build
```

This will display a visualization in your browser.

As of this writing, we are not optimizing the webpack build for production, so expect to see big numbers.
