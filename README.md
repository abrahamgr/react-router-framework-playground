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

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## Environment variables

`SESSION_SECRET`: secret to sign session cookies (only for Prod)
`JWT_SECRET`: secret to sign JWT, you can generate using `openssl rand -base64 32`
