import { z } from 'zod'

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type)
    return { message: 'invalid_type' }
  if (issue.code === z.ZodIssueCode.invalid_union)
    return { message: 'invalid_union' }
  if (issue.code === z.ZodIssueCode.invalid_string)
    return { message: 'invalid_string' }
  if (issue.code === z.ZodIssueCode.invalid_date)
    return { message: 'invalid_date' }

  return { message: ctx.defaultError }
}

z.setErrorMap(customErrorMap)

const setupZod = () => {
  z.setErrorMap(customErrorMap)
}

export default setupZod
