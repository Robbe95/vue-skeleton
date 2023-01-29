import axios from 'axios'
import type { ZodType, z } from 'zod'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const useHttp = () => {
  const checkResponseSchema = <T extends ZodType>(response: z.infer<T>, schema: T): z.infer<T> => {
    const parsed = schema.parse(response)
    return parsed
  }

  const get = async <T extends ZodType>(url: string, schema?: T) => {
    const response = await axiosInstance.get(url)
    if (!schema)
      return response.data as z.infer<T>
    const parsed = checkResponseSchema(response.data, schema)
    return parsed as z.infer<T>
  }

  const post = async <T extends ZodType>(url: string, data: any, schema?: T) => {
    const response = await axiosInstance.post(url, data)
    if (!schema)
      return response.data as z.infer<T>
    const parsed = checkResponseSchema(response.data, schema)
    return parsed as z.infer<T>
  }

  const put = async <T extends ZodType>(url: string, data: any, schema?: T) => {
    const response = await axiosInstance.put(url, data)
    if (!schema)
      return response.data as z.infer<T>
    const parsed = checkResponseSchema(response.data, schema)
    return parsed as z.infer<T>
  }

  return {
    get,
    post,
    put,
  }
}
