<script setup lang="ts">
import z from 'zod'
import { useForm } from '@/composables/forms/useForm'

const schema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  address: z.object({
    street: z.string().min(3).max(20),
    number: z.number().min(1).max(100),
  }),
})

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

const { errors } = useForm(schema, formObject)
</script>

<template>
  <div>
    <FormInputField v-model="formObject.name" />
    <FormInputField v-model="formObject.email" />
    <FormInputField v-model="formObject.address.street" />
    <FormInputField v-model="formObject.address.number" type="number" />
  </div>
</template>
