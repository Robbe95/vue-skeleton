<script setup lang="ts">
interface Props {
  isOptional?: boolean
}

const { isOptional = false } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const { t } = useI18n()
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
