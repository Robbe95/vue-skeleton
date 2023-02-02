<script setup lang="ts">
const model1 = ref(false)
const model2 = ref([])
const model3 = ref([])

const options = [
  { value: 'value1', label: 'Value 1' },
  { value: 'value2', label: 'Value 2' },
  { value: 'value3', label: 'Value 3' },
]

const displayFunction = (value: {
  value: string
  label: string
}): string => {
  return value.label
}
</script>

<template>
  <Story
    title="Forms/Input/FormCheckbox"
  >
    <Variant title="Default">
      <FormCheckbox v-model="model1" />
    </Variant>
    <Variant title="Group">
      <FormCheckboxGroup v-model="model2" class="flex flex-col gap-1">
        <FormCheckbox value="value1" />
        <FormCheckbox value="value2" />
        <FormCheckbox value="value3" />
      </FormCheckboxGroup>
    </Variant>
    <Variant title="Group with labels">
      <FormCheckboxGroup v-model="model2" class="flex flex-col gap-1" has-labels>
        <FormCheckbox value="value1" />
        <FormCheckbox value="value2" />
        <FormCheckbox value="value3" />
      </FormCheckboxGroup>
    </Variant>
    <Variant title="Group with objects">
      <FormCheckboxGroup v-model="model3" class="flex flex-col gap-1" has-labels :display-function="displayFunction" key-value="value">
        <FormCheckbox v-for="option in options" :key="option.value" :value="option" />
      </FormCheckboxGroup>
    </Variant>
  </Story>
</template>
