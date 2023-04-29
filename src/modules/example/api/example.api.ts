import { http } from '@/http/http'
import type { Fact } from '@/modules/example/models/facts.model'
import { factSchema } from '@/modules/example/models/facts.model'

export const getFacts = async (): Promise<Fact[]> => {
  const response = await http.get({
    url: '/facts',
    schema: factSchema.array(),
  })
  return response
}
