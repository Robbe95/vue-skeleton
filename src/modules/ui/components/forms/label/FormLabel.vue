<script setup lang="ts">
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
    <p v-if="isOptional" class="text-xs text-gray-300">
      {{ t('label.optional') }}
    </p>
  </div>
</template>
