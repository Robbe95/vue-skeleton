<script setup lang="ts">
const options1 = ['one', 'two', 'three', 'four', 'five']
const selectedOption1 = ref<string>('one')
const search1 = ref<string>('')
interface Option {
  label: string
  value: string
}

const selectedMultiple = ref<string[]>([])

const options2: Option[] = [
  { label: 'one', value: 'one123' },
  { label: 'two', value: 'two12312312' },
  { label: 'three', value: 'thre3123e' },
  { label: 'four', value: 'four3123' },
  { label: 'five', value: 'f123123ve' },
]

const displayFunction = (value: Option | Option[]) => {
  if (Array.isArray(value)) {
    return value.map(value => value.label).join(', ')
  }
  return value.label
}
</script>

<template>
  <Story title="Forms/Input/Select">
    <Variant title="Default">
      <FormSelect v-model="selectedOption1" :items="options1">
        <template #input="{ selectedValue }">
          <FormSelectInput placeholder="Select" :selected-value="selectedValue" />
        </template>
        <template #item="{ item }">
          <FormSelectOption :key="item" :value="item" />
        </template>
      </FormSelect>
    </Variant>
    <Variant title="Loading">
      <FormSelect v-model="selectedOption1" is-loading :items="options1">
        <template #input="{ selectedValue }">
          <FormSelectInput placeholder="Select" :selected-value="selectedValue" />
        </template>
        <template #item="{ item }">
          <FormSelectOption :key="item" :value="item" />
        </template>
      </FormSelect>
    </Variant>
    <Variant title="Empty">
      <FormSelect v-model="selectedOption1" is-empty :items="options1">
        <template #input="{ selectedValue }">
          <FormSelectInput placeholder="Select" :selected-value="selectedValue" />
        </template>
        <template #item="{ item }">
          <FormSelectOption :key="item" :value="item" />
        </template>
      </FormSelect>
    </Variant>
    <Variant title="Multiple">
      <FormSelect v-model="selectedMultiple" has-multiple :items="options1">
        <template #input="{ selectedValue }">
          <FormSelectInput placeholder="Select" :selected-value="selectedValue" />
        </template>
        <template #item="{ item }">
          <FormSelectOption :key="item" :value="item" />
        </template>
      </FormSelect>
    </Variant>
    <Variant title="Search">
      <FormSelect v-model="selectedMultiple" has-search :items="options1">
        <template #input="{ selectedValue }">
          <FormSelectInput placeholder="Select" :selected-value="selectedValue" />
        </template>
        <template #item="{ item }">
          <FormSelectOption :key="item" :value="item" />
        </template>
      </FormSelect>
    </Variant>
    <Variant title="Search with objects">
      <FormSelect v-model="selectedMultiple" has-search :has-multiple="true" :display-function="displayFunction"
        key-value="value" :items="options2">
        <template #input="{ selectedValue }">
          <FormSelectInput placeholder="Select" :selected-value="selectedValue" />
        </template>
        <template #item="{ item }">
          <FormSelectOption :key="item.value" :value="item" />
        </template>
      </FormSelect>
    </Variant>
  </Story>
</template>
