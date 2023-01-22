<script setup lang="ts">
const model = ref<number>(0)
const model2 = ref<number>(0)
const model3 = ref<number>(0)
</script>

<template>
  <Story
    title="Forms/Input/Slider"
  >
    <Variant title="Default">
      <FormSlider v-model="model" />
    </Variant>
    <Variant title="Disabled value">
      <FormSlider v-model="model" :disabled-value="50" />
    </Variant>
    <Variant title="Disabled">
      <FormSlider v-model="model" is-disabled />
    </Variant>
    <Variant title="Percent progress">
      <FormSlider v-model="model" percent-progress />
    </Variant>
    <Variant title="Measurement progress with max label">
      <FormSlider v-model="model" value-progress value-measurement="m2" max-label />
    </Variant>
    <Variant title="Slider groups">
      <FormInputGroup :total-value="50">
        <FormSlider v-model="model" value-progress value-measurement="m2" max-label />
        <FormSlider v-model="model2" value-progress value-measurement="m2" max-label />
        <FormSlider v-model="model3" value-progress value-measurement="m2" max-label />
      </FormInputGroup>
    </Variant>
  </Story>
</template>
