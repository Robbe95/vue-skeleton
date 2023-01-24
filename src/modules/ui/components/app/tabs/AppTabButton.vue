<script setup lang="ts">
import { Tab } from '@headlessui/vue'
</script>

<template>
  <Tab
    v-slot="{ selected }"
    as="template"
  >
    <button
      class="w-full px-16 py-2 border rounded max-w-max" :class="
        {
          'bg-transparent border-primary-500': selected,
          'bg-transparent border-transparent': !selected,
        }"
    >
      <slot />
    </button>
  </Tab>
</template>
