<script setup lang="ts">
import { ref } from 'vue'
import FormSelect from '@/ui/components/select/FormSelect.vue'

const people = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
]

const selectedPerson = ref<string>()

interface State {
  hasSearch?: boolean
  isDisabled?: boolean
  isLoading?: boolean
}

const state: State = {
  hasSearch: true,
  isDisabled: false,
  isLoading: false,
}
</script>

<template>
  <Story title="Forms/Input/Select">
    <Variant title="Default">
      <template #controls>
        <HstCheckbox v-model="state.hasSearch" title="Search" />
        <HstCheckbox v-model="state.isDisabled" title="Disabled" />
        <HstCheckbox v-model="state.isLoading" title="Loading" />
      </template>

      <div class="flex flex-col justify-start gap-20 py-20">
        <FormSelect v-model="selectedPerson" :items="people" :display-function="(person: string) => person" class="w-80" />
      </div>
    </Variant>
  </Story>
</template>
