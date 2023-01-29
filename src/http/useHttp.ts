import type { RawAxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { ZodType, z } from 'zod'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

interface HttpParams<T extends ZodType> {
  url: string
  schema?: T
  options?: RawAxiosRequestConfig<any> | undefined
  data?: any
}

export const useHttp = () => {
  const setHeader = (key: string, value: string) => {
    axiosInstance.defaults.headers.common[key] = value
  }

  const checkResponseSchema = <T extends ZodType>(response: z.infer<T>, schema: T): z.infer<T> => {
    const parsed = schema.parse(response)
    return parsed
  }

  const get = async <T extends ZodType>({ url, schema, options }: HttpParams<T>) => {
    const response = await axiosInstance.get(url, options)
    if (!schema)
      return response.data as z.infer<T>
    const parsed = checkResponseSchema(response.data, schema)
    return parsed as z.infer<T>
  }

  const post = async <T extends ZodType>({ url, schema, options, data }: HttpParams<T>) => {
    const response = await axiosInstance.post(url, data, options)
    if (!schema)
      return response.data as z.infer<T>
    const parsed = checkResponseSchema(response.data, schema)
    return parsed as z.infer<T>
  }

  const put = async <T extends ZodType>({ url, schema, options, data }: HttpParams<T>) => {
    const response = await axiosInstance.put(url, data, options)
    if (!schema)
      return response.data as z.infer<T>
    const parsed = checkResponseSchema(response.data, schema)
    return parsed as z.infer<T>
  }

  return {
    get,
    post,
    put,
    setHeader,
  }
}
