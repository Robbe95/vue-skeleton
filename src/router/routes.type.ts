export enum Routes {
  INDEX = 'index',
  EXAMPLE_INDEX = 'example-index',
  LOGIN = 'login',
  EXAMPLE_TABLE = 'example-table',
  EXAMPLE_FORM = 'example-form',
}
export interface Route {
  path: string
  component: () => Promise<unknown>
  children?: Route[]
  name?: Routes
}
