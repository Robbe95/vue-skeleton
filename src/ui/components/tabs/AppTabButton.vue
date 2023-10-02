<script setup lang="ts">
import { Tab } from '@headlessui/vue'
</script>

<template>
  <Tab
    v-slot="{ selected }"
    as="template"
  >
    <button
      class="w-full max-w-max rounded border px-16 py-2" :class="
        {
          'border-primary bg-transparent': selected,
          'border-transparent bg-transparent': !selected,
        }"
    >
      <slot />
    </button>
  </Tab>
</template>
