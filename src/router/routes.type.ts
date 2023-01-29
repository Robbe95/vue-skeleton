export enum Routes {
  INDEX = 'index',
  EXAMPLE_INDEX = 'example-index',
  LOGIN = 'login',
}
export interface Route {
  path: string
  component: () => Promise<unknown>
  children?: Route[]
  name?: Routes
}
