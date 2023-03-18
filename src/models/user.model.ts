import { z } from 'zod'

export const userSchema = z.object({
  type: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
})

export type User = z.infer<typeof userSchema>
