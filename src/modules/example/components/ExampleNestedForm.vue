<script setup lang="ts">
import { useForm } from '@appwise/forms'
import type { NestedForm } from '../models/form.model'
import { nestedForm } from '../models/form.model'
import FormInputField from '@/modules/ui/components/forms/field/FormInputField.vue'
import AppButton from '@/modules/ui/components/app/buttons/app-button/AppButton.vue'

const submitForm = (values: NestedForm): null => {
  // eslint-disable-next-line no-console
  console.log(values)
  return null
}
const { register, submit } = useForm(nestedForm, {
  onSubmit: submitForm,
})
</script>

<template>
  <div>
    <FormInputField v-bind="register('username')" label="Username" />
    <FormInputField v-bind="register('address.city')" label="Stad" />
    <FormInputField v-bind="register('address.street')" label="Straat" />

    <AppButton @component:click="submit">
      Submit
    </AppButton>
  </div>
</template>
