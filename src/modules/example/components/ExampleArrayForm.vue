<script setup lang="ts">
import { useForm } from '@appwise/forms'
import type { CondionalArrayForm } from '../models/form.model'
import { conditionalArrayForm } from '../models/form.model'
import ExampleArrayFormComponent from './ExampleArrayFormComponent.vue'
import AppButton from '@/modules/ui/components/app/buttons/app-button/AppButton.vue'

const submitForm = (values: CondionalArrayForm): void => {
  // eslint-disable-next-line no-console
  console.log(values)
}
const addressesAmount = ref(1)
const add = (): void => {
  addressesAmount.value += 1
}
const remove = (): void => {
  addressesAmount.value -= 1
}

const { form, onSubmitForm } = useForm(conditionalArrayForm)

onSubmitForm((data) => {
  submitForm(data)
  return null
})

</script>

<template>
  <div>
    <div v-for="i in addressesAmount" :key="i">
      <ExampleArrayFormComponent :index="i - 1" :form="form" />
    </div>

    <AppButton @component:click="add">
      add
    </AppButton>
    <AppButton @component:click="remove">
      remove
    </AppButton>

    <AppButton @component:click="onSubmitForm">
      Submit
    </AppButton>
  </div>
</template>
