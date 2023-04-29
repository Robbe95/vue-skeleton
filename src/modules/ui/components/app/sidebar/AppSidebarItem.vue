<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  to?: string
  hasChildren?: boolean
}
defineProps<Props>()

const childrenOpen = ref(false)
</script>

<template>
  <div>
    <Component
      :is="to ? RouterLink : 'button'"
      class="flex w-full items-center justify-between gap-2 rounded-md bg-primary-300 px-2 py-1 transition hover:bg-primary-200"
      :to="to"
      @click="childrenOpen = !childrenOpen"
    >
      <slot />
      <ChevronRightIcon v-if="!hasChildren" class="w-2 flex-none" />
      <ChevronDownIcon
        v-else class="h-4 flex-none transition-transform duration-500"
        :class="{
          'rotate-180': childrenOpen,
        }"
      />
    </Component>
    <TransitionExpand>
      <div
        v-if="hasChildren && childrenOpen" class="rounded-md bg-primary-600"
      >
        <div class="flex flex-col gap-1 p-2">
          <slot name="children" />
        </div>
      </div>
    </TransitionExpand>
  </div>
</template>
