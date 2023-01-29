import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string().optional(),
  role: z.string(),
})

export type User = z.infer<typeof userSchema>
