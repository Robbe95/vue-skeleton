<script setup lang="ts">
interface Props {
  isHeader?: boolean
}

const props = withDefaults(defineProps<Props>(),
  {
    isHeader: false,
  },
)
</script>

<template>
  <tr
    :class="{ 'bg-gray-600 text-white border-b border-gray-700 hover:bg-gray-400 duration-200': !isHeader }"
  >
    <slot />
  </tr>
</template>
