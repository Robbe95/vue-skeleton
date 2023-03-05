<script setup lang="ts">
import { useForm } from '@appwise/forms'
import type { CondionalForm } from '../models/form.model'
import { conditionalForm } from '../models/form.model'
import FormInputField from '@/modules/ui/components/forms/field/FormInputField.vue'
import AppButton from '@/modules/ui/components/app/buttons/app-button/AppButton.vue'

const submitForm = (values: CondionalForm): void => {
  // eslint-disable-next-line no-console
  console.log(values)
}
const { register, submit } = useForm(conditionalForm, {
  onSubmit: submitForm,
})
</script>

<template>
  <div>
    <FormInputField v-bind="register('username')" label="Username" />
    <FormInputField v-bind="register('email')" label="email" />
    <FormInputField v-bind="register('password')" label="password" />

    <AppButton @component:click="submit">
      Submit
    </AppButton>
  </div>
</template>
