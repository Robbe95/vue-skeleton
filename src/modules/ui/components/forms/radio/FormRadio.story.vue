<script setup lang="ts">
const model1 = ref()
</script>

<template>
  <Story
    title="Forms/Input/FormRadio"
  >
    <Variant title="Default">
      <FormRadioGroup v-model="model1" class="flex flex-col gap-1">
        <FormRadioOption value="value1" />
        <FormRadioOption value="value2" />
        <FormRadioOption value="value3" />
      </FormRadioGroup>
    </Variant>
    <Variant title="With title">
      <FormRadioGroup v-model="model1" class="flex flex-col gap-1" label="Title">
        <FormRadioOption value="value1" />
        <FormRadioOption value="value2" />
        <FormRadioOption value="value3" />
      </FormRadioGroup>
    </Variant>

    <Variant title="With label">
      <FormRadioGroup v-model="model1" class="flex flex-col gap-1">
        <FormRadioOption value="value1" label="label1" />
        <FormRadioOption value="value2" label="label2" />
        <FormRadioOption value="value3" label="label3" />
      </FormRadioGroup>
    </Variant>
    <Variant title="With slot">
      <FormRadioGroup v-model="model1" class="flex flex-col gap-1">
        <FormRadioOption value="value1">
          Slot 1
        </FormRadioOption>
        <FormRadioOption value="value2">
          Slot 2
        </FormRadioOption>
        <FormRadioOption value="value3">
          Slot 3
        </FormRadioOption>
      </FormRadioGroup>
    </Variant>
  </Story>
</template>
