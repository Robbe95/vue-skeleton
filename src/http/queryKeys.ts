import { getFacts } from '@/modules/example/api/example.api'

export enum QueryKey {
  FACTS = 'facts',
}
export const queryFunctions: Record<QueryKey, any> = {
  [QueryKey.FACTS]: getFacts,
}
