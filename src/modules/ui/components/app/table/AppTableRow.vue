<script setup lang="ts">
interface Props {
  isHeader?: boolean
}

withDefaults(defineProps<Props>(),
  {
    isHeader: false,
  },
)
</script>

<template>
  <tr
    :class="{ 'border-b border-gray-700 bg-gray-600 text-white duration-200 hover:bg-gray-400': !isHeader }"
  >
    <slot />
  </tr>
</template>
