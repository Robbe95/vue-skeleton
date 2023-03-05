import { AuthRoutes } from '@/modules/auth/router/auth.routes.type'
import { ExampleRoutes } from '@/modules/example/router/example.routes.type'

export enum GlobalRoutes {
  INDEX = 'index',
}

export const Routes = {
  ...GlobalRoutes,
  ...AuthRoutes,
  ...ExampleRoutes,
}

export interface Route {
  path: string
  component: () => Promise<unknown>
  children?: Route[]
  name?: typeof Routes[keyof typeof Routes]
}
