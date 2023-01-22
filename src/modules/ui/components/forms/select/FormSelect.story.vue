<script setup lang="ts">
const options1 = ['one', 'two', 'three', 'four', 'five']
const selectedOption1 = ref<string>('one')
const search1 = ref<string>('')

const selectedMultiple = ref<string[]>([])

const options2 = [
  { label: 'one', value: 'one123' },
  { label: 'two', value: 'two12312312' },
  { label: 'three', value: 'thre3123e' },
  { label: 'four', value: 'four3123' },
  { label: 'five', value: 'f123123ve' },
]
</script>

<template>
  <Story
    title="Forms/Input/Select"
  >
    <Variant title="Default">
      <FormSelect v-model="selectedOption1">
        <template #input>
          <FormSelectInput v-model="search1" placeholder="Select" />
        </template>
        <template #options>
          <FormSelectOption
            v-for="option in options1"
            :key="option"
            :value="option"
          />
        </template>
      </FormSelect>
    </Variant>
    <Variant title="Loading">
      <FormSelect v-model="selectedOption1" is-loading>
        <template #input>
          <FormSelectInput v-model="search1" placeholder="Select" />
        </template>
        <template #options>
          <FormSelectOption
            v-for="option in options1"
            :key="option"
            :value="option"
          />
        </template>
      </FormSelect>
    </Variant>
    <Variant title="Empty">
      <FormSelect v-model="selectedOption1" is-empty>
        <template #input>
          <FormSelectInput v-model="search1" placeholder="Select" />
        </template>
        <template #options>
          <FormSelectOption
            v-for="option in options1"
            :key="option"
            :value="option"
          />
        </template>
      </FormSelect>
    </Variant>
    <Variant title="Multiple">
      <FormSelect v-model="selectedMultiple" has-multiple>
        <template #input>
          <FormSelectInput v-model="search1" placeholder="Select" />
        </template>
        <template #options>
          <FormSelectOption
            v-for="option in options1"
            :key="option"
            :value="option"
          />
        </template>
      </FormSelect>
    </Variant>
    <Variant title="Search">
      <FormSelect v-model="selectedMultiple" has-search>
        <template #input>
          <FormSelectInput v-model="search1" placeholder="Select" />
        </template>
        <template #options>
          <FormSelectOption
            v-for="option in options1"
            :key="option"
            :value="option"
          />
        </template>
      </FormSelect>
    </Variant>
    <Variant title="Search with objects">
      <FormSelect v-model="selectedMultiple" has-search :display-function="(value) => value.label">
        <template #input>
          <FormSelectInput v-model="search1" placeholder="Select" />
        </template>
        <template #options>
          <FormSelectOption
            v-for="option in options2"
            :key="option.value"
            :value="option"
          />
        </template>
      </FormSelect>
    </Variant>
  </Story>
</template>
