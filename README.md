# ApostropheCMS Demo

## Get started

If you want to just fork this repo and go:

1. Make sure you have Node.js (22 or better, a current LTS release).
2. Make sure you have MongoDB. A MongoDB Atlas free tier account will work. If you're not running MongoDB on your own computer, set the `APOS_MONGODB_URI` environment variable.
3. Install dependencies with `npm install`.
4. Add your first user with `node app @apostrophecms/user:add {MY_USERNAME} admin`.

## Running the project during development

Run `npm run dev` to build the Apostrophe UI and start the site up.

Go to `http://localhost:3000/login` to log in and start editing.

## For more information

See the [documentation](https://apostrophecms.com/docs/) for more information.
