<script setup lang="ts">
interface Props {
  isOptional?: boolean
}

withDefaults(defineProps<Props>(), { isOptional: false })

const { t } = useI18n()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>
    <label class="text-sm" v-bind="$attrs">
      <slot />
    </label>
    <p v-if="isOptional" class="text-xs text-gray-300">
      {{ t('label.optional') }}
    </p>
  </div>
</template>
