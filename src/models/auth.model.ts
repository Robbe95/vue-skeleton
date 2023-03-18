import { z } from 'zod'

export const authSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  expires_at: z.number().nullish(),
  refresh_token: z.string(),
  scope: z.string().nullish(),
  token_type: z.string(),
})

export type Auth = z.infer<typeof authSchema>
