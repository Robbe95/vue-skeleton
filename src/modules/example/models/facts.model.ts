import { z } from 'zod'

export const factSchema = z.object({
  status: z.object({
    verified: z.boolean(),
    sentCount: z.number(),
  }),
  _id: z.string(),
  user: z.string(),
  text: z.string(),
  __v: z.number(),
  source: z.string(),
  updatedAt: z.string().transform(str => new Date(str)),
  type: z.number(),
  createdAt: z.string().transform(str => new Date(str)),
  deleted: z.boolean(),
  used: z.boolean(),
})

export type Fact = z.infer<typeof factSchema>
export type FactApi = z.input<typeof factSchema>
