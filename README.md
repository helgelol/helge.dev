# KUBES

This is a [Svelte](https://svelte.dev) app, with [Tailwind](https://tailwindcss.com/) for styling.  
Svelte is a lightweight javascript compiler, and only includes used components when built, so it's fast and small.

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
yarn
```

...then start [Rollup](https://rollupjs.org):

```bash
yarn dev
```

App should now be available on [localhost:5000](http://localhost:5000).

By default, the server will only respond to requests from localhost.  
To allow connections from other computers, edit the `sirv` commands  
in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
yarn build
```

You can run the newly built app with `npm run start`.  
This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies`  
so that the app will work when you deploy to platforms like [netlify](https://netlify.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`.  
This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes,  
sirv needs to be able to respond to requests for _any_ path.  
You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment,  
you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```
