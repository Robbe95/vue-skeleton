import { z } from 'zod'
export const envSchema = z.object({
  VITE_API_URL: z.string().nonempty(),
})
export const buildParseEnv = (env: NodeJS.ProcessEnv): any => {
  return {
    name: 'env-parser',
    config(_: any, { command }: any): any {
      if (command === 'build')
        envSchema.parse(env)
    },
  }
}
