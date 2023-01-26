import type { Ref } from 'vue'
import type { z } from 'zod'
import { map } from 'zod'

export const useForm = <T>(schema: z.Schema<T>, form: Ref<T>) => {
  const errors = ref<z.ZodFormattedError<T, string>>()
  const isValid = computed(() => !errors.value)
  const combined = ref<any>()

  const mapErrorsObject = <T>(errors: z.ZodFormattedError<T, string>) => {
    // combine the form and the errors into a single object
    // map the object into an array of objects
    return Object.keys(form.value).map((key) => {
      return { [key]: { value: (form.value)[key], error: (errors as z.ZodFormattedError<T, string>)[key]?._errors ?? undefined } }
    })
  }

  watch(form, (value) => {
    const parse = schema.safeParse(value)
    if (parse.success) {
      errors.value = undefined
    }
    else {
      errors.value = parse.error.format()
      combined.value = mapErrorsObject(errors.value)
    }
  }, { deep: true })

  return { form, isValid, errors, combined }
}
