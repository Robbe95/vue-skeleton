import type { UseQueryReturnType } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import { http } from '@/http/http'
import type { Fact } from '@/modules/example/models/facts.model'
import { factSchema } from '@/modules/example/models/facts.model'

export const getFacts = async (): Promise<Fact[]> => {
  return http.get({
    url: '/facts',
    schema: factSchema.array(),
  })
}

export const useFacts = (): UseQueryReturnType<Fact[], any> => {
  return useQuery({
    queryKey: ['facts'],
    queryFn: getFacts,
  })
}
