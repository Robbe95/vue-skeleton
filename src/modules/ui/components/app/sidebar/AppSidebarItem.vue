<script setup lang="ts">
import { RouterLink } from 'vue-router'
interface Props {
  to?: string
  hasChildren?: boolean
}

const props = defineProps<Props>()

const childrenOpen = ref(false)
</script>

<template>
  <div>
    <Component
      :is="to ? RouterLink : 'button'"
      class="w-full bg-primary-300 py-1 px-2 rounded-md hover:bg-primary-200 transition flex justify-between gap-2 items-center"
      :to="to"
      @click="childrenOpen = !childrenOpen"
    >
      <slot />
      <ChevronRightIcon v-if="!hasChildren" class="w-2 flex-none" />
      <ChevronDownIcon
        v-else class="h-4 flex-none transition-transform duration-500"
        :class="{
          'transform rotate-180': childrenOpen,
        }"
      />
    </Component>
    <TransitionExpand>
      <div
        v-if="hasChildren && childrenOpen" class="bg-primary-600 rounded-md"
      >
        <div class="p-2 flex gap-1 flex-col">
          <slot name="children" />
        </div>
      </div>
    </TransitionExpand>
  </div>
</template>
