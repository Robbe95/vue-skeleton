import { z } from 'zod'
import i18n from '@/plugins/i18n'

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  const t = i18n.global.t
  if (issue.code === z.ZodIssueCode.invalid_type)
    return { message: t('errors.invalid_type') }
  // if (issue.expected === 'string')
  //   return { message: t('errors.invalid_type_string') }
  // if (issue.expected === 'number')
  //   return { message: t('errors.invalid_type_number') }
  // if (issue.expected === 'boolean')
  //   return { message: t('errors.invalid_type_boolean') }
  // if (issue.expected === 'array')
  //   return { message: t('errors.invalid_type_array') }
  // if (issue.expected === 'object')
  //   return { message: t('errors.invalid_type_object') }
  // if (issue.expected === 'function')
  //   return { message: t('errors.invalid_type_function') }
  // if (issue.expected === 'symbol')
  //   return { message: t('errors.invalid_type_symbol') }
  // if (issue.expected === 'bigint')
  //   return { message: t('errors.invalid_type_bigint') }
  // if (issue.expected === 'integer')
  //   return { message: t('errors.invalid_type_integer') }
  // if (issue.expected === 'date')
  //   return { message: t('errors.invalid_type_date') }
  // if (issue.expected === 'null')
  //   return { message: t('errors.invalid_type_null') }
  // if (issue.expected === 'undefined')
  //   return { message: t('errors.invalid_type_undefined') }
  // if (issue.expected === 'nan')
  //   return { message: t('errors.invalid_type_nan') }
  // return { message: t('errors.invalid_type') }

  if (issue.code === z.ZodIssueCode.invalid_union)
    return { message: t('errors.invalid_union') }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === 'email')
      return { message: t('errors.invalid_email') }
    if (issue.validation === 'url')
      return { message: t('errors.invalid_url') }
    if (issue.validation === 'uuid')
      return { message: t('errors.invalid_uuid') }
    if (issue.validation === 'regex')
      return { message: t('errors.invalid_regex') }
    if (issue.validation === 'datetime')
      return { message: t('errors.invalid_datetime') }

    return { message: t('errors.invalid_string') }
  }

  if (issue.code === z.ZodIssueCode.invalid_date)
    return { message: t('errors.invalid_date') }
  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === 'string')
      return { message: t('errors.too_big_string', { max: issue.maximum }) }
    if (issue.type === 'number')
      return { message: t('errors.too_big_number', { max: issue.maximum }) }
    if (issue.type === 'array')
      return { message: t('errors.too_big_array', { max: issue.maximum }) }
    if (issue.type === 'date')
      return { message: t('errors.too_big_date', { max: issue.maximum }) }
    return { message: t('errors.too_big', { max: issue.maximum }) }
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === 'string')
      return { message: t('errors.too_small_string', { min: issue.minimum }) }
    if (issue.type === 'number')
      return { message: t('errors.too_small_number', { min: issue.minimum }) }
    if (issue.type === 'array')
      return { message: t('errors.too_small_array', { min: issue.minimum }) }
    if (issue.type === 'date')
      return { message: t('errors.too_small_date', { min: issue.minimum }) }
    return { message: t('errors.too_small', { min: issue.minimum }) }
  }

  return { message: ctx.defaultError }
}

z.setErrorMap(customErrorMap)

const setupZod = (): void => {
  z.setErrorMap(customErrorMap)
}

export default setupZod
