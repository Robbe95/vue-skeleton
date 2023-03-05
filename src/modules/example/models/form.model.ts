import { z } from 'zod'

export const simpleForm = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export const nestedForm = z.object({
  username: z.string().min(1),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
  }),
})

export const conditionalForm = z.object({
  password: z.string().min(1),
}).and(z.object({
  username: z.string().min(1),
}).or(z.object({
  email: z.string().email(),
})))

export const conditionalArrayForm = z.object({
  addresses: z.array(
    z.object({
      street: z.string().min(1),
    }).and(z.object({
      number: z.string().min(1),
    }).or(z.object({
      postcode: z.string().min(1),
    }),
    )),
  ),
})

export type SimpleForm = z.infer<typeof simpleForm>
export type NestedForm = z.input<typeof nestedForm>
export type CondionalForm = z.input<typeof conditionalForm>
export type CondionalArrayForm = z.input<typeof conditionalArrayForm>
