<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  isOptional: boolean
}

withDefaults(defineProps<Props>(), { isOptional: false })

const { t } = useI18n()
</script>

<template>
  <div c>
    <label class="text-sm">
      <slot />
    </label>
    <p v-if="isOptional" class="text-gray-300 text-xs">
      {{ t('label.optional') }}
    </p>
  </div>
</template>
