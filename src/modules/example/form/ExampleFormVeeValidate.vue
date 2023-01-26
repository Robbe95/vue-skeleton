<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import z from 'zod'

const schema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  address: z.object({
    street: z.string().min(3).max(20),
    number: z.number().min(1).max(100),
  }),
})

const validationSchema = toFormValidator(schema)

const formObject = ref(
  {
    name: '',
    email: '',
    address: {
      street: '',
      number: 0,
    },
  },
)

const { errors, values } = useForm({
  validationSchema,
  initialValues: formObject.value,
})
// You will get auto-completion for possible errors for `email` and `age`
</script>

<template>
  <div>
    <FormInputField v-model="values.name" />
    <FormInputField v-model="values.email" />
    <FormInputField v-model="values.address.street" />
    <FormInputField v-model="values.address.number" type="number" />

    {{ values }}
    {{ errors }}
  </div>
</template>
