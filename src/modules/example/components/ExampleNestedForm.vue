<script setup lang="ts">
import { useForm } from '@appwise/forms'
import type { NestedForm } from '../models/form.model'
import { nestedForm } from '../models/form.model'
import FormInputField from '@/modules/ui/components/forms/field/FormInputField.vue'
import AppButton from '@/modules/ui/components/app/buttons/app-button/AppButton.vue'

const submitForm = (values: NestedForm): void => {
  // eslint-disable-next-line no-console
  console.log(values)
}
const { form, onSubmitForm } = useForm(nestedForm)

onSubmitForm((data) => {
  submitForm(data)
  return null
})
</script>

<template>
  <div>
    <FormInputField v-bind="form.register('username')" label="Username" />
    <FormInputField v-bind="form.register('address.city')" label="Stad" />
    <FormInputField v-bind="form.register('address.street')" label="Straat" />

    <AppButton @component:click="form.submit">
      Submit
    </AppButton>
  </div>
</template>
