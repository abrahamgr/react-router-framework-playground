# Welcome to Remix!

- 📖 Initially created with [Remix](https://remix.run/docs)
- 🚀 Migrated to [React router](https://reactrouter.com/) framework

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Setup postgres db using docker:

```sh
npm run setup:dockerdb
```

Now you'll need to pick a host to deploy it to.

### Using docker

Build the image

```bash
docker build -t rick-morty-app .
```

Run a container

```bash
docker run --rm -p 3000:3000 --name rick-morty-app rick-morty-app
```

Adds `--rm` so the container is automatically removed when it stops


### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## Environment variables

`SESSION_SECRET`: secret to sign session cookies (only for Prod)

`JWT_SECRET`: secret to sign JWT

`DATABASE_URL`: postgres database url for connection

`PASSWORD_KEY`: secret key to hash passwords

**Note:** You can use `openssl rand -base64 32` to generate random string

## Drizzle

`npm run drizzle:generate`: create schema after make modification to drizzle schema.
Pass `--name` as parameter to specify changes:

```bash
npm run drizzle:generate -- --name initial_setup
```

`npm run drizzle:migrate`: migrate changes to DB using the migrations folder
