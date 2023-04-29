import { z } from 'zod'

export const authSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.number(),
  expiresAt: z.number(),
})

export type Auth = z.infer<typeof authSchema>
