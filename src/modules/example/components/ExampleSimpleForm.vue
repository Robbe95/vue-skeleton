<script setup lang="ts">
import { useForm } from '@appwise/forms'
import type { SimpleForm } from '../models/form.model'
import { simpleForm } from '../models/form.model'
import FormInputField from '@/modules/ui/components/forms/field/FormInputField.vue'
import AppButton from '@/modules/ui/components/app/buttons/app-button/AppButton.vue'

const submitForm = (values: SimpleForm): null => {
  // eslint-disable-next-line no-console
  console.log(values)
  return null
}
const form = useForm(simpleForm, {
  onSubmit: submitForm,
})
</script>

<template>
  <div>
    <FormInputField v-bind="form.register('username')" label="Username" />
    <FormInputField v-bind="form.register('password')" label="Wachtwoord" />
    <AppButton @component:click="form.submit">
      Submit
    </AppButton>
  </div>
</template>
