import { useHttp } from '@/http/useHttp'
import { factSchema } from '@/modules/example/models/facts.model'
const http = useHttp()

export const getFacts = async () => {
  const response = await http.get('facts', factSchema.array())
  return response
}
