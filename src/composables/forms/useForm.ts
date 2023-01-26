import type { Ref } from 'vue'
import type { z } from 'zod'

export const useForm = <T>(schema: z.Schema<T>, form: Ref<T>) => {
  const errors = ref<z.ZodFormattedError<T, string>>()
  const isValid = computed(() => !errors.value)
  const combined = ref<any>()

  watch(form, (value) => {
    const parse = schema.safeParse(value)
    if (parse.success)
      errors.value = undefined
    else
      errors.value = parse.error.format()
  }, { deep: true })

  return { form, isValid, errors, combined }
}
