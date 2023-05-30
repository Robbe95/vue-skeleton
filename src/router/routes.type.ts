import type { QueryKey } from '@/http/queryKeys'
import { AuthRoutes } from '@/modules/auth/router/auth.routes.type'
import { ExampleRoutes } from '@/modules/example/router/example.routes.type'

export enum GlobalRoutes {
  INDEX = 'index',
  MAIN = 'main',
  SIDEBAR = 'sidebar',
}

export const routeNames = {
  ...GlobalRoutes,
  ...AuthRoutes,
  ...ExampleRoutes,
}

export interface Route {
  path: string
  component: () => Promise<unknown>
  children?: Route[]
  name?: typeof routeNames[keyof typeof routeNames]
  meta?: {
    prefetchRoutes?: QueryKey[]
  }
}
