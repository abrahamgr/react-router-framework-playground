import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  index('routes/index.tsx'),
  route('favorites', 'routes/favorites.tsx'),
  route('character/:id', 'routes/character.tsx'),
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signup.tsx'),
  route('search', 'routes/search.tsx'),
  ...prefix('api', [
    route('favorites', 'routes/api/favorites.ts'),
    route('theme', 'routes/api/theme.ts'),
  ]),
] satisfies RouteConfig
