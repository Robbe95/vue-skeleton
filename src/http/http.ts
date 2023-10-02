import type { Axios, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import { z } from 'zod'

interface CustomizedError {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  error: z.ZodError
}

interface CreateHttpZodClientOptions {
  axios: Axios
  onZodError: (error: CustomizedError) => void
}

interface CreateHttpZodClientReturnType {
  get: <T extends z.ZodType>(options: GetOptions<T>) => Promise<z.infer<T>>
  post: <T extends z.ZodType>(options: PostOptions<T>) => Promise<z.infer<T>>
  put: <T extends z.ZodType>(options: PutOptions<T>) => Promise<z.infer<T>>
  delete: <T extends z.ZodType>(options: DeleteOptions<T>) => Promise<z.infer<T>>
  setHeader: (key: string, value: string) => void
}

interface GetOptions<T extends z.ZodType> {
  url: string
  responseSchema: T
  config?: AxiosRequestConfig<any>
}

interface PostOptions<T extends z.ZodType> {
  url: string
  data: any
  responseSchema: T
  config?: AxiosRequestConfig<any>
}

interface PutOptions<T extends z.ZodType> {
  url: string
  data: any
  responseSchema: T
  config?: AxiosRequestConfig<any>
}

interface DeleteOptions<T extends z.ZodType> {
  url: string
  data?: any
  responseSchema?: T
  config?: AxiosRequestConfig<any>
}

export function createHttpZodClient(
  { axios, onZodError }: CreateHttpZodClientOptions,
): CreateHttpZodClientReturnType {
  function setHeader(key: string, value: string): void {
    axios.defaults.headers.common[key] = value
  }
  const get = async <T extends z.ZodType>(options: GetOptions<T>): Promise<z.infer<T>> => {
    const { config, url, responseSchema } = options

    const { data } = await axios.get(url, config)

    try {
      return responseSchema.parse(data)
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        onZodError({
          method: 'get',
          url,
          error,
        })

        return data
      }

      throw error
    }
  }

  const post = async <T extends z.ZodType>(options: PostOptions<T>): Promise<z.infer<T>> => {
    const {
      url,
      data,
      config,
      responseSchema,
    } = options

    const { data: responseData } = await axios.post(url, data, config)

    try {
      return responseSchema.parse(responseData)
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        onZodError({
          method: 'post',
          url,
          error,
        })

        return responseData
      }

      throw error
    }
  }

  const put = async <T extends z.ZodType>(options: PutOptions<T>): Promise<z.infer<T>> => {
    const {
      url,
      data,
      config,
      responseSchema,
    } = options

    const { data: responseData } = await axios.put(url, data, config)

    try {
      return responseSchema.parse(responseData)
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        onZodError({
          method: 'put',
          url,
          error,
        })

        return responseData
      }

      throw error
    }
  }

  const del = async <T extends z.ZodType>(options: DeleteOptions<T>): Promise<z.infer<T>> => {
    const {
      url,
      config,
      data,
      responseSchema,
    } = options

    const { data: responseData } = await axios.delete(url, {
      ...(config ?? {}),
      data,
    })

    if (!responseSchema)
      return

    try {
      return responseSchema.parse(responseData)
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        onZodError({
          method: 'delete',
          url,
          error,
        })

        return responseData
      }

      throw error
    }
  }

  return {
    get,
    post,
    put,
    delete: del,
    setHeader,
  }
}

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
})

export const http = createHttpZodClient({
  axios: customAxios,
  onZodError: ({ url, method, error }) => {
    console.error(`Zod error on ${method.toUpperCase()} ${url}`)
    console.error(error)
  },
})
