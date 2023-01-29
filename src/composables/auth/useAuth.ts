import type { ComputedRef, Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import axios, { AxiosError } from 'axios'
import type { User } from '@/models/user.model'
import { userSchema } from '@/models/user.model'
import type { Auth } from '@/models/auth.model'
import { authSchema } from '@/models/auth.model'

import { useHttp } from '@/http/useHttp'

enum GrantType {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
}

interface UseAuth {
  isAuthenticated: ComputedRef<boolean>
  user: Ref<User | null>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  invalidateToken: () => Promise<void>
  getUser: () => Promise<User>
}

interface Options {
  clientId: string
  clientSecret: string
  baseURL: string
}

const options: Options = {
  baseURL: import.meta.env.VITE_AUTH_URL,
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
  clientSecret: import.meta.env.VITE_AUTH_CLIENT_SECRET,
}

const user = ref<User | null>(null)
const isAuthenticated = computed(() => user.value !== null)
let refreshTokenTimeout: ReturnType<typeof setTimeout> | null = null

const oAuth = ref<Auth | null>(localStorage.getItem('oAuth') !== undefined
  ? JSON.parse(localStorage.getItem('oAuth') as string)
  : null,
)

watch((oAuth), (oAuth) => {
  axios.defaults.headers.common.Authorization = oAuth === null ? '' : `Bearer ${oAuth.accessToken}`
  localStorage.setItem('oAuth', JSON.stringify(oAuth))
}, { immediate: true })

export default (): UseAuth => {
  const http = useHttp()
  const setRefreshTokenTimeout = (): void => {
    if (refreshTokenTimeout !== null)
      clearTimeout(refreshTokenTimeout)

    if (oAuth.value === null)
      throw new Error('Attempted to call `setRefreshTokenTimeout()` when `oAuth` is null')

    const timeoutMs = oAuth.value.expiresAt - Date.now() - 60 * 1000

    if (timeoutMs > 0) {
      refreshTokenTimeout = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        refreshToken()
      }, timeoutMs)
    }
    else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      refreshToken()
    }
  }

  const signIn = async (email: string, password: string): Promise<void> => {
    const data = await http.post({
      url: `${options.baseURL}/oauth/token`,
      data: {
        password,
        username: email,
        grantType: GrantType.PASSWORD,
        clientId: options.clientId,
        clientSecret: options.clientSecret,
      },
      schema: authSchema,
    })

    oAuth.value = {
      ...data,
      expiresAt: Date.now() + data.expiresIn * 1000,
    }

    setRefreshTokenTimeout()
  }

  const refreshToken = async (): Promise<void> => {
    const data = await http.post({
      url: `${options.baseURL}/oauth/token`,
      data: {
        grantType: GrantType.REFRESH_TOKEN,
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        refreshToken: oAuth.value?.refreshToken,
      },
      schema: authSchema,
    })

    oAuth.value = {
      ...data,
      expiresAt: Date.now() + data.expiresIn * 1000,
    }

    setRefreshTokenTimeout()
  }

  const invalidateToken = async (): Promise<void> => {
    await axios({
      url: `/oauth/invalidate?token=${oAuth.value?.accessToken as string}`,
      baseURL: options.baseURL,
    })
  }

  const signOut = (): void => {
    oAuth.value = null
    user.value = null

    if (refreshTokenTimeout !== null)
      clearTimeout(refreshTokenTimeout)
  }

  const getUser = async (): Promise<User> => {
    if (oAuth.value === null)
      throw new Error('Not logged in')
    const data = await http.get({
      url: `${options.baseURL}/users/me`,
      schema: userSchema,
    })
    user.value = data
    return data
  }

  axios.interceptors.response.use(
    r => r,
    async (e) => {
      if (e instanceof AxiosError) {
        const status = e.response?.status ?? null

        if (status === 401 && oAuth.value !== null) {
          try {
            await refreshToken()

            return await axios.request({
              ...e.config,
              headers: {
                Authorization: `Bearer ${oAuth.value.accessToken}`,
              },
            })
          }
          catch (_) {
            oAuth.value = null
          }
        }
      }

      return await Promise.reject(e)
    })

  if (oAuth.value !== null)
    setRefreshTokenTimeout()

  return {
    isAuthenticated,
    user,
    signIn,
    signOut,
    invalidateToken,
    getUser,
  }
}
