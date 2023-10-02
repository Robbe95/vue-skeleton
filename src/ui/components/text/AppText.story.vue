<script setup lang="ts">
import { reactive } from 'vue'
import { textBoldnessOptions, textTruncateOptions, textVariantOptions } from '@/ui/components/text/appText.style'
import type { TextProps } from '@/ui/components/text/appText.style'
import AppText from '@/ui/components/text/AppText.vue'

interface State {
  variant: TextProps['variant']
  boldness: TextProps['boldness']
  numberOfLines?: TextProps['truncate']
  text: string
}

const state = reactive<State>({
  variant: 'body',
  boldness: undefined,
  numberOfLines: undefined,
  text: 'Text',
})
</script>

<template>
  <Story
    title="App/Text/AppText"
  >
    <Variant title="Default" auto-props-disabled>
      <template #controls>
        <HstSelect v-model="state.variant" title="Variant" :options="textVariantOptions" />
        <HstSelect v-model="state.boldness" title="Boldness" :options="['none', ...textBoldnessOptions]" />
        <HstSelect v-model="state.numberOfLines" title="Number of lines" :options="['none', ...textTruncateOptions]" />
        <HstTextarea v-model="state.text" title="Text" />
      </template>

      <AppText v-bind="state">
        {{ state.text }}
      </AppText>
    </Variant>
  </Story>
</template>
